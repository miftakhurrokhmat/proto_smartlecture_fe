from pydantic import BaseModel


class Student(BaseModel):
    id: str
    name: str
    status: str


class StudentListResponse(BaseModel):
    students: list[Student]
    total: int
