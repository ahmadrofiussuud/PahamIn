import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User } from 'lucide-react';
import Logo from '../components/Logo';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Extract display name or use default Budi Saputra
  const displayName = user?.name || "Budi Saputra";
  const firstName = displayName.split(' ')[0];

  // SVG Graphics for Card 1 (Chat/Discussion/Robot)
  const ChatGraphics = () => (
    <svg className="w-16 h-16 shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="60" height="42" rx="6" fill="#1E3A5F" fillOpacity="0.08" stroke="#1E3A5F" strokeWidth="2.5"/>
      <rect x="25" y="57" width="30" height="8" rx="2" fill="#1E3A5F" fillOpacity="0.08" stroke="#1E3A5F" strokeWidth="2.5"/>
      <path d="M20 65H60" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="28" cy="32" r="5" fill="#00B4B4" />
      <circle cx="52" cy="32" r="5" fill="#00B4B4" />
      <path d="M35 43C35 43 38 46 40 46C42 46 45 43 45 43" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="62" cy="18" r="3.5" fill="#00B4B4" stroke="white" strokeWidth="1.5"/>
      <path d="M60 25C63 28 65 31 65 35" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="3 3"/>
    </svg>
  );

  // SVG Graphics for Card 2 (Upload Document/Folder)
  const UploadGraphics = () => (
    <svg className="w-16 h-16 shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 25C15 21.6863 17.6863 19 21 19H35L42 27H59C62.3137 27 65 29.6863 65 33V59C65 62.3137 62.3137 65 59 65H21C17.6863 65 15 62.3137 15 59V25Z" fill="#00B4B4" fillOpacity="0.08" stroke="#00B4B4" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M40 38V53" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M33 45L40 38L47 45" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="60" cy="20" r="3.5" fill="#1E3A5F" stroke="white" strokeWidth="1.5"/>
    </svg>
  );

  // SVG Graphics for Card 3 (Open Book)
  const BookGraphics = () => (
    <svg className="w-16 h-16 shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 60C30 57 20 60 15 62V22C20 20 30 17 40 22C50 17 60 20 65 22V62C60 60 50 57 40 60Z" fill="#1E3A5F" fillOpacity="0.08" stroke="#1E3A5F" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M40 22V60" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M20 30H32" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 37H32" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 44H32" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M48 30H60" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
      <path d="M48 37H60" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
      <path d="M48 44H60" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#EEF4FC] overflow-x-hidden font-sans pb-16">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center select-none shadow-sm relative z-40 border-b border-slate-100">
        <Logo size="normal" />

        {/* Navigation Items (Middle) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/dashboard" className="text-[#1E3A5F] relative pb-1">
            Beranda
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#1E3A5F] rounded-full"></span>
          </Link>
          <Link to="/chat" className="hover:text-[#1E3A5F] transition-colors">Socratic Chat</Link>
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
            <span className="text-sm font-semibold">{displayName}</span>
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

      {/* DASHBOARD CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Personalized Welcome Header */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1E3A5F] tracking-tight">
            Halo <span className="text-[#00B4B4]">{firstName}!</span>, mau belajar apa hari ini?
          </h1>
        </div>

        {/* 3 Horizontal Cards (Mulai Diskusi, Upload Materi, Lanjutkan Belajar) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Mulai Diskusi */}
          <div className="bg-[#E3EBF7] rounded-[24px] p-8 flex items-center gap-6 border border-[#cfddf0] relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <ChatGraphics />
            <div className="flex flex-col text-left">
              <h3 className="text-xl font-bold text-[#1E3A5F]">Mulai Diskusi</h3>
              <p className="text-slate-500 text-xs font-semibold mt-1.5 leading-relaxed max-w-[200px]">
                Tanyakan apa saja dan pahami konsepnya.
              </p>
              <Link 
                to="/chat" 
                className="mt-4 bg-[#1E3A5F] hover:bg-[#152a46] text-white px-5 py-2.5 rounded-xl text-xs font-bold text-center transition-all inline-block w-fit"
              >
                Mulai chat ➔
              </Link>
            </div>
          </div>

          {/* Card 2: Upload Materi (Teal Background) */}
          <div className="bg-[#D4EDEC] rounded-[24px] p-8 flex items-center gap-6 border border-[#bfdedc] relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <UploadGraphics />
            <div className="flex flex-col text-left">
              <h3 className="text-xl font-bold text-[#1E3A5F]">Upload Materi</h3>
              <p className="text-slate-500 text-xs font-semibold mt-1.5 leading-relaxed max-w-[200px]">
                Unggah dokumen atau gambar untuk dianalisis.
              </p>
              <button 
                className="mt-4 bg-[#00B4B4] hover:bg-[#009c9c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-fit"
              >
                Upload Sekarang ➔
              </button>
            </div>
          </div>

          {/* Card 3: Lanjutkan Belajar */}
          <div className="bg-[#E3EBF7] rounded-[24px] p-8 flex items-center gap-6 border border-[#cfddf0] relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <BookGraphics />
            <div className="flex flex-col text-left">
              <h3 className="text-xl font-bold text-[#1E3A5F]">Lanjutkan belajar</h3>
              <p className="text-slate-500 text-xs font-semibold mt-1.5 leading-relaxed max-w-[200px]">
                Lanjutkan materi yang sudah kamu pelajari.
              </p>
              <button 
                className="mt-4 bg-[#1E3A5F] hover:bg-[#152a46] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-fit"
              >
                Lihat Lanjutan ➔
              </button>
            </div>
          </div>

        </section>

        {/* Bottom Section: Grid of 2 Rounded White Containers */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left panel placeholder */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 min-h-[320px] p-8 flex items-center justify-center select-none">
            <div className="text-center text-slate-400 font-bold">
              <svg className="mx-auto w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Belum ada aktivitas belajar terbaru</span>
            </div>
          </div>

          {/* Right panel placeholder */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 min-h-[320px] p-8 flex items-center justify-center select-none">
            <div className="text-center text-slate-400 font-bold">
              <svg className="mx-auto w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Progress belajar kamu akan muncul di sini</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
