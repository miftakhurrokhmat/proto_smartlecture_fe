from pydantic import BaseModel
from fastapi import APIRouter, Depends

from app.core.auth import require_auth

router = APIRouter(prefix="/users", dependencies=[Depends(require_auth)], tags=["users"])


class UserUpdatePayload(BaseModel):
    name: str | None = None


@router.get("/me")
async def me(token: str = Depends(require_auth)):
    return {"id": "student-001", "name": "Dina Anjani", "role": "student", "token": token}


@router.put("/me")
async def update_me(payload: UserUpdatePayload):
    return {"status": "updated", "name": payload.name or "Dina Anjani"}
