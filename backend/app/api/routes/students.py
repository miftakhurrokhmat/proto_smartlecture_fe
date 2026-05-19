from fastapi import APIRouter, Depends

from app.core.auth import require_auth
from app.schemas.student import StudentListResponse
from app.services.store import store

router = APIRouter(prefix="/sessions", dependencies=[Depends(require_auth)], tags=["students"])


@router.get("/{session_id}/students", response_model=StudentListResponse)
async def get_students(session_id: str, limit: int = 100, offset: int = 0, status: str | None = None):
    _ = session_id
    students = store.students
    if status:
        students = [s for s in students if s.status == status]
    return StudentListResponse(students=store.paginate(students, limit, offset), total=len(students))
