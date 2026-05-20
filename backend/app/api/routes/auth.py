from pydantic import BaseModel
from fastapi import APIRouter, HTTPException

from app.db.database import get_connection

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login(payload: LoginRequest):
    with get_connection() as conn:
        user = conn.execute(
            "SELECT id, name, role FROM users WHERE username = ? AND password = ?",
            (payload.username, payload.password),
        ).fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Username atau password salah")

    return {
        "access_token": f"user:{user['id']}",
        "token_type": "bearer",
        "user": {"id": user["id"], "name": user["name"], "role": user["role"]},
    }


@router.post("/logout")
async def logout():
    return {"status": "ok"}


@router.post("/refresh")
async def refresh():
    return {"access_token": "dev-token-refreshed", "token_type": "bearer"}
