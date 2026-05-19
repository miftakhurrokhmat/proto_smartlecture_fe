# Smart Lecture - FastAPI Backend Specification

Backend untuk Smart Lecture akan dibangun dengan FastAPI. Dokumentasi ini menjelaskan semua endpoint dan data structures yang diperlukan.

## Base URL

```
http://localhost:8000/api
```

## Authentication

Semua endpoint memerlukan header:
```
Authorization: Bearer {token}
```

---

## Endpoints

### 1. Sessions (Sesi Kelas)

#### GET /sessions/active
Dapatkan sesi aktif saat ini.

**Response:**
```json
{
  "id": "session-001",
  "courseCode": "TI-3A",
  "courseName": "System Informasi",
  "instructorId": "instr-001",
  "instructorName": "Dr. Budi Santoso",
  "startTime": "2024-01-15T08:00:00",
  "endTime": null,
  "status": "active",
  "studentCount": 28
}
```

#### POST /sessions
Buat sesi baru (untuk guru).

**Request:**
```json
{
  "courseCode": "TI-3A",
  "courseName": "System Informasi",
  "scheduledStartTime": "2024-01-15T08:00:00"
}
```

**Response:**
```json
{
  "id": "session-001",
  "status": "created"
}
```

#### PUT /sessions/{sessionId}/end
Akhiri sesi (untuk guru).

**Response:**
```json
{
  "id": "session-001",
  "status": "ended",
  "endTime": "2024-01-15T10:00:00",
  "recordingUrl": "https://storage.example.com/recording-001.mp4"
}
```

#### GET /sessions/{sessionId}/stats
Dapatkan statistik sesi (untuk guru).

**Response:**
```json
{
  "activeStudents": 28,
  "totalMessages": 15,
  "totalQuestions": 6,
  "recordingDuration": 7380
}
```

---

### 2. Transcripts (Transkripsi)

#### GET /sessions/{sessionId}/transcript
Dapatkan transkripsi sesi.

**Query Parameters:**
- `limit` (optional, default: 50)
- `offset` (optional, default: 0)
- `search` (optional): cari teks tertentu

**Response:**
```json
{
  "entries": [
    {
      "id": "trans-001",
      "sessionId": "session-001",
      "timestamp": "2024-01-15T08:15:32",
      "speaker": "instructor",
      "speakerName": "Dr. Budi Santoso",
      "text": "Selamat pagi semuanya..."
    },
    {
      "id": "trans-002",
      "sessionId": "session-001",
      "timestamp": "2024-01-15T08:16:07",
      "speaker": "instructor",
      "speakerName": "Dr. Budi Santoso",
      "text": "Kecerdasan buatan adalah..."
    }
  ],
  "total": 150
}
```

#### GET /sessions/{sessionId}/transcript/summary
Dapatkan ringkasan otomatis transkripsi.

**Response:**
```json
{
  "summary": "Materi hari ini membahas tentang kecerdasan buatan, aplikasinya dalam kehidupan sehari-hari, dan pengenalan suara...",
  "keyPoints": [
    "AI adalah teknologi yang terus berkembang",
    "Neural network meniru cara kerja otak manusia",
    "Pengenalan suara adalah aplikasi praktis AI"
  ],
  "generatedAt": "2024-01-15T10:00:00"
}
```

---

### 3. Messages (Diskusi/Chat)

#### GET /sessions/{sessionId}/messages
Dapatkan pesan dalam sesi.

**Query Parameters:**
- `limit` (optional, default: 50)
- `offset` (optional, default: 0)

**Response:**
```json
{
  "messages": [
    {
      "id": "msg-001",
      "sessionId": "session-001",
      "userId": "student-001",
      "userName": "Dina Anjani",
      "content": "Pak, apakah neural network termasuk dalam machine learning?",
      "timestamp": "2024-01-15T08:18:00",
      "isInstructor": false
    },
    {
      "id": "msg-002",
      "sessionId": "session-001",
      "userId": "instr-001",
      "userName": "Dr. Budi Santoso",
      "content": "Ya, betul. Neural network adalah...",
      "timestamp": "2024-01-15T08:18:30",
      "isInstructor": true
    }
  ],
  "total": 25
}
```

#### POST /sessions/{sessionId}/messages
Kirim pesan dalam sesi.

**Request:**
```json
{
  "content": "Pak, apakah neural network termasuk dalam machine learning?"
}
```

**Response:**
```json
{
  "id": "msg-001",
  "sessionId": "session-001",
  "userId": "student-001",
  "userName": "Dina Anjani",
  "content": "Pak, apakah neural network termasuk dalam machine learning?",
  "timestamp": "2024-01-15T08:18:00",
  "isInstructor": false
}
```

---

### 4. Students (Mahasiswa)

#### GET /sessions/{sessionId}/students
Dapatkan daftar mahasiswa dalam sesi.

**Query Parameters:**
- `limit` (optional, default: 100)
- `offset` (optional, default: 0)
- `status` (optional): "active" | "inactive"

**Response:**
```json
{
  "students": [
    {
      "id": "student-001",
      "name": "Dina Anjani",
      "email": "dina@example.com",
      "status": "active",
      "joinTime": "2024-01-15T08:00:15",
      "lastSeen": "2024-01-15T10:30:00"
    },
    {
      "id": "student-002",
      "name": "Rafi Putra",
      "email": "rafi@example.com",
      "status": "active",
      "joinTime": "2024-01-15T08:05:30",
      "lastSeen": "2024-01-15T10:29:45"
    }
  ],
  "total": 28,
  "activeCount": 27,
  "inactiveCount": 1
}
```

---

### 5. Schedule (Jadwal)

#### GET /schedule/today
Dapatkan jadwal hari ini (untuk siswa).

**Response:**
```json
{
  "schedules": [
    {
      "id": "sched-001",
      "courseCode": "TI-3A",
      "courseName": "System Informasi",
      "instructorName": "Dr. Budi Santoso",
      "startTime": "2024-01-15T08:00:00",
      "endTime": "2024-01-15T10:00:00",
      "status": "live"
    },
    {
      "id": "sched-002",
      "courseCode": "TI-2B",
      "courseName": "Basis Data",
      "instructorName": "Dr. Ahmad Wijaya",
      "startTime": "2024-01-15T10:15:00",
      "endTime": "2024-01-15T12:15:00",
      "status": "upcoming"
    }
  ]
}
```

#### GET /schedule
Dapatkan jadwal (dengan filter).

**Query Parameters:**
- `start_date` (optional): YYYY-MM-DD
- `end_date` (optional): YYYY-MM-DD
- `course_code` (optional): filter berdasarkan kode kursus

**Response:** Sama seperti `/schedule/today`

---

### 6. Audio Recording (Rekaman Audio)

#### GET /sessions/{sessionId}/recording
Dapatkan informasi rekaman audio.

**Response:**
```json
{
  "sessionId": "session-001",
  "duration": 7380,
  "url": "https://storage.example.com/recording-001.mp4",
  "createdAt": "2024-01-15T10:00:00",
  "status": "completed"
}
```

#### POST /sessions/{sessionId}/recording/download
Mulai proses download rekaman.

**Response:**
```json
{
  "downloadUrl": "https://storage.example.com/download/recording-001.mp4",
  "expiresIn": 3600
}
```

---

### 7. User (Pengguna)

#### GET /users/me
Dapatkan informasi pengguna saat ini.

**Response:**
```json
{
  "id": "user-001",
  "name": "Dr. Budi Santoso",
  "email": "budi@example.com",
  "role": "instructor",
  "avatar": "https://storage.example.com/avatars/budi.jpg"
}
```

#### PUT /users/me
Update profil pengguna.

**Request:**
```json
{
  "name": "Dr. Budi Santoso",
  "avatar": "data:image/jpeg;base64,..."
}
```

**Response:** User object

---

### 8. Authentication

#### POST /auth/login
Login pengguna.

**Request:**
```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user-001",
    "name": "Dr. Budi Santoso",
    "email": "budi@example.com",
    "role": "instructor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/logout
Logout pengguna.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### POST /auth/refresh
Refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## WebSocket Events (Real-time)

Untuk fitur real-time seperti update live pesan dan status, gunakan WebSocket:

```
ws://localhost:8000/ws/sessions/{sessionId}
```

### Events:

#### new-message
Pesan baru dalam diskusi.

```json
{
  "type": "new-message",
  "data": {
    "id": "msg-001",
    "userId": "student-001",
    "userName": "Dina Anjani",
    "content": "Pak, apakah...",
    "timestamp": "2024-01-15T08:18:00",
    "isInstructor": false
  }
}
```

#### student-joined
Siswa bergabung dengan sesi.

```json
{
  "type": "student-joined",
  "data": {
    "id": "student-001",
    "name": "Dina Anjani",
    "status": "active",
    "totalStudents": 28
  }
}
```

#### student-left
Siswa keluar dari sesi.

```json
{
  "type": "student-left",
  "data": {
    "id": "student-001",
    "name": "Dina Anjani",
    "totalStudents": 27
  }
}
```

#### transcript-entry
Entry transkripsi baru (real-time transcription).

```json
{
  "type": "transcript-entry",
  "data": {
    "id": "trans-001",
    "timestamp": "2024-01-15T08:15:32",
    "speaker": "instructor",
    "speakerName": "Dr. Budi Santoso",
    "text": "Selamat pagi..."
  }
}
```

---

## Error Responses

Semua error mengikuti format:

```json
{
  "error": "error_code",
  "message": "Deskripsi error yang lebih detail",
  "statusCode": 400
}
```

### Common Error Codes:

- `UNAUTHORIZED`: Token tidak valid atau expired
- `FORBIDDEN`: User tidak memiliki akses
- `NOT_FOUND`: Resource tidak ditemukan
- `VALIDATION_ERROR`: Data input tidak valid
- `SESSION_ENDED`: Sesi sudah berakhir
- `STUDENT_NOT_IN_SESSION`: Siswa tidak terdaftar dalam sesi

---

## Rate Limiting

- 100 requests per minute per user
- WebSocket: 1000 messages per minute per user

---

## Implementation Notes

1. **Pagination**: Semua list endpoint menggunakan `limit` dan `offset`
2. **Timestamps**: Semua timestamp dalam format ISO 8601 (UTC)
3. **User ID**: Diambil dari JWT token
4. **Real-time**: WebSocket untuk fitur real-time (optional tapi recommended)
5. **CORS**: Harus accept requests dari frontend (http://localhost:8081)
