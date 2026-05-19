from datetime import UTC, datetime
from fastapi import APIRouter, Depends, HTTPException

from app.core.auth import require_auth
from app.schemas.session import (
    Session,
    SessionCreateRequest,
    SessionCreateResponse,
    SessionEndResponse,
    SessionStats,
)
from app.services.store import store

router = APIRouter(prefix="/sessions", dependencies=[Depends(require_auth)], tags=["sessions"])


@router.get("/active", response_model=Session)
async def get_active_session():
    for s in store.sessions.values():
        if s.status == "active":
            return s
    raise HTTPException(status_code=404, detail="No active session")


@router.post("", response_model=SessionCreateResponse)
async def create_session(payload: SessionCreateRequest):
    new_id = f"session-{len(store.sessions) + 1:03d}"
    store.sessions[new_id] = Session(
        id=new_id,
        courseCode=payload.courseCode,
        courseName=payload.courseName,
        instructorId="instr-001",
        instructorName="Dr. Budi Santoso",
        startTime=payload.scheduledStartTime,
        status="created",
        studentCount=0,
    )
    return SessionCreateResponse(id=new_id, status="created")


@router.put("/{session_id}/end", response_model=SessionEndResponse)
async def end_session(session_id: str):
    session = store.sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    now = datetime.now(UTC)
    session.status = "ended"
    session.endTime = now
    return SessionEndResponse(
        id=session_id,
        status="ended",
        endTime=now,
        recordingUrl=f"https://storage.example.com/{session_id}.mp4",
    )


@router.get("/{session_id}/stats", response_model=SessionStats)
async def get_stats(session_id: str):
    session = store.sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    sess_messages = [m for m in store.messages if m.sessionId == session_id]
    total_questions = sum(1 for m in sess_messages if "?" in m.content)
    return SessionStats(
        activeStudents=session.studentCount,
        totalMessages=len(sess_messages),
        totalQuestions=total_questions,
        recordingDuration=7380,
    )
