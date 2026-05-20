CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('student','instructor')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO users (id, username, password, name, role)
VALUES
  ('student-001', 'siswa', 'siswa123', 'Dina Anjani', 'student'),
  ('instr-001', 'guru', 'guru123', 'Dr. Budi Santoso', 'instructor');
