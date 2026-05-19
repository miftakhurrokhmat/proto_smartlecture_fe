from datetime import UTC, datetime

from fastapi import APIRouter, Depends

from app.core.auth import require_auth
from app.schemas.message import Message, MessageCreateRequest, MessageListResponse
from app.services.store import store

router = APIRouter(prefix="/sessions", dependencies=[Depends(require_auth)], tags=["messages"])


@router.get("/{session_id}/messages", response_model=MessageListResponse)
async def get_messages(session_id: str, limit: int = 50, offset: int = 0):
    messages = [m for m in store.messages if m.sessionId == session_id]
    return MessageListResponse(messages=store.paginate(messages, limit, offset), total=len(messages))


@router.post("/{session_id}/messages", response_model=Message)
async def post_message(session_id: str, payload: MessageCreateRequest):
    message = Message(
        id=f"msg-{len(store.messages) + 1:03d}",
        sessionId=session_id,
        userId="student-001",
        userName="Dina Anjani",
        content=payload.content,
        timestamp=datetime.now(UTC),
        isInstructor=False,
    )
    store.messages.append(message)
    return message
