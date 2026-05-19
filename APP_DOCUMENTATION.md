# Smart Lecture - Dokumentasi Aplikasi

## Overview

Smart Lecture adalah platform pembelajaran interaktif yang menghubungkan guru dan siswa dalam sesi kelas online real-time. Aplikasi ini menyediakan transkripsi real-time, diskusi interaktif, dan statistik engagement.

## Arsitektur

### Frontend (React + TypeScript + Tailwind CSS)

**Location**: `client/`

Teknologi:
- React 18
- React Router 6 (SPA)
- TypeScript
- Tailwind CSS 3
- Vite (build tool)
- Lucide React (icons)

### Backend (FastAPI - akan diimplementasikan)

**Location**: Terpisah (akan dibuat)

Teknologi:
- Python 3.9+
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL/SQLite (Database)
- JWT (Authentication)
- WebSocket (Real-time)

---

## Frontend Structure

### Pages

#### 1. **Teacher Home** (`client/pages/Index.tsx`)
Halaman utama guru menampilkan:

**Components:**
- **Live Session Card**: Status sesi aktif dengan timer
- **Transcript Panel**: Tab transkripsi dengan search, dan audio recording waveform
- **Interaction Summary**: Statistik 28 mahasiswa aktif, 15 chat, 6 pertanyaan
- **Active Students**: Daftar mahasiswa dengan status aktif/inactive
- **Discussion Panel**: Chat real-time antara guru dan siswa

**Layout**: 3 kolom (2 kolom konten utama + 1 kolom sidebar)

**Features:**
- View/end session
- Search transcripts
- Audio playback
- Real-time discussion
- Student activity monitoring

#### 2. **Student Home** (`client/pages/StudentHome.tsx`)
Halaman utama siswa menampilkan:

**Components:**
- **Active Session Card**: Tombol "Masuk ke Sesi"
- **Transcript Panel**: Tab transkripsi + ringkasan
- **Schedule Panel**: Jadwal kelas hari ini (LIVE, upcoming)
- **TTS Feature**: Text-to-Speech untuk aksesibilitas
- **Summary Tab**: Ringkasan otomatis, materi, dan poin penting
- **Discussion Panel**: Chat dengan guru dan siswa lain

**Layout**: 3 kolom (2 kolom konten utama + 1 kolom sidebar)

**Features:**
- Join session
- View transcript
- See daily schedule
- Use TTS
- Real-time discussion

### Components

#### **Sidebar** (`client/components/Sidebar.tsx`)

Navigasi utama dengan dark theme.

**Props:**
```typescript
interface SidebarProps {
  isTeacher?: boolean; // Menentukan menu untuk guru atau siswa
}
```

**Menu Items (Guru):**
- Beranda
- Sesi
- Materi
- Diskusi
- Mahasiswa
- Laporan
- Pengaturan

**Menu Items (Siswa):**
- Beranda
- Sesi Saya
- Transkipsi
- Ringkasan
- Diskusi
- Pengaturan

**Features:**
- Active link highlighting
- User profile di footer
- Responsive navigation

### Styling

**Color Scheme:**
- Primary: `#7c3aed` (Purple - modern, professional)
- Sidebar: `#1a2d5a` (Dark Navy)
- Accent: `#ff0000` (Red - untuk LIVE indicator)
- Neutral: Gray shades

**Tailwind Config Updates:**
- Custom colors di `tailwind.config.ts`
- CSS variables di `client/global.css`
- All HSL format untuk consistency

---

## Data Types (Shared)

File: `shared/api.ts`

### Core Types

```typescript
// Session
interface Session {
  id: string;
  courseCode: string;
  courseName: string;
  instructorId: string;
  instructorName: string;
  startTime: string;
  endTime?: string;
  status: "active" | "ended" | "scheduled";
  studentCount: number;
}

// Transcript
interface TranscriptEntry {
  id: string;
  sessionId: string;
  timestamp: string;
  speaker: "instructor" | "student";
  speakerName: string;
  text: string;
}

// Message/Discussion
interface Message {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  isInstructor: boolean;
}

// Student
interface Student {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinTime?: string;
  lastSeen?: string;
}

// Schedule
interface Schedule {
  id: string;
  courseCode: string;
  courseName: string;
  instructorName: string;
  startTime: string;
  endTime: string;
  status: "live" | "upcoming" | "completed";
}

// User
interface User {
  id: string;
  name: string;
  email: string;
  role: "instructor" | "student";
  avatar?: string;
}
```

---

## Backend API Endpoints

Lihat `API_SPECIFICATION.md` untuk dokumentasi lengkap.

### Main Endpoint Groups

1. **Authentication** (`/api/auth`)
   - POST /login
   - POST /logout
   - POST /refresh

2. **Sessions** (`/api/sessions`)
   - GET /active
   - POST / (create)
   - PUT /{id}/end
   - GET /{id}/stats

3. **Transcripts** (`/api/sessions/{id}/transcript`)
   - GET / (with pagination)
   - GET /summary

4. **Messages** (`/api/sessions/{id}/messages`)
   - GET / (with pagination)
   - POST / (send message)

5. **Students** (`/api/sessions/{id}/students`)
   - GET / (list with filter)

6. **Schedule** (`/api/schedule`)
   - GET /today
   - GET / (with filter)

7. **Users** (`/api/users`)
   - GET /me
   - PUT /me

### WebSocket

```
ws://localhost:8000/ws/sessions/{sessionId}
```

Events:
- `new-message`: Pesan baru
- `student-joined`: Siswa bergabung
- `student-left`: Siswa keluar
- `transcript-entry`: Entry transkripsi baru

---

## Development Workflow

### 1. Setup Frontend

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# Server akan berjalan di http://localhost:8081
```

API docs:
- Swagger: http://localhost:8081/docs
- ReDoc: http://localhost:8081/redoc

### 2. Setup Backend (FastAPI)

Lihat `FASTAPI_SETUP.md` untuk detail.

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
# Server akan berjalan di http://localhost:8000
```

API docs:
- Swagger: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 3. Connect Frontend to Backend

Update base URL di frontend untuk API calls:

```typescript
const API_BASE_URL = "http://localhost:8000/api";
```

### 4. Testing

```bash
# Frontend tests
pnpm test

# Backend tests
pytest
```

---

## Key Features

### 1. Real-time Transcription
- Speech-to-text otomatis saat guru berbicara
- Live updates ke semua siswa
- Search transcript functionality

### 2. Interactive Discussion
- Chat real-time antara guru dan siswa
- WebSocket untuk instant delivery
- Message history

### 3. Student Activity Tracking
- Monitor siswa aktif/inactive
- Track last seen time
- Join/leave notifications

### 4. Session Management
- Start/end session
- Timer display
- Recording audio

### 5. Accessibility
- Text-to-Speech untuk siswa
- High contrast mode ready
- Keyboard navigation

### 6. Responsive Design
- Works on desktop, tablet, mobile
- Adaptive layout
- Touch-friendly

---

## Integration Guide

### Adding a New API Call

1. **Define Type** in `shared/api.ts`:
```typescript
export interface MyResponse {
  data: string;
}
```

2. **Create API Service**:
```typescript
// client/lib/api.ts
export async function fetchMyData() {
  const response = await fetch(`${API_BASE_URL}/my-endpoint`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  const data: MyResponse = await response.json();
  return data;
}
```

3. **Use in Component**:
```typescript
import { fetchMyData } from "@/lib/api";

export function MyComponent() {
  const [data, setData] = useState<MyResponse | null>(null);

  useEffect(() => {
    fetchMyData().then(setData);
  }, []);

  return <div>{data?.data}</div>;
}
```

### Adding a New Page

1. **Create Component** in `client/pages/MyPage.tsx`
2. **Add Route** in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Adding a New Component

1. **Create Component** in `client/components/MyComponent.tsx`
2. **Import and Use** di page/component lain

---

## Best Practices

### Frontend

1. **Use TypeScript** for type safety
2. **Component Composition** - break down into smaller components
3. **Custom Hooks** for shared logic
4. **React Query** for data fetching (optional but recommended)
5. **Tailwind Utilities** for styling
6. **Error Handling** for API calls

### Backend

1. **Separation of Concerns** - models, schemas, CRUD, routes
2. **Input Validation** dengan Pydantic
3. **Database Transactions** untuk data consistency
4. **JWT Authentication** untuk security
5. **Proper HTTP Status Codes**
6. **Error Handling** dengan detail messages

---

## Deployment

### Frontend

Bisa deploy di:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

### Backend

Bisa deploy di:
- Heroku
- Railway
- DigitalOcean
- AWS
- Google Cloud

---

## Monitoring & Logging

### Frontend

- Browser DevTools
- Network tab untuk API calls
- Console untuk errors

### Backend

- FastAPI logs
- Database query logs
- Application metrics

---

## Troubleshooting

### Frontend Issues

**Dev server tidak start:**
```bash
pnpm install  # Re-install dependencies
pnpm dev      # Start server
```

**TypeScript errors:**
```bash
pnpm typecheck
```

**Styling issues:**
```bash
# Check tailwind config dan global.css
pnpm build:client
```

### Backend Issues

Lihat `FASTAPI_SETUP.md` section "Common Issues".

---

## Future Enhancements

1. **Advanced Transcription**
   - Speaker identification
   - Sentiment analysis
   - Keyword extraction

2. **Analytics Dashboard**
   - Attendance trends
   - Engagement metrics
   - Performance analysis

3. **Notification System**
   - Email notifications
   - Push notifications
   - In-app notifications

4. **Recording & Playback**
   - Session recording
   - Playback with transcript sync
   - Download recordings

5. **Collaboration Tools**
   - Shared whiteboard
   - Screen sharing
   - File sharing

6. **Mobile App**
   - React Native app
   - iOS & Android support

---

## Support & Documentation

- API Specification: See `API_SPECIFICATION.md`
- FastAPI Setup: See `FASTAPI_SETUP.md`
- Frontend Code: See `client/` directory
- Shared Types: See `shared/api.ts`
