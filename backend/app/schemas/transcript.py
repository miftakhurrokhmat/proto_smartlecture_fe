from datetime import datetime
from pydantic import BaseModel


class TranscriptEntry(BaseModel):
    id: str
    sessionId: str
    timestamp: datetime
    speaker: str
    speakerName: str
    text: str


class TranscriptResponse(BaseModel):
    entries: list[TranscriptEntry]
    total: int


class TranscriptSummaryResponse(BaseModel):
    summary: str
    keyPoints: list[str]
    generatedAt: datetime
