from fastapi import APIRouter, Depends

from app.core.auth import require_auth

router = APIRouter(prefix="/schedule", dependencies=[Depends(require_auth)], tags=["schedule"])


@router.get("/today")
async def get_schedule_today():
    return {
        "items": [
            {"name": "System Informasi (TI-3A)", "time": "08:00 - 10:00", "status": "LIVE"},
            {"name": "Basis Data (TI-2B)", "time": "10:15 - 12:15", "status": "upcoming"},
        ]
    }


@router.get("")
async def get_schedule():
    return await get_schedule_today()
