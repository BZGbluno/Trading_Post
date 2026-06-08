from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from fastapi.responses import JSONResponse
from fastapi import status
import uuid
import asyncio


router = APIRouter()

@router.get("/health")
async def get_health():
    return JSONResponse(content={"status": "healthy"}, status_code=status.HTTP_200_OK)
