/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// ===== Session Types =====
export interface Session {
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

export interface SessionStats {
  activeStudents: number;
  totalMessages: number;
  totalQuestions: number;
  recordingDuration: number;
}

// ===== Transcript Types =====
export interface TranscriptEntry {
  id: string;
  sessionId: string;
  timestamp: string;
  speaker: "instructor" | "student";
  speakerName: string;
  text: string;
}

export interface TranscriptRequest {
  sessionId: string;
  limit?: number;
  offset?: number;
}

export interface TranscriptResponse {
  entries: TranscriptEntry[];
  total: number;
}

// ===== Discussion/Message Types =====
export interface Message {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  isInstructor: boolean;
}

export interface MessageRequest {
  sessionId: string;
  content: string;
}

export interface MessageResponse extends Message {}

// ===== Student Types =====
export interface Student {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinTime?: string;
  lastSeen?: string;
}

export interface StudentListResponse {
  students: Student[];
  total: number;
}

// ===== Schedule Types =====
export interface Schedule {
  id: string;
  courseCode: string;
  courseName: string;
  instructorName: string;
  startTime: string;
  endTime: string;
  status: "live" | "upcoming" | "completed";
}

export interface ScheduleResponse {
  schedules: Schedule[];
}

// ===== Audio Recording Types =====
export interface AudioRecording {
  sessionId: string;
  duration: number;
  url: string;
  createdAt: string;
}

// ===== User Types =====
export interface User {
  id: string;
  name: string;
  email: string;
  role: "instructor" | "student";
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
