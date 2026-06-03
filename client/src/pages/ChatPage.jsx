import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Brain, User, PlusCircle, Loader2, Sparkles, ChevronDown, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(localStorage.getItem('currentSessionId'));
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/chat` 
    : 'http://localhost:5000/api/chat';
  const displayName = user?.name || "Budi Saputra";
  const firstName = displayName.split(' ')[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      loadHistory();
    } else {
        // Initial welcome message for new session
        setMessages([{ 
            role: 'assistant', 
            content: 'Halo! Aku PahamIn, partner berfikirmu. Topik apa yang ingin kita bedah secara mendalam hari ini? Sebelumnya, ceritakan sedikit dong apa yang sudah kamu ketahui tentang topik itu!' 
        }]);
    }
  }, [sessionId]);

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/history/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load history");
    }
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
      const res = await axios.post(`${API_URL}/message`, {
        message: userMessage,
        sessionId: sessionId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
      if (!sessionId) {
          setSessionId(res.data.sessionId);
          localStorage.setItem('currentSessionId', res.data.sessionId);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Duh, ada gangguan koneksi nih. Coba lagi nanti ya!' }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/reset`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessionId(res.data.sessionId);
      localStorage.setItem('currentSessionId', res.data.sessionId);
      setMessages([{ 
        role: 'assistant', 
        content: 'Sesi baru dimulai! Yuk, pilih topik baru yang menantang untuk kita diskusikan.' 
      }]);
    } catch (err) {
      alert("Gagal mereset chat");
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4FC] flex flex-col h-screen overflow-hidden font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center select-none shadow-sm relative z-40 border-b border-slate-100 shrink-0">
        <Logo size="normal" />

        {/* Navigation Items (Middle) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-[#1E3A5F] transition-colors">Beranda</Link>
          <Link to="/chat" className="text-[#1E3A5F] relative pb-1">
            Socratic Chat
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#1E3A5F] rounded-full"></span>
          </Link>
          <a href="#" className="hover:text-[#1E3A5F] transition-colors">Library</a>
          <a href="#" className="hover:text-[#1E3A5F] transition-colors">Progress</a>
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

      {/* CHAT AREA CONTAINER */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        
        {/* Chat Session Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center shadow-sm z-10 shrink-0 chat-session-header">
          <div className="flex items-center gap-3">
            <div className="bg-[#00B4B4]/10 p-2.5 rounded-xl text-[#00B4B4]">
              <Sparkles size={20} />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-extrabold text-[#1E3A5F]">Diskusi Socratic</h1>
              <p className="text-xs text-slate-400 font-bold">PahamIn - Critical Thinking Partner</p>
            </div>
          </div>
          <button 
            onClick={resetChat}
            className="border-2 border-[#00B4B4] text-[#00B4B4] hover:bg-[#00B4B4]/5 py-2.5 px-5 flex items-center gap-2 text-sm font-bold rounded-xl transition-all shadow-sm transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <PlusCircle size={18} /> Mulai Diskusi Baru
          </button>
        </header>

        {/* Message Thread Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 flex flex-col bg-[#EEF4FC] min-h-0">
          <div className="max-w-4xl w-full mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    
                    {/* Avatar Circle */}
                    <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#1E3A5F] text-white' : 'bg-[#00B4B4] text-white'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Brain size={16} />}
                    </div>

                    {/* Speech Bubble Box */}
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1E3A5F] text-white rounded-tr-none font-medium' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none font-semibold leading-relaxed'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-left">{msg.content}</p>
                      <span className={`text-[9px] font-bold mt-2.5 block opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.role === 'user' ? 'Kamu' : 'PahamIn'}
                      </span>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3.5 max-w-[80%]">
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-[#00B4B4] text-white shadow-sm">
                    <Brain size={16} />
                  </div>
                  <div className="bg-white border border-slate-100 p-4.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
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
        <div className="p-6 bg-white border-t border-slate-100 shrink-0">
          <form 
            onSubmit={handleSend}
            className="max-w-4xl mx-auto relative flex items-center"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu atau jawab pertanyaan PahamIn..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl py-4.5 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-[#00B4B4]/40 focus:border-transparent transition-all text-sm font-semibold text-[#1E3A5F] placeholder-slate-400"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-3.5 p-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#00B4B4] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-[#1E3A5F] flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-2">
            AI dapat melakukan kesalahan. Tetaplah kritis dan simpulkan pemahamanmu sendiri.
          </p>
        </div>

      </main>
    </div>
  );
};

export default ChatPage;
