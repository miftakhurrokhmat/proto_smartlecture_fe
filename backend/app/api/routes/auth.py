from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login(_: LoginRequest):
    return {"access_token": "dev-token", "token_type": "bearer"}


@router.post("/logout")
async def logout():
    return {"status": "ok"}


@router.post("/refresh")
async def refresh():
    return {"access_token": "dev-token-refreshed", "token_type": "bearer"}
