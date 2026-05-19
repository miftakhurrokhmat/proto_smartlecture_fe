import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAuth, getUser } from "@/lib/auth";

interface SidebarProps {
  isTeacher?: boolean;
}

export function Sidebar({ isTeacher = true }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const teacherMenuItems = [
    { icon: Home, label: "Beranda", path: "/teacher" },
    { icon: BookOpen, label: "Sesi", path: "/sessions" },
    { icon: FileText, label: "Materi", path: "/materials" },
    { icon: MessageSquare, label: "Diskusi", path: "/discussions" },
    { icon: Users, label: "Mahasiswa", path: "/students" },
    { icon: BarChart3, label: "Laporan", path: "/reports" },
    { icon: Settings, label: "Pengaturan", path: "/settings" },
  ];

  const studentMenuItems = [
    { icon: Home, label: "Beranda", path: "/student" },
    { icon: BookOpen, label: "Sesi Saya", path: "/my-sessions" },
    { icon: FileText, label: "Transkipsi", path: "/transcripts" },
    { icon: MessageSquare, label: "Ringkasan", path: "/summary" },
    { icon: MessageSquare, label: "Diskusi", path: "/discussions" },
    { icon: Settings, label: "Pengaturan", path: "/settings" },
  ];

  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems;

  return (
    <div className="w-[180px] bg-[#1a2d5a] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-4 border-b border-[#2a4070]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <Play className="w-4 h-4 fill-[#1a2d5a] text-[#1a2d5a]" />
          </div>
          <span className="text-sm font-semibold">Smart Lecture</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                isActive
                  ? "bg-[#264099] text-white"
                  : "text-gray-300 hover:bg-[#2a4070]"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - User Profile */}
      <div className="p-4 border-t border-[#2a4070]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">DB</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate">{user?.name ?? "Guest"}</div>
            <div className="text-xs text-gray-400 truncate">
              {user?.role === "student" ? "Siswa" : "Dosen"}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            clearAuth();
            navigate("/login");
          }}
          className="mt-3 w-full rounded bg-[#264099] px-2 py-1 text-xs hover:bg-[#3453ba]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
