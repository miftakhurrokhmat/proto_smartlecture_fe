import { Sidebar } from "@/components/Sidebar";
import {
  Bell,
  Download,
  Trash2,
  MessageCircle,
  ChevronDown,
  Search,
  Send,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [activeTab, setActiveTab] = useState<"transcript" | "audio">(
    "transcript"
  );
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const transcripts = [
    {
      time: "10:15:32",
      speaker: "Anda",
      text: "Selamat pagi semuanya. Pada pertemuan kali ini kita akan membahas tentang konsep dasar kecerdasan buatan dan penerapannya dalam kehidupan sehari-hari.",
    },
    {
      time: "10:16:07",
      speaker: "Anda",
      text: "Kecerdasan buatan adalah bidang ilmu komputer yang berfokus pada pembuat sistem yang dapat melakukan tugas-tugas yang biasanya membutuhkan kecerdasan manusia.",
    },
    {
      time: "10:16:45",
      speaker: "Anda",
      text: "Contohnya termasuk pengenalan suara, pengenalan gambar, pengambilan keputusan, dan banyak lagi.",
    },
    {
      time: "10:17:12",
      speaker: "Anda",
      text: "Mari kita mulai dengan pengenalan suara, yaitu teknologi yang memungkinkan komputer memahami ucapan manusia.",
    },
  ];

  const discussions = [
    {
      id: 1,
      name: "Dina Anjani",
      time: "10:18",
      message: "Pak, apakah neural network termasuk dalam machine learning?",
      isTeacher: false,
      avatar: "DA",
    },
    {
      id: 2,
      name: "Dr. Budi Santoso",
      time: "10:18",
      message:
        "Ya, betul. Neural network adalah salah satu algoritma dalam machine learning yang terinspirasi dari cara kerja otak manusia.",
      isTeacher: true,
      avatar: "BS",
    },
  ];

  const students = [
    { name: "Dina Anjani", status: "Aktif" },
    { name: "Rafi Putra", status: "Aktif" },
    { name: "Siti Nurhaliza", status: "Aktif" },
    { name: "Andi Wijaya", status: "Aktif" },
    { name: "Maya Lestari", status: "Tidak Aktif" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isTeacher={true} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Beranda</h1>
            <p className="text-sm text-gray-600">
              Kelola sesi dan interaksi kelas dengan mudah.
            </p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Left Column - Main Session */}
            <div className="col-span-2 flex flex-col gap-6">
              {/* Active Session Card */}
              <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Sesi Aktif</h2>
                    <p className="text-purple-100 text-sm">
                      System Informasi (TI-3A)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">LIVE</span>
                  </div>
                </div>
                <div className="text-4xl font-bold mb-4">00:32:45</div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                    ■ Akhiri Sesi
                  </button>
                  <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                    Lihat Sesi
                  </button>
                </div>
              </div>

              {/* Tabs and Content */}
              <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`flex-1 py-4 px-6 font-medium text-sm transition-colors ${
                      activeTab === "transcript"
                        ? "text-[#7c3aed] border-b-2 border-[#7c3aed]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Transkripsi
                  </button>
                  <button
                    onClick={() => setActiveTab("audio")}
                    className={`flex-1 py-4 px-6 font-medium text-sm transition-colors ${
                      activeTab === "audio"
                        ? "text-[#7c3aed] border-b-2 border-[#7c3aed]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Rekaman Audio
                  </button>
                </div>

                {/* Transcript Tab */}
                {activeTab === "transcript" && (
                  <div className="p-6 flex flex-col flex-1 overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <Search className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cari dalam transkipsi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                      />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3">
                      {transcripts.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="text-xs text-gray-500 font-medium min-w-fit pt-0.5">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-gray-900 mb-1">
                              {item.speaker}
                            </div>
                            <div className="text-sm text-gray-700 leading-relaxed">
                              {item.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-center pt-4 border-t border-gray-100">
                      <button className="text-[#7c3aed] text-sm font-medium hover:underline">
                        Tampilkan lebih banyak
                      </button>
                    </div>
                  </div>
                )}

                {/* Audio Tab */}
                {activeTab === "audio" && (
                  <div className="p-6 flex flex-col items-center justify-center flex-1">
                    <div className="flex items-center gap-4 w-full mb-6">
                      <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors flex-shrink-0">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </button>
                      <div className="flex-1 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg flex items-center px-4">
                        <div className="flex items-center gap-1 w-full h-8">
                          {[...Array(40)].map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] rounded-full"
                              style={{
                                height: Math.random() * 20 + 4 + "px",
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full text-sm text-gray-600">
                      <div>00:32:45</div>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        ◼ Rekaman tersimpan otomatis
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Stats & Discussion */}
            <div className="col-span-1 flex flex-col gap-6 overflow-hidden">
              {/* Interaction Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Ringkasan Interaksi
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">28</div>
                    <div className="text-sm text-gray-600">Mahasiswa Aktif</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">15</div>
                    <div className="text-sm text-gray-600">Interaksi (Chat)</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">6</div>
                    <div className="text-sm text-gray-600">Pertanyaan</div>
                  </div>
                </div>
              </div>

              {/* Active Students */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Mahasiswa Aktif (28)
                </h3>
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {students.map((student, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-900 truncate">
                          {student.name}
                        </span>
                      </div>
                      <div
                        className={`text-xs font-medium flex-shrink-0 ${
                          student.status === "Aktif"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {student.status === "Aktif" ? "● Aktif" : "○ Tidak"}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-[#7c3aed] text-sm font-medium hover:underline">
                  Lihat semua
                </button>
              </div>

              {/* Discussion Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Diskusi Kelas
                </h3>
                <div className="space-y-3 flex-1 min-h-0 overflow-y-auto mb-4">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-gray-900">
                            {discussion.name}
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          {discussion.time}
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            discussion.isTeacher
                              ? "text-[#7c3aed]"
                              : "text-gray-700"
                          }`}
                        >
                          {discussion.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <input
                    type="text"
                    placeholder="Tulis pesan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
