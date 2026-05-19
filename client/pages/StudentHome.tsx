import { Sidebar } from "@/components/Sidebar";
import {
  Bell,
  Volume2,
  MessageCircle,
  ChevronDown,
  Speaker,
  Search,
  Send,
  MoreVertical,
  Zap,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function StudentHome() {
  const [activeTab, setActiveTab] = useState<"transcript" | "summary">(
    "transcript"
  );
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const transcripts = [
    {
      time: "10:15:32",
      speaker: "Dosen",
      text: "Selamat pagi semuanya. Pada pertemuan kali ini kita akan membahas tentang konsep dasar kecerdasan buatan dan penerapannya dalam kehidupan sehari-hari.",
    },
    {
      time: "10:16:07",
      speaker: "Dosen",
      text: "Kecerdasan buatan adalah bidang ilmu komputer yang berfokus pada pembuat sistem yang dapat melakukan tugas-tugas yang biasanya membutuhkan kecerdasan manusia.",
    },
    {
      time: "10:16:45",
      speaker: "Dosen",
      text: "Contohnya termasuk pengenalan suara, pengenalan gambar, pengambilan keputusan, dan banyak lagi.",
    },
    {
      time: "10:17:12",
      speaker: "Dosen",
      text: "Mari kita mulai dengan pengenalan suara, yaitu teknologi yang memungkinkan komputer memahami ucapan manusia.",
    },
  ];

  const schedules = [
    {
      name: "System Informasi (TI-3A)",
      time: "08:00 - 10:00",
      status: "LIVE",
      color: "red",
    },
    {
      name: "Basis Data (TI-2B)",
      time: "10:15 - 12:15",
      status: "upcoming",
      color: "gray",
    },
    {
      name: "Kecerdasan Buatan (TI-4A)",
      time: "13:00 - 15:00",
      status: "upcoming",
      color: "gray",
    },
  ];

  const discussions = [
    {
      id: 1,
      name: "Anda",
      time: "10:18",
      message: "Pak, apakah neural network termasuk dalam machine learning?",
      isTeacher: false,
      avatar: "YA",
    },
    {
      id: 2,
      name: "Dosen",
      time: "10:19",
      message:
        "Ya, betul. Neural network adalah salah satu algoritma dalam machine learning yang terinspirasi dari cara kerja otak manusia.",
      isTeacher: true,
      avatar: "DS",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isTeacher={false} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Beranda</h1>
            <p className="text-sm text-gray-600">
              Belajar inklusif, setiap suara berarti.
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
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      Sesi Aktif
                    </h2>
                    <p className="text-sm text-gray-600">
                      System Informasi (TI-3A)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Dr. Budi Santoso
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-red-100 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-red-600">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  00:32:45
                </div>
                <button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                  Masuk ke Sesi
                </button>
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
                    onClick={() => setActiveTab("summary")}
                    className={`flex-1 py-4 px-6 font-medium text-sm transition-colors ${
                      activeTab === "summary"
                        ? "text-[#7c3aed] border-b-2 border-[#7c3aed]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Ringkasan
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
                            <div className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded mb-1">
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

                {/* Summary Tab */}
                {activeTab === "summary" && (
                  <div className="p-6 flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                        <Speaker className="w-5 h-5 text-[#7c3aed] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            Ringkasan Audio
                          </div>
                          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                            Materi hari ini membahas tentang kecerdasan buatan,
                            aplikasinya dalam kehidupan sehari-hari, dan
                            pengenalan suara sebagai salah satu teknologi
                            terpenting yang memungkinkan interaksi manusia-mesin.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            Materi Pembelajaran
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            File, slides, dan referensi tambahan tersedia untuk
                            diunduh dan dipelajari lebih lanjut.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
                        <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            Poin Penting
                          </div>
                          <ul className="text-sm text-gray-700 mt-2 space-y-1 list-disc list-inside">
                            <li>AI adalah teknologi yang terus berkembang</li>
                            <li>
                              Neural network meniru cara kerja otak manusia
                            </li>
                            <li>Pengenalan suara adalah aplikasi praktis AI</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Schedule & Discussion */}
            <div className="col-span-1 flex flex-col gap-6 overflow-hidden">
              {/* Today's Schedule */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Jadwal Hari Ini
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {schedules.map((schedule, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-l-2 ${
                        schedule.status === "LIVE"
                          ? "bg-red-50 border-red-500"
                          : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-semibold text-gray-900">
                        {schedule.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {schedule.time}
                      </div>
                      {schedule.status === "LIVE" && (
                        <div className="inline-block mt-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                          LIVE
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text-to-Speech Feature */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Ucapkan (TTS)
                </h3>
                <div className="space-y-3">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white">
                    <option>Suara Perempuan</option>
                    <option>Suara Laki-laki</option>
                    <option>Suara Netral</option>
                  </select>
                  <button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Ucapkan
                  </button>
                </div>
              </div>

              {/* Discussion Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 mb-4">Diskusi</h3>
                <div className="space-y-3 flex-1 min-h-0 overflow-y-auto mb-4">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                        {discussion.avatar}
                      </div>
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
                              ? "text-[#7c3aed] font-medium"
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
