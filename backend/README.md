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
- Demo user credentials juga di-sync tiap startup (jadi login tetap bisa meski DB lama):
  - `guru / guru123`
  - `siswa / siswa123`
  - sinkronisasi dilakukan dengan hapus+insert untuk username/id demo agar konsisten walau DB lama pernah berubah.

## Menjalankan FE + BE agar login berhasil

Jalankan backend FastAPI **dan** frontend Vite secara paralel:

```bash
# terminal 1
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

# terminal 2
cd ..
pnpm dev
```

### Ganti ke PostgreSQL/MySQL (next step)

Struktur migrasi sudah disiapkan agar mudah dipindahkan:
1. Ganti `get_connection()` di `backend/app/db/database.py` ke driver PostgreSQL/MySQL.
2. Pertahankan tabel `schema_migrations` untuk versi migrasi.
3. Sesuaikan SQL syntax jika ada perbedaan kecil antar engine.
