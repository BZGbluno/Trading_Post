from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
from fastapi import status
import asyncpg
import logging


router = APIRouter()
logger = logging.getLogger(__name__)


class User(BaseModel):
    email: str
    name: str

@router.post("/user")
async def create_user(request: User):
    """
    This endpint will create a new user that only has an email and a name
    """
    email = request.email
    name = request.name

    logger.debug(f"Creating user named: {name}")


    try:
        conn = await asyncpg.connect(
        host=os.getenv("DATABASE_HOST"),
        database=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD")
        )

        row = await conn.fetchrow(
            """
            INSERT INTO users (name, email)
            VALUES ($1, $2)
            RETURNING *;
            """,
            name,
            email
        )


        return JSONResponse(content={"message": f"Created User: {name}"},
            status_code=status.HTTP_201_CREATED
        )

    except HTTPException:
        raise
    except Exception as e:
        # import traceback
        # traceback.print_exc()
        # raise
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn is not None:
            await conn.close()




