import type {
  Message,
  Session,
  StudentListResponse,
  TranscriptResponse,
} from "@shared/api";
import { getToken } from "@/lib/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (username: string, password: string) =>
    request<{ access_token: string; token_type: string; user: { id: string; name: string; role: "student" | "instructor" } }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ username, password }) }
    ),
  logout: () => request<{ status: string }>("/auth/logout", { method: "POST" }),
  getActiveSession: () => request<Session>("/sessions/active"),
  getTranscript: (sessionId: string, search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return request<TranscriptResponse>(`/sessions/${sessionId}/transcript${query}`);
  },
  getMessages: (sessionId: string) =>
    request<{ messages: Message[]; total: number }>(`/sessions/${sessionId}/messages`),
  postMessage: (sessionId: string, content: string) =>
    request<Message>(`/sessions/${sessionId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
  getStudents: (sessionId: string) =>
    request<StudentListResponse>(`/sessions/${sessionId}/students`),
};
