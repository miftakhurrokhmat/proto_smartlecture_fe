from datetime import datetime
from pydantic import BaseModel


class Session(BaseModel):
    id: str
    courseCode: str
    courseName: str
    instructorId: str
    instructorName: str
    startTime: datetime
    endTime: datetime | None = None
    status: str
    studentCount: int


class SessionCreateRequest(BaseModel):
    courseCode: str
    courseName: str
    scheduledStartTime: datetime


class SessionCreateResponse(BaseModel):
    id: str
    status: str


class SessionEndResponse(BaseModel):
    id: str
    status: str
    endTime: datetime
    recordingUrl: str


class SessionStats(BaseModel):
    activeStudents: int
    totalMessages: int
    totalQuestions: int
    recordingDuration: int
