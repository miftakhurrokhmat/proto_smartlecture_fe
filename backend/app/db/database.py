from __future__ import annotations

import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
DB_PATH = BASE_DIR / "backend" / "smartlecture.db"
MIGRATIONS_PATH = Path(__file__).resolve().parent / "migrations"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def run_migrations() -> None:
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS schema_migrations (
              version TEXT PRIMARY KEY,
              applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        applied_versions = {
            row["version"]
            for row in conn.execute("SELECT version FROM schema_migrations").fetchall()
        }

        for sql_file in sorted(MIGRATIONS_PATH.glob("*.sql")):
            version = sql_file.stem
            if version in applied_versions:
                continue
            conn.executescript(sql_file.read_text(encoding="utf-8"))
            conn.execute("INSERT INTO schema_migrations(version) VALUES (?)", (version,))

        # Keep demo accounts deterministic even with legacy local DB data.
        conn.execute(
            """
            DELETE FROM users
            WHERE username IN ('siswa', 'guru')
               OR id IN ('student-001', 'instr-001')
            """
        )
        conn.execute(
            """
            INSERT INTO users (id, username, password, name, role)
            VALUES
              ('student-001', 'siswa', 'siswa123', 'Dina Anjani', 'student'),
              ('instr-001', 'guru', 'guru123', 'Dr. Budi Santoso', 'instructor')
            """
        )
        conn.commit()
