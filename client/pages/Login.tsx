import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { setAuth } from "@/lib/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const data = await api.login(username, password);
      setAuth(data.access_token, data.user);
      navigate(data.user.role === "student" ? "/student" : "/teacher");
    } catch {
      setError("Login gagal. Cek username/password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl border p-6 space-y-4">
        <h1 className="text-xl font-bold">Login Smart Lecture</h1>
        <p className="text-sm text-gray-600">Demo akun: guru/guru123 atau siswa/siswa123</p>
        <input className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button onClick={handleLogin} className="w-full bg-[#7c3aed] text-white py-2 rounded">Masuk</button>
      </div>
    </div>
  );
}
