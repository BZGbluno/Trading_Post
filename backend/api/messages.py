import os
from datetime import datetime
from typing import Dict, List

import asyncpg
from fastapi import APIRouter, HTTPException, Query, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field


router = APIRouter()
active_connections: Dict[int, List[WebSocket]] = {}


class SendMessageRequest(BaseModel):
    sender_id: int
    receiver_id: int
    body: str = Field(min_length=1, max_length=5000)


def serialize_message(row: asyncpg.Record):
    return {
        "id": row["id"],
        "sender_id": row["sender_id"],
        "receiver_id": row["receiver_id"],
        "body": row["body"],
        "created_at": row["created_at"].isoformat()
        if isinstance(row["created_at"], datetime)
        else row["created_at"],
    }


async def get_connection():
    return await asyncpg.connect(
        host=os.getenv("DATABASE_HOST"),
        database=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
    )


async def notify_user(user_id: int, event: dict):
    for websocket in active_connections.get(user_id, []).copy():
        try:
            await websocket.send_json(event)
        except Exception:
            active_connections[user_id].remove(websocket)


@router.post("/messages", status_code=201)
async def send_message(request: SendMessageRequest):
    if request.sender_id == request.receiver_id:
        raise HTTPException(status_code=400, detail="sender_id and receiver_id must be different")

    conn = None
    try:
        conn = await get_connection()

        sender_exists = await conn.fetchval(
            "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1);",
            request.sender_id,
        )
        receiver_exists = await conn.fetchval(
            "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1);",
            request.receiver_id,
        )

        if not sender_exists or not receiver_exists:
            raise HTTPException(status_code=404, detail="Sender or receiver does not exist")

        row = await conn.fetchrow(
            """
            INSERT INTO messages (sender_id, receiver_id, body)
            VALUES ($1, $2, $3)
            RETURNING id, sender_id, receiver_id, body, created_at;
            """,
            request.sender_id,
            request.receiver_id,
            request.body,
        )

        message = serialize_message(row)
        event = {"type": "message.created", "message": message}

        await notify_user(request.receiver_id, event)
        await notify_user(request.sender_id, event)

        return message

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn is not None:
            await conn.close()


@router.get("/messages")
async def get_messages(
    user_1_id: int = Query(gt=0),
    user_2_id: int = Query(gt=0),
    limit: int = Query(default=50, ge=1, le=100),
    before_id: int | None = Query(default=None, gt=0),
):
    if user_1_id == user_2_id:
        raise HTTPException(status_code=400, detail="user_1_id and user_2_id must be different")

    conn = None
    try:
        conn = await get_connection()

        rows = await conn.fetch(
            """
            SELECT id, sender_id, receiver_id, body, created_at
            FROM messages
            WHERE (
                (sender_id = $1 AND receiver_id = $2)
                OR
                (sender_id = $2 AND receiver_id = $1)
            )
            AND ($4::int IS NULL OR id < $4)
            ORDER BY created_at DESC, id DESC
            LIMIT $3;
            """,
            user_1_id,
            user_2_id,
            limit,
            before_id,
        )

        return [serialize_message(row) for row in reversed(rows)]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn is not None:
            await conn.close()


@router.websocket("/ws/users/{user_id}")
async def user_messages_websocket(websocket: WebSocket, user_id: int):
    await websocket.accept()
    active_connections.setdefault(user_id, []).append(websocket)

    try:
        await websocket.send_json({"type": "connected", "user_id": user_id})
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        if user_id in active_connections and websocket in active_connections[user_id]:
            active_connections[user_id].remove(websocket)
        if user_id in active_connections and not active_connections[user_id]:
            del active_connections[user_id]
