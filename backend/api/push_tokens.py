import os
from datetime import datetime
from typing import Literal

import asyncpg
from fastapi import APIRouter, HTTPException, Response, status
from pydantic import BaseModel, Field


router = APIRouter()


class RegisterPushTokenRequest(BaseModel):
    token: str = Field(min_length=10, max_length=4096)
    platform: Literal["ios", "android", "web"]
    provider: Literal["expo", "apns", "fcm"] = "expo"
    device_id: str | None = Field(default=None, max_length=255)


def serialize_push_token(row: asyncpg.Record):
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "token": row["token"],
        "platform": row["platform"],
        "provider": row["provider"],
        "device_id": row["device_id"],
        "is_active": row["is_active"],
        "created_at": row["created_at"].isoformat()
        if isinstance(row["created_at"], datetime)
        else row["created_at"],
        "updated_at": row["updated_at"].isoformat()
        if isinstance(row["updated_at"], datetime)
        else row["updated_at"],
    }


async def get_connection():
    return await asyncpg.connect(
        host=os.getenv("DATABASE_HOST"),
        database=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
    )


@router.post("/users/{user_id}/push-tokens", status_code=status.HTTP_201_CREATED)
async def register_push_token(user_id: int, request: RegisterPushTokenRequest):
    conn = None
    try:
        conn = await get_connection()

        if not await conn.fetchval(
            "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1);",
            user_id,
        ):
            raise HTTPException(status_code=404, detail="User does not exist")

        async with conn.transaction():
            if request.device_id:
                await conn.execute(
                    """
                    UPDATE push_tokens
                    SET is_active = FALSE, updated_at = NOW()
                    WHERE user_id = $1
                      AND provider = $2
                      AND device_id = $3
                      AND token <> $4
                      AND is_active = TRUE;
                    """,
                    user_id,
                    request.provider,
                    request.device_id,
                    request.token,
                )

            row = await conn.fetchrow(
                """
                INSERT INTO push_tokens (
                    user_id,
                    token,
                    platform,
                    provider,
                    device_id
                )
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (token) DO UPDATE
                SET user_id = EXCLUDED.user_id,
                    platform = EXCLUDED.platform,
                    provider = EXCLUDED.provider,
                    device_id = EXCLUDED.device_id,
                    is_active = TRUE,
                    updated_at = NOW()
                RETURNING
                    id,
                    user_id,
                    token,
                    platform,
                    provider,
                    device_id,
                    is_active,
                    created_at,
                    updated_at;
                """,
                user_id,
                request.token,
                request.platform,
                request.provider,
                request.device_id,
            )

        return serialize_push_token(row)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn is not None:
            await conn.close()


@router.delete(
    "/users/{user_id}/push-tokens/{push_token_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def deactivate_push_token(user_id: int, push_token_id: int):
    conn = None
    try:
        conn = await get_connection()
        result = await conn.execute(
            """
            UPDATE push_tokens
            SET is_active = FALSE, updated_at = NOW()
            WHERE id = $1 AND user_id = $2 AND is_active = TRUE;
            """,
            push_token_id,
            user_id,
        )

        if result == "UPDATE 0":
            raise HTTPException(status_code=404, detail="Active push token not found")

        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn is not None:
            await conn.close()
