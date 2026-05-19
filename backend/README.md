# Smart Lecture FastAPI Backend

## Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

## Database & Migration

- Default database: **SQLite** (`backend/smartlecture.db`).
- Migration files live in `backend/app/db/migrations/*.sql`.
- Migrations auto-run at FastAPI startup via `run_migrations()`.

### Ganti ke PostgreSQL/MySQL (next step)

Struktur migrasi sudah disiapkan agar mudah dipindahkan:
1. Ganti `get_connection()` di `backend/app/db/database.py` ke driver PostgreSQL/MySQL.
2. Pertahankan tabel `schema_migrations` untuk versi migrasi.
3. Sesuaikan SQL syntax jika ada perbedaan kecil antar engine.
