import type {
  Message,
  Session,
  StudentListResponse,
  TranscriptResponse,
} from "@shared/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";
const DEV_TOKEN = "dev-token";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEV_TOKEN}`,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
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
