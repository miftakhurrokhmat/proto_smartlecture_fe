# FastAPI Backend Setup Guide

Panduan untuk setup dan menjalankan backend FastAPI untuk Smart Lecture.

## Prerequisites

- Python 3.9+
- pip atau poetry
- FastAPI
- SQLAlchemy (untuk database)
- Pydantic (untuk validation)

## Installation

### 1. Create Python Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose cryptography python-multipart
pip install starlette python-dotenv
```

Atau jika menggunakan poetry:

```bash
poetry init
poetry add fastapi uvicorn sqlalchemy pydantic python-jose cryptography python-multipart
```

## Project Structure

```
backend/
├── main.py                 # Entry point
├── core/
│   ├── config.py          # Configuration
│   ├── security.py        # JWT & Authentication
│   └── database.py        # Database setup
├── models/
│   ├── session.py         # Session model
│   ├── transcript.py      # Transcript model
│   ├── message.py         # Message model
│   ├── student.py         # Student model
│   └── user.py            # User model
├── schemas/
│   ├── session.py         # Session schema (Pydantic)
│   ├── transcript.py      # Transcript schema
│   ├── message.py         # Message schema
│   ├── student.py         # Student schema
│   └── user.py            # User schema
├── crud/
│   ├── session.py         # Session CRUD operations
│   ├── transcript.py      # Transcript CRUD operations
│   ├── message.py         # Message CRUD operations
│   ├── student.py         # Student CRUD operations
│   └── user.py            # User CRUD operations
├── api/
│   ├── routes/
│   │   ├── auth.py        # Authentication routes
│   │   ├── sessions.py    # Session routes
│   │   ├── transcripts.py # Transcript routes
│   │   ├── messages.py    # Message routes
│   │   ├── students.py    # Student routes
│   │   ├── schedule.py    # Schedule routes
│   │   └── users.py       # User routes
│   ├── websocket.py       # WebSocket handlers
│   └── deps.py            # Dependency injection
├── tests/
│   ├── test_sessions.py
│   ├── test_messages.py
│   └── ...
├── requirements.txt
└── .env
```

## Configuration

### .env File

```env
# Database
DATABASE_URL=sqlite:///./test.db
# atau PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost/smartlecture_db

# JWT
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
FRONTEND_URL=http://localhost:8081

# Server
DEBUG=True
ENVIRONMENT=development
```

## Basic Setup Example

### main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from dotenv import load_dotenv
import os

from core.database import Base, engine
from api.routes import auth, sessions, transcripts, messages, students, schedule, users
from api.websocket import manager

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Lecture API",
    description="API untuk Smart Lecture Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:8081")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
app.include_router(transcripts.router, prefix="/api", tags=["transcripts"])
app.include_router(messages.router, prefix="/api", tags=["messages"])
app.include_router(students.router, prefix="/api", tags=["students"])
app.include_router(schedule.router, prefix="/api/schedule", tags=["schedule"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Lecture API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
```

### core/config.py

```python
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:8081")
    DEBUG: bool = os.getenv("DEBUG", "True") == "True"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

settings = Settings()
```

### core/database.py

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### core/security.py

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user_id
```

## Running the Server

### Development

```bash
python main.py
```

atau dengan Uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server akan berjalan di `http://localhost:8000`

API documentation akan tersedia di `http://localhost:8000/docs` (Swagger UI)

### Production

```bash
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Database Setup

### SQLite (Development)

Sudah default di `.env`. Database akan dibuat otomatis saat pertama kali jalankan.

### PostgreSQL (Production)

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE smartlecture_db;
```

3. Update `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost/smartlecture_db
```

4. Install PostgreSQL driver:
```bash
pip install psycopg2-binary
```

## Testing

```bash
pip install pytest pytest-asyncio
pytest
```

## API Documentation

Setelah server berjalan:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

## CORS Configuration

Frontend dan backend berjalan di port berbeda, pastikan CORS sudah dikonfigurasi di `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Connecting Frontend to Backend

Update base URL untuk API calls di frontend (bisa di `client/lib/api.ts`):

```typescript
const API_BASE_URL = "http://localhost:8000/api";

export async function fetchSession() {
  const response = await fetch(`${API_BASE_URL}/sessions/active`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  return response.json();
}
```

## Next Steps

1. Setup database models di `models/`
2. Create Pydantic schemas di `schemas/`
3. Implement CRUD operations di `crud/`
4. Create API routes di `api/routes/`
5. Implement WebSocket handlers untuk real-time features
6. Setup authentication & authorization
7. Write tests
8. Deploy to production

## Common Issues

### CORS Error

Pastikan `FRONTEND_URL` di `.env` sesuai dengan URL frontend dan middleware sudah dikonfigurasi.

### Database Connection Error

Pastikan `DATABASE_URL` valid dan database sudah berjalan (untuk PostgreSQL).

### Import Error

Pastikan struktur folder sesuai dan semua import path benar.

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://pydantic-settings.readthedocs.io/)
- [JWT in FastAPI](https://fastapi.tiangolo.com/tutorial/security/first-steps/)
