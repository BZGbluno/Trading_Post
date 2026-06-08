from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi import status


router = APIRouter()

@router.get("/health")
async def get_health():
    return JSONResponse(content={"status": "healthy"}, status_code=status.HTTP_200_OK)
