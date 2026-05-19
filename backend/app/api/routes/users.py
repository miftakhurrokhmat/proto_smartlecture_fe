from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException

from app.core.auth import parse_user_id, require_auth
from app.db.database import get_connection

router = APIRouter(prefix="/users", dependencies=[Depends(require_auth)], tags=["users"])


class UserUpdatePayload(BaseModel):
    name: str | None = None


@router.get("/me")
async def me(token: str = Depends(require_auth)):
    user_id = parse_user_id(token)
    with get_connection() as conn:
        user = conn.execute(
            "SELECT id, name, role FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"id": user["id"], "name": user["name"], "role": user["role"]}


@router.put("/me")
async def update_me(payload: UserUpdatePayload, token: str = Depends(require_auth)):
    user_id = parse_user_id(token)
    with get_connection() as conn:
        if payload.name:
            conn.execute("UPDATE users SET name = ? WHERE id = ?", (payload.name, user_id))
            conn.commit()
        user = conn.execute("SELECT id, name, role FROM users WHERE id = ?", (user_id,)).fetchone()

    return {"status": "updated", "user": {"id": user["id"], "name": user["name"], "role": user["role"]}}
