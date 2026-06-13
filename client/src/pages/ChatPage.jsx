import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, ChevronDown, LogOut, Search, Menu, X, Plus, Loader2, User,
  UploadCloud, FolderOpen, Brain, ClipboardList, FileText, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

// Import local assets
import assetPetunjuk from '../assets/Asset petunjuk.png';
import assetPengaturan from '../assets/asset Pengaturan.png';
import assetChat from '../assets/asset chat.png';
import assetDiskusiBaru from '../assets/asset diskusi baru.png';
import assetGuided from '../assets/asset guided.png';
import assetLatihanSoal from '../assets/asset latihan soal.png';
import assetModeBelajar from '../assets/asset mode belajar.png';
import assetSesiBelajar from '../assets/asset sesi belajar.png';
import assetSocratic from '../assets/asset socratic.png';
import iconAIPahamin from '../assets/icon AI Pahamin.png';
import iconPerson from '../assets/icon person.png';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // States and refs for revisions
  const [showPlusOptions, setShowPlusOptions] = useState(false);
  const [showThinkingTrace, setShowThinkingTrace] = useState(false);
  const fileInputRef = useRef(null);
  const chatInputRef = useRef(null);
  
  // Topic-based sessions list with dummy chat history
  const topicSessions = [
    { 
      id: 'trigonometri', 
      name: 'Trigonometri', 
      history: [
        { role: 'assistant', content: 'Halo! Aku PahamIn, partner berfikirmu. Topik apa yang ingin kita bedah secara mendalam hari ini? Sebelumnya, ceritakan sedikit dong apa yang sudah kamu ketahui tentang Trigonometri!' },
        { role: 'user', content: 'Kamu tahu ngga Trigonometri itu apa?. Kalo setahu Aku Trigonometri itu perbandingan sisi pada segitiga siku-siku.' },
        { role: 'assistant', content: 'Betul sekali!. Coba kamu sebutkan 3 perbandingan Trigonometri dasar yang kamu tahu.' },
        { role: 'user', content: 'Setahu aku ada Sinus, Cosinus, dan Tangen' },
        { role: 'assistant', content: 'Kamu hebat!. Untuk segitiga siku-siku sisi mana yang disebut sisi depan, sisi samping, dan sisi miring?' },
        { role: 'user', content: 'Sisi depan adalah sisi yang berhadapan dengan sudut, sisi samping yang berdekatan, dan sisi miring adalah hipotenusa.' },
        { role: 'assistant', content: 'Tepat sekali!. Sekarang bagaimana kamu menggunakan perbandingan ini untuk mencari panjang salah satu sisi?' },
        { role: 'user', content: 'Aku pilih perbandingan yang sesuai, lalu substitusi nilai yang diketahui untuk mencari sisi yang belum diketahui.' },
        { role: 'assistant', content: 'Bagus sekali! Kamu sudah memahami konsep dasar Trigonometri dengan baik. Sekarang, apakah kamu ingin mencoba latihan soal atau ada bagian tertentu yang ingin kita bahas lebih lanjut?' }
      ]
    },
    { 
      id: 'hukum-newton', 
      name: 'Hukum Newton', 
      history: [
        { role: 'assistant', content: 'Halo! Aku PahamIn, partner berfikirmu. Hari ini kita mau bedah konsep seru tentang Hukum Newton nih. Sebelum kita mulai, ceritakan sedikit dong, menurutmu apa sih dasarnya Hukum Newton itu?' },
        { role: 'user', content: 'Setahu aku Hukum Newton itu tentang gerak benda dan gaya yang mempengaruhinya. Ada Hukum 1, 2, dan 3.' },
        { role: 'assistant', content: 'Mantap! Pemahaman awal yang bagus sekali. Sekarang, coba bayangkan saat kamu naik mobil lalu tiba-tiba mobil direm mendadak, tubuhmu akan terdorong ke depan, kan? Menurutmu, hukum keberapa yang menjelaskan fenomena ini dan mengapa?' },
        { role: 'user', content: 'Itu Hukum Newton 1, karena tubuh kita cenderung mempertahankan keadaannya yang sedang bergerak maju.' },
        { role: 'assistant', content: 'Luar biasa! Benar sekali, itu disebut Hukum Inersia atau Kelembaman. Nah, sekarang bagaimana dengan Hukum Newton 2? Apa yang terjadi pada percepatan suatu benda jika gaya yang diberikan semakin besar?' }
      ]
    },
    { 
      id: 'persamaan-linear', 
      name: 'Persamaan Linear', 
      history: [
        { role: 'assistant', content: 'Halo! Aku PahamIn, partner berfikirmu. Yuk kita bahas Persamaan Linear hari ini. Sebelumnya, pernah dengar istilah "variabel" dalam matematika? Menurutmu apa itu?' },
        { role: 'user', content: 'Variabel itu seperti huruf pengganti angka yang belum diketahui nilainya, contohnya x atau y.' },
        { role: 'assistant', content: 'Tepat sekali! Variabel adalah simbol untuk nilai yang belum diketahui. Nah, jika kita punya persamaan sederhana seperti `2x + 4 = 10`, langkah apa yang terpikir olehmu untuk mencari nilai x?' },
        { role: 'user', content: 'Kita kurangi kedua ruas dengan 4 dulu, jadi 2x = 6. Lalu dibagi 2, ketemu x = 3.' },
        { role: 'assistant', content: 'Hebat! Kamu melakukan pemindahan ruas dengan sangat logis. Mengapa kita harus melakukan operasi yang sama (seperti mengurangi 4 atau membagi 2) di kedua sisi persamaan?' }
      ]
    }
  ];

  const [activeTopicId, setActiveTopicId] = useState('trigonometri');
  const [activeMode, setActiveMode] = useState('socratic');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  
  // Sync sessionId and load history/initial messages whenever activeTopicId or activeMode changes
  useEffect(() => {
    const key = `sessionId_${activeTopicId}_${activeMode}`;
    let storedSessionId = localStorage.getItem(key);
    
    // Auto-migration: if in Socratic mode and no new key exists, check old key format
    if (!storedSessionId && activeMode === 'socratic') {
      const oldKey = `sessionId_${activeTopicId}`;
      const oldSession = localStorage.getItem(oldKey);
      if (oldSession) {
        storedSessionId = oldSession;
        localStorage.setItem(key, oldSession);
        localStorage.removeItem(oldKey);
      }
    }
    
    setSessionId(storedSessionId || null);

    if (storedSessionId) {
      const loadHistoryDirect = async (sid) => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${API_URL}/history/${sid}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMessages(res.data);
        } catch (err) {
          console.error("Failed to load history", err);
        }
      };
      loadHistoryDirect(storedSessionId);
    } else {
      const initialMessages = getInitialHistory(activeTopicId, activeMode);
      setMessages(initialMessages);
    }
  }, [activeTopicId, activeMode]);
  
  const messagesEndRef = useRef(null);

  const handleFileUploadClick = () => {
    setShowPlusOptions(false);
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessages(prev => [...prev, { role: 'user', content: `[Mengunggah dokumen: ${file.name}]` }]);
    setLoading(true);
    setShowPlusOptions(false);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Wah, dokumen **${file.name}** berhasil diunggah! 📁\n\nBerdasarkan isi dokumen tersebut, mari kita diskusikan bersama. Apa yang ingin kamu tanyakan atau bagian mana yang menurutmu paling sulit dipahami dari materi ini?` 
      }]);
      setLoading(false);
    }, 1200);

    e.target.value = '';
  };

  const handleOptionLatihanSoal = () => {
    setShowPlusOptions(false);
    setInput("Tolong buatkan beberapa soal latihan mengenai topik ini dong!");
    chatInputRef.current?.focus();
  };

  const handleOptionRingkasan = () => {
    setShowPlusOptions(false);
    setInput("Bisa tolong buatkan ringkasan materi dari diskusi kita ini?");
    chatInputRef.current?.focus();
  };

  const renderThinkingTraceModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowThinkingTrace(false)}
          className="absolute inset-0 bg-[#0f172a]"
        />
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative z-10 border border-slate-100 text-[#1E3A5F] text-left max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EAF9F9] flex items-center justify-center text-[#00B4B4]">
                <Brain size={20} />
              </div>
              <h3 className="text-lg font-black font-sans">AI Thinking Trace</h3>
            </div>
            <button 
              onClick={() => setShowThinkingTrace(false)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-xs text-slate-500 font-bold mb-6 leading-relaxed font-sans">
            Ini adalah alur penalaran pedagogis Socratic yang digunakan PahamIn untuk membantumu memahami konsep secara mandiri tanpa langsung menyontek jawaban.
          </p>

          <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 font-sans">
            <div className="flex gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-[#EAF9F9] border-2 border-white flex items-center justify-center text-[#00B4B4] font-black text-sm z-10 shadow-sm shrink-0">
                1
              </div>
              <div>
                <h5 className="text-sm font-black">Tahap 1: Asesmen Pengetahuan Awal</h5>
                <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">
                  AI mendeteksi sejauh mana pemahamanmu tentang topik ini. Pertanyaan dirancang untuk membuka memori jangka panjangmu.
                </p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-[#EBF5FF] border-2 border-white flex items-center justify-center text-blue-500 font-black text-sm z-10 shadow-sm shrink-0">
                2
              </div>
              <div>
                <h5 className="text-sm font-black">Tahap 2: Pemberian Pertanyaan Pemantik</h5>
                <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">
                  Alih-alih memberikan rumus/solusi langsung, AI menyusun pertanyaan bertingkat yang menantang miskonsepsi secara halus.
                </p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-[#F5F3FF] border-2 border-white flex items-center justify-center text-purple-500 font-black text-sm z-10 shadow-sm shrink-0">
                3
              </div>
              <div>
                <h5 className="text-sm font-black">Tahap 3: Konstruksi Mandiri (Scaffolding)</h5>
                <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">
                  Siswa dibimbing untuk menyatukan potongan petunjuk dan menarik kesimpulan matematis/sains secara logis.
                </p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-[#FFF9E6] border-2 border-white flex items-center justify-center text-amber-500 font-black text-sm z-10 shadow-sm shrink-0">
                4
              </div>
              <div>
                <h5 className="text-sm font-black">Tahap 4: Penguatan & Umpan Balik Positif</h5>
                <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">
                  AI merayakan keberhasilan berpikirmu, meringkas kesimpulanmu, dan memberikan pemantik baru untuk topik lanjutan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 font-sans">
            <button 
              onClick={() => setShowThinkingTrace(false)}
              className="w-full py-3 bg-[#1E3A5F] hover:bg-[#152a46] text-white rounded-xl font-black text-sm transition-all shadow-sm"
            >
              Tutup & Lanjutkan Belajar
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const cleanApiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;
  const API_URL = `${cleanApiUrl}/api/chat`;
  const displayName = user?.name || "Budi Saputra";
  const firstName = displayName.split(' ')[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getInitialHistory = (topicId, mode) => {
    const topic = topicSessions.find(t => t.id === topicId);
    const topicName = topic ? topic.name : 'Topik ini';
    
    if (mode === 'guided') {
      return [{
        role: 'assistant',
        content: `Halo! Kita masuk ke mode **Guided Practice** untuk topik **${topicName}**. 📚\n\nDi sini, kita akan membedah konsepnya secara perlahan dan bertahap. Sebelum mulai, apa bagian dari ${topicName} yang ingin kamu kuasai hari ini?`
      }];
    } else if (mode === 'latihan') {
      return [{
        role: 'assistant',
        content: `Halo! Mari mulai **Latihan Soal** untuk topik **${topicName}**! ✏️\n\nAku akan memberikan soal satu per satu untuk menguji pemahamanmu. Ketik "Siap" jika kamu ingin soal pertamanya dimuat!`
      }];
    } else {
      return topic ? topic.history : [];
    }
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  const handleTopicChange = (topicId) => {
    setActiveTopicId(topicId);
    setSidebarOpen(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const reqData = {
        message: userMessage,
        sessionId: sessionId,
        mode: activeMode,
        topic: topicSessions.find(t => t.id === activeTopicId)?.name || 'Trigonometri'
      };

      // Seed initial dummy history if starting a new session
      if (!sessionId) {
        const initialHistory = getInitialHistory(activeTopicId, activeMode);
        reqData.seedHistory = initialHistory;
      }

      const res = await axios.post(`${API_URL}/message`, reqData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
      if (!sessionId) {
          setSessionId(res.data.sessionId);
          localStorage.setItem(`sessionId_${activeTopicId}_${activeMode}`, res.data.sessionId);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Duh, ada gangguan koneksi nih. Coba lagi nanti ya!' }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    const key = `sessionId_${activeTopicId}_${activeMode}`;
    localStorage.removeItem(key);
    setSessionId(null);
    const initialMessages = getInitialHistory(activeTopicId, activeMode);
    setMessages(initialMessages);
  };

  const renderSidebar = (isMobile = false) => {
    const filteredSessions = topicSessions.filter(sess => 
      sess.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-6">
          {isMobile && (
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-2">
              <span className="font-extrabold text-[#1E3A5F] text-lg">Menu Belajar</span>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Sesi Belajar Section */}
          <div>
            <div className="flex items-center gap-2.5 text-[#1E3A5F] font-extrabold mb-3">
              <img src={assetSesiBelajar} alt="Sesi Belajar" className="w-[18px] h-[18px] object-contain" />
              <span className="text-[15px]">Sesi Belajar</span>
            </div>
            <div className="space-y-2.5">
              <button 
                onClick={resetChat}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#00B4B4] text-[#1E3A5F] bg-white hover:bg-[#00B4B4]/5 font-extrabold text-sm transition-all text-left"
              >
                <img src={assetDiskusiBaru} alt="Diskusi Baru" className="w-5 h-5 object-contain" />
                <span>Diskusi Baru</span>
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari Diskusi" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-[#1E3A5F] placeholder-slate-400 font-extrabold text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#00B4B4] focus:border-transparent transition-all"
                />
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              </div>
              
              {/* List of Sessions */}
              <div className="space-y-2">
                {filteredSessions.map((sess) => {
                  const isActive = activeTopicId === sess.id;
                  return (
                    <button
                      key={sess.id}
                      onClick={() => handleTopicChange(sess.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-extrabold text-sm transition-all text-left ${
                        isActive 
                          ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]' 
                          : 'border-slate-200 text-[#1E3A5F] hover:bg-slate-50 bg-white'
                      }`}
                    >
                      <img src={assetChat} alt="Chat" className="w-[18px] h-[18px] object-contain" />
                      <span>{sess.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <a href="#" className="text-[#00B4B4] hover:underline font-extrabold text-xs">Lihat semua sesi</a>
              </div>
            </div>
          </div>

          {/* Mode Belajar Section */}
          <div>
            <div className="flex items-center gap-2.5 text-[#1E3A5F] font-extrabold mb-3">
              <img src={assetModeBelajar} alt="Mode Belajar" className="w-[18px] h-[18px] object-contain" />
              <span className="text-[15px]">Mode Belajar</span>
            </div>
            <div className="space-y-2.5">
              <button
                onClick={() => handleModeChange('socratic')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-extrabold text-sm transition-all text-left ${
                  activeMode === 'socratic' 
                    ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]' 
                    : 'border-slate-200 text-[#1E3A5F] hover:bg-slate-50 bg-white'
                }`}
              >
                <img src={assetSocratic} alt="Socratic" className="w-[18px] h-[18px] object-contain" />
                <span>Socratic</span>
              </button>
              <button
                onClick={() => handleModeChange('guided')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-extrabold text-sm transition-all text-left ${
                  activeMode === 'guided' 
                    ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]' 
                    : 'border-slate-200 text-[#1E3A5F] hover:bg-slate-50 bg-white'
                }`}
              >
                <img src={assetGuided} alt="Guided Practice" className="w-[18px] h-[18px] object-contain" />
                <span>Guided Practice</span>
              </button>
              <button
                onClick={() => handleModeChange('latihan')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-extrabold text-sm transition-all text-left ${
                  activeMode === 'latihan' 
                    ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]' 
                    : 'border-slate-200 text-[#1E3A5F] hover:bg-slate-50 bg-white'
                }`}
              >
                <img src={assetLatihanSoal} alt="Latihan Soal" className="w-[18px] h-[18px] object-contain" />
                <span>Latihan Soal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2.5 pt-6 border-t border-slate-100 mt-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#00B4B4] text-[#1E3A5F] hover:bg-[#00B4B4]/5 font-extrabold text-sm transition-all text-left bg-white">
            <img src={assetPetunjuk} alt="Petunjuk" className="w-[18px] h-[18px] object-contain" />
            <span>Petunjuk</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#00B4B4] text-[#1E3A5F] hover:bg-[#00B4B4]/5 font-extrabold text-sm transition-all text-left bg-white">
            <img src={assetPengaturan} alt="Pengaturan" className="w-[18px] h-[18px] object-contain" />
            <span>Pengaturan</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EEF4FC] flex flex-col h-screen overflow-hidden font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center select-none shadow-sm relative z-40 border-b border-slate-100 shrink-0">
        <div className="flex items-center">
          {/* Menu Hamburger for mobile */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-[#1E3A5F] hover:bg-slate-100 rounded-lg transition-colors mr-2 flex items-center justify-center"
          >
            <Menu size={20} />
          </button>
          <Logo size="normal" />
        </div>

        {/* Navigation Items (Middle) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-[#1E3A5F] transition-colors">Beranda</Link>
          <Link to="/chat" className="text-[#00B4B4] relative pb-1">
            Socratic Chat
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00B4B4] rounded-full"></span>
          </Link>
          <Link to="/library" className="hover:text-[#1E3A5F] transition-colors">Library</Link>
          <Link to="/progress" className="hover:text-[#1E3A5F] transition-colors">Progress</Link>
        </div>

        {/* User Profile Pill (Right) */}
        <div className="relative font-bold">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-3.5 bg-[#1E3A5F] hover:bg-[#152a46] text-white px-5 py-2.5 rounded-full transition-all shadow-sm transform hover:scale-[1.01]"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold hidden sm:inline">{displayName}</span>
            <span className="text-sm font-semibold sm:hidden">{firstName}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {profileDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 p-1.5"
              >
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 rounded-xl transition-colors font-bold text-sm text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* SPLIT LAYOUT AREA */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6 bg-[#EEF4FC]">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="w-80 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-y-auto shrink-0 hidden lg:block h-full">
          {renderSidebar(false)}
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed inset-y-0 left-0 w-72 bg-white z-50 p-6 flex flex-col overflow-y-auto shadow-2xl lg:hidden"
              >
                {renderSidebar(true)}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* RIGHT CHAT AREA */}
        <main className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col min-h-0 relative overflow-hidden">
          
          {/* Active Session Header */}
          <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EAF9F9] flex items-center justify-center text-[#00B4B4] font-black">
                📚
              </div>
              <div className="text-left font-sans">
                <h3 className="text-[15px] font-black text-[#1E3A5F]">
                  {topicSessions.find(t => t.id === activeTopicId)?.name || 'Diskusi Belajar'}
                </h3>
                <p className="text-[11px] text-[#00B4B4] font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4] animate-pulse" />
                  {activeMode === 'socratic' && 'Socratic Tutor Aktif'}
                  {activeMode === 'guided' && 'Guided Practice Aktif'}
                  {activeMode === 'latihan' && 'Mode Latihan Soal Aktif'}
                </p>
              </div>
            </div>

            <button 
              onClick={resetChat}
              className="text-xs font-black text-slate-400 hover:text-slate-600 border border-slate-200 hover:border-slate-300 px-3.5 py-1.5 rounded-xl transition-all font-sans"
            >
              Reset Diskusi
            </button>
          </div>
          
          {/* Message Thread Scrollable List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6 flex flex-col min-h-0">
            <div className="max-w-4xl w-full mx-auto space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => {
                  const isUser = msg.role === 'user';
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[85%] gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
                        
                        {/* Avatar Image */}
                        <img 
                          src={isUser ? iconPerson : iconAIPahamin} 
                          alt={isUser ? "User" : "PahamIn"} 
                          className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm object-cover" 
                        />

                        {/* Speech Bubble Box */}
                        <div className="p-4.5 rounded-2xl bg-white text-[#1E3A5F] shadow-sm border border-slate-100/50 leading-relaxed font-semibold text-left">
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-4 max-w-[85%]">
                    <img 
                      src={iconAIPahamin} 
                      alt="PahamIn" 
                      className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm object-cover" 
                    />
                    <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm flex items-center gap-3">
                      <Loader2 size={16} className="animate-spin text-[#00B4B4]" />
                      <span className="text-sm text-slate-400 italic font-semibold">PahamIn sedang berpikir...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area Form */}
          <div className="p-4 sm:p-6 bg-[#EEF4FC] shrink-0">
            <form 
              onSubmit={handleSend}
              className="max-w-4xl mx-auto relative flex items-center"
            >
              <div className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center px-4 py-3 gap-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />

                <div className="relative flex items-center justify-center shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlusOptions(!showPlusOptions);
                    }}
                    className={`p-1.5 rounded-xl transition-all hover:bg-slate-50 ${
                      showPlusOptions ? 'bg-[#EAF9F9] text-[#00B4B4]' : 'text-slate-400'
                    }`}
                  >
                    <Plus 
                      size={20} 
                      className={`transition-transform duration-200 ${showPlusOptions ? 'rotate-45 text-[#00B4B4]' : 'text-[#00B4B4]'}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {showPlusOptions && (
                      <>
                        <div 
                          className="fixed inset-0 z-20" 
                          onClick={() => setShowPlusOptions(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-12 left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 text-[#1E3A5F] text-left font-bold text-sm flex flex-col gap-1"
                        >
                          <button
                            type="button"
                            onClick={handleFileUploadClick}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <UploadCloud size={16} className="text-[#00B4B4]" />
                            <span>Upload Dokumen</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setShowPlusOptions(false);
                              navigate('/library');
                            }}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <FolderOpen size={16} className="text-[#00B4B4]" />
                            <span>Pilih dari Library</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setShowPlusOptions(false);
                              setShowThinkingTrace(true);
                            }}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <Brain size={16} className="text-[#00B4B4]" />
                            <span>Lihat Thinking Trace</span>
                          </button>

                          <div className="h-px bg-slate-100 my-1" />

                          <button
                            type="button"
                            onClick={handleOptionLatihanSoal}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <ClipboardList size={16} className="text-[#00B4B4]" />
                            <span>Buat Latihan Soal</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleOptionRingkasan}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <FileText size={16} className="text-[#00B4B4]" />
                            <span>Buat Ringkasan</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                
                <input 
                  type="text"
                  ref={chatInputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu pada Pahamin..."
                  className="flex-1 bg-transparent text-[#1E3A5F] placeholder-slate-400 focus:outline-none font-semibold text-sm"
                  disabled={loading}
                />
                
                <button 
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2.5 bg-[#00B4B4] text-white rounded-xl hover:bg-[#009b9b] transition-all disabled:opacity-50 disabled:hover:bg-[#00B4B4] flex items-center justify-center flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
            <p className="text-center text-[10px] text-slate-400 font-bold mt-3">
              AI Pahamin dapat melakukan kesalahan. Tetaplah kritis dan simpulkan pemahamanmu sendiri.
            </p>
          </div>

        </main>
      </div>
      <AnimatePresence>
        {showThinkingTrace && renderThinkingTraceModal()}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
