from datetime import UTC, datetime
from itertools import islice

from app.schemas.message import Message
from app.schemas.session import Session
from app.schemas.student import Student
from app.schemas.transcript import TranscriptEntry


class InMemoryStore:
    def __init__(self) -> None:
        self.sessions: dict[str, Session] = {
            "session-001": Session(
                id="session-001",
                courseCode="TI-3A",
                courseName="System Informasi",
                instructorId="instr-001",
                instructorName="Dr. Budi Santoso",
                startTime=datetime(2024, 1, 15, 8, 0, tzinfo=UTC),
                status="active",
                studentCount=28,
            )
        }
        self.transcripts: list[TranscriptEntry] = [
            TranscriptEntry(
                id="trans-001",
                sessionId="session-001",
                timestamp=datetime(2024, 1, 15, 8, 15, 32, tzinfo=UTC),
                speaker="instructor",
                speakerName="Dr. Budi Santoso",
                text="Selamat pagi semuanya...",
            )
        ]
        self.messages: list[Message] = [
            Message(
                id="msg-001",
                sessionId="session-001",
                userId="student-001",
                userName="Dina Anjani",
                content="Pak, apakah neural network termasuk dalam machine learning?",
                timestamp=datetime(2024, 1, 15, 8, 18, 0, tzinfo=UTC),
                isInstructor=False,
            )
        ]
        self.students: list[Student] = [
            Student(id="student-001", name="Dina Anjani", status="active"),
            Student(id="student-002", name="Rafi Putra", status="active"),
            Student(id="student-003", name="Maya Lestari", status="inactive"),
        ]

    @staticmethod
    def paginate(items: list, limit: int, offset: int) -> list:
        return list(islice(items, offset, offset + limit))


store = InMemoryStore()
