# Smart Lecture - Quick Reference Guide

## Frontend Routes

**Teacher (Guru) Routes:**
- `/` → Teacher Home (active session, transcripts, students, discussion)
- `/sessions` → Sessions Management (placeholder)
- `/materials` → Course Materials (placeholder)
- `/discussions` → Discussions (placeholder)
- `/students` → Student Management (placeholder)
- `/reports` → Session Reports (placeholder)
- `/settings` → Settings (placeholder)

**Student (Siswa) Routes:**
- `/student` → Student Home (active session, schedule, transcript, discussion)
- `/my-sessions` → My Sessions (placeholder)
- `/transcripts` → All Transcripts (placeholder)
- `/summary` → Learning Summary (placeholder)
- `/discussions` → Discussions (placeholder)
- `/settings` → Settings (placeholder)

## Backend API Routes (To Be Implemented)

### Authentication
```
POST   /api/auth/login              → Login
POST   /api/auth/logout             → Logout
POST   /api/auth/refresh            → Refresh Token
```

### Sessions
```
GET    /api/sessions/active         → Get Active Session
POST   /api/sessions                → Create Session
PUT    /api/sessions/{id}/end       → End Session
GET    /api/sessions/{id}/stats     → Get Session Stats
```

### Transcripts
```
GET    /api/sessions/{id}/transcript           → Get Transcript
GET    /api/sessions/{id}/transcript/summary   → Get Transcript Summary
```

### Messages/Discussion
```
GET    /api/sessions/{id}/messages   → Get Messages
POST   /api/sessions/{id}/messages   → Send Message
```

### Students
```
GET    /api/sessions/{id}/students   → Get Student List
```

### Schedule
```
GET    /api/schedule/today   → Get Today's Schedule
GET    /api/schedule         → Get Schedule with Filters
```

### Users
```
GET    /api/users/me   → Get Current User
PUT    /api/users/me   → Update User Profile
```

### WebSocket
```
WS     /ws/sessions/{sessionId}   → Real-time Connection
```

## File Structure

```
.
├── client/                          # Frontend (React)
│   ├── pages/
│   │   ├── Index.tsx               # Teacher Home
│   │   ├── StudentHome.tsx         # Student Home
│   │   └── NotFound.tsx            # 404 Page
│   ├── components/
│   │   ├── Sidebar.tsx             # Navigation
│   │   └── ui/                     # UI Components (Radix UI)
│   ├── lib/
│   │   ├── utils.ts                # Utility Functions
│   │   └── api.ts                  # API Calls (To be created)
│   ├── App.tsx                     # App Entry
│   ├── global.css                  # Global Styles
│   └── vite-env.d.ts
│
├── shared/
│   └── api.ts                      # Shared Types
│
├── server/                         # Backend (Express - optional, can be replaced with FastAPI)
│   ├── index.ts
│   └── routes/
│
├── public/                         # Static Assets
├── dist/                           # Build Output
│
├── tailwind.config.ts              # Tailwind Configuration
├── tsconfig.json                   # TypeScript Configuration
├── vite.config.client.ts
├── vite.config.server.ts
├── package.json
│
├── API_SPECIFICATION.md            # Complete API Docs
├── FASTAPI_SETUP.md                # FastAPI Setup Guide
├── APP_DOCUMENTATION.md            # App Documentation
└── QUICK_REFERENCE.md              # This File
```

## Color Palette

```
Primary:     #7c3aed (Purple)
Dark Navy:   #1a2d5a (Sidebar)
Red:         #ff0000 (LIVE indicator)
Gray:        #6b7280 (Text)
Light Gray:  #f3f4f6 (Background)
White:       #ffffff (Cards)
```

## Styling Conventions

### Tailwind Classes

**Button:**
```tsx
// Primary
<button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2 px-4 rounded-lg font-semibold transition-colors">
  Click Me
</button>

// Secondary
<button className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-semibold transition-colors">
  Click Me
</button>
```

**Card:**
```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  Content
</div>
```

**Input:**
```tsx
<input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]" />
```

**Badge:**
```tsx
<div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
  LIVE
</div>
```

## Component Usage Examples

### Sidebar
```tsx
<Sidebar isTeacher={true} />  // Teacher view
<Sidebar isTeacher={false} /> // Student view
```

### Main Layout
```tsx
<div className="flex h-screen bg-gray-50">
  <Sidebar isTeacher={true} />
  <div className="flex-1 flex flex-col overflow-hidden">
    {/* Header */}
    {/* Content */}
  </div>
</div>
```

## Data Mock Examples

### Session
```typescript
{
  id: "session-001",
  courseCode: "TI-3A",
  courseName: "System Informasi",
  instructorId: "instr-001",
  instructorName: "Dr. Budi Santoso",
  startTime: "2024-01-15T08:00:00",
  status: "active",
  studentCount: 28
}
```

### Transcript Entry
```typescript
{
  time: "10:15:32",
  speaker: "Anda",
  text: "Selamat pagi semuanya..."
}
```

### Message
```typescript
{
  id: "msg-001",
  name: "Dina Anjani",
  time: "10:18",
  message: "Pak, apakah neural network...",
  isTeacher: false
}
```

### Student
```typescript
{
  name: "Dina Anjani",
  status: "Aktif"
}
```

## Common Commands

### Frontend Development
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm typecheck

# Run tests
pnpm test

# Format code
pnpm format.fix
```

### Backend Development (FastAPI)
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py

# Run with auto-reload
uvicorn main:app --reload

# Run tests
pytest
```

## Important Notes

1. **TypeScript**: All code is type-safe with TypeScript
2. **Tailwind CSS**: All styling done with Tailwind utilities
3. **Responsive**: Mobile-first, responsive design
4. **React Router**: SPA with React Router v6
5. **Shared Types**: Use types from `shared/api.ts`

## Next Steps

1. ✅ Frontend pages completed (Teacher & Student)
2. ✅ UI/UX components implemented
3. ✅ Types defined
4. ⬜ Implement FastAPI backend
5. ⬜ Connect API endpoints to frontend
6. ⬜ Add authentication
7. ⬜ Implement WebSocket real-time features
8. ⬜ Add tests
9. ⬜ Deploy to production

## Contact & Support

For issues or questions:
1. Check `API_SPECIFICATION.md` for API details
2. Check `FASTAPI_SETUP.md` for backend setup
3. Check `APP_DOCUMENTATION.md` for detailed documentation
4. Review code comments in source files
