from fastapi import APIRouter, Depends

from app.core.auth import require_auth
from app.schemas.transcript import TranscriptResponse, TranscriptSummaryResponse
from app.services.store import store

router = APIRouter(prefix="/sessions", dependencies=[Depends(require_auth)], tags=["transcripts"])


@router.get("/{session_id}/transcript", response_model=TranscriptResponse)
async def get_transcript(session_id: str, limit: int = 50, offset: int = 0, search: str | None = None):
    entries = [t for t in store.transcripts if t.sessionId == session_id]
    if search:
        entries = [t for t in entries if search.lower() in t.text.lower()]
    return TranscriptResponse(entries=store.paginate(entries, limit, offset), total=len(entries))


@router.get("/{session_id}/transcript/summary", response_model=TranscriptSummaryResponse)
async def get_transcript_summary(session_id: str):
    _ = session_id
    return TranscriptSummaryResponse(
        summary="Materi hari ini membahas tentang kecerdasan buatan dan pengenalan suara.",
        keyPoints=[
            "AI adalah teknologi yang terus berkembang",
            "Neural network meniru cara kerja otak manusia",
            "Pengenalan suara adalah aplikasi praktis AI",
        ],
        generatedAt=store.transcripts[-1].timestamp,
    )
