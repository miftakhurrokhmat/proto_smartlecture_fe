from datetime import datetime
from pydantic import BaseModel


class Message(BaseModel):
    id: str
    sessionId: str
    userId: str
    userName: str
    content: str
    timestamp: datetime
    isInstructor: bool


class MessageCreateRequest(BaseModel):
    content: str


class MessageListResponse(BaseModel):
    messages: list[Message]
    total: int
