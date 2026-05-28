import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Logo from '../components/Logo';
import heroImg from '../assets/hero.png';
import starImg from '../assets/Vector.png';
import progressImg from '../assets/Vector-1.png';
import achievementImg from '../assets/icon quiz hari ini.png';
import chatImg from '../assets/icon socratic chat.png';
import progressTali from '../assets/progress tali.png';
import socraticTali from '../assets/socratic tali.png';
import ringkasanTali from '../assets/ringkasan tali.png';
import achievementTali from '../assets/achievment tali.png';

const LandingPage = () => {
  // Star component using the exact 22x33px figma asset provided by UI/UX
  const StarIcon = ({ className, style }) => (
    <img 
      src={starImg} 
      alt="star" 
      className={`w-[22px] h-[33px] object-contain shrink-0 select-none ${className}`} 
      style={style}
    />
  );

  // Custom Inline SVG for Ringkasan Materi Document Icon (crisp vector, matches Figma exactly)
  const DocumentIcon = () => (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11 shrink-0 select-none">
      <rect width="40" height="40" rx="10" fill="#00B4B4" />
      <path d="M14 11H22L27 16V29C27 30.1 26.1 31 25 31H14C12.9 31 12 30.1 12 29V13C12 11.9 12.9 11 14 11Z" fill="white" />
      <path d="M22 11V16H27" fill="#E0F2F1" />
      <path d="M15 20H24" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 24H24" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f6fc] to-[#e6eef8] overflow-x-hidden font-sans relative">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center select-none shadow-sm">
        <Logo size="normal" />

        {/* Navigation Items (Middle) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/" className="text-[#1E3A5F] relative pb-1 group">
            Beranda
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full"></span>
          </Link>
          <Link to="/fitur" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Fitur
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link to="/cara-kerja" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Cara kerja
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link to="/tentang" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Tentang
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>

        {/* Action Buttons (Right) */}
        <div className="flex items-center gap-4 font-bold text-sm">
          <Link 
            to="/login" 
            className="bg-[#1E3A5F] hover:bg-[#152a46] text-white px-6 py-2.5 rounded-xl transition-all shadow-sm transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Masuk
          </Link>
          <Link 
            to="/register" 
            className="bg-white border-2 border-[#00B4B4] text-[#00B4B4] hover:bg-[#00B4B4] hover:text-white px-5 py-2 rounded-xl transition-all shadow-sm transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Registrasi
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)]">
        
        {/* HERO LEFT COLUMN */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Catchy Headline */}
            <h1 className="text-5xl lg:text-[4.75rem] font-black text-[#1E3A5F] leading-[1.05] tracking-tighter">
              Belajar lebih <br />
              cerdas dengan <br />
              <span className="text-[#00B4B4]">PahamIn</span>
            </h1>

            {/* Description */}
            <p className="text-slate-500 text-lg lg:text-xl font-medium mt-6 leading-relaxed max-w-xl">
              PahamIn membantu kamu memahami materi lebih dalam dengan bimbingan Socratic, ringkasan dokumen, dan penalaran langkah demi langkah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 font-bold">
              <Link 
                to="/register" 
                className="bg-[#1E3A5F] hover:bg-[#152a46] text-white px-8 py-4 rounded-xl text-center shadow-lg shadow-navy/10 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Mulai belajar
              </Link>
              <Link 
                to="/cara-kerja" 
                className="bg-white border-2 border-[#00B4B4] text-[#00B4B4] hover:bg-[#00B4B4]/5 px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Play size={16} fill="currentColor" className="text-[#00B4B4]" />
                <span>Lihat cara kerja</span>
              </Link>
            </div>

            {/* Facepile / Social Proof Section */}
            <div className="flex items-center gap-3.5 mt-12 select-none">
              <div className="flex -space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120" 
                  alt="Siswa PahamIn 1" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shrink-0 select-none shadow-sm"
                />
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120" 
                  alt="Siswa PahamIn 2" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shrink-0 select-none shadow-sm"
                />
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" 
                  alt="Siswa PahamIn 3" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shrink-0 select-none shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-[#1E3A5F] text-sm">+5rb</span>
                </div>
                <span className="text-slate-400 font-bold text-xs mt-1.5">
                  Dipercaya oleh ribuan siswa SMA di Indonesia
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HERO RIGHT COLUMN (Matches Figma exactly with Large Student Image and Floating Badges) */}
        <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0 select-none overflow-visible">
          
          <div className="relative w-[620px] h-[580px] flex items-center justify-center shrink-0 scale-[0.75] sm:scale-[0.8] md:scale-[0.85] lg:scale-90 xl:scale-100 origin-top-right">
            
            {/* ============================================================
                TALI / GARIS PENGHUBUNG — z-5 (DI BELAKANG student z-10)
                Logika:
                  - z-5 : tali (paling belakang)
                  - z-10: student (menutupi ujung DALAM tali → efek "keluar dari siswa")
                  - z-20: badge  (menutupi ujung LUAR tali  → efek "masuk ke badge")
                ============================================================ */}

            {/* ── TALI PROGRESS BELAJAR ──
                Badge: top=52px, left≈365px (50%+55px), right≈540px, h≈68px
                Bentuk L: right edge (vertikal x≈455) + bottom edge (horizontal y≈240)
                Posisi: top=52 (badge menutupi atas), left=360, w=95, h=188
                Efek: garis vertikal di x=455 terlihat dari y=120 (bawah badge) ke y=240 (bahu siswa),
                      garis horizontal di y=240 terlihat dari x=415-455 (kanan tubuh siswa, transparan) */}
            <img
              src={progressTali}
              alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none"
              style={{ zIndex: 5, top: '52px', left: '360px', width: '95px', height: '188px', objectFit: 'fill' }}
            />

            {/* ── TALI SOCRATIC CHAT ──
                Badge: top=168px, left≈80px (50%-230px), right≈245px
                Bentuk: garis vertikal di x≈158-186
                Posisi: top=168 (badge menutupi atas), left=145, w=30, h=195
                Efek: garis vertikal terlihat dari y=236 (bawah badge) ke y=363 (siswa menutupi bawah) */}
            <img
              src={socraticTali}
              alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none"
              style={{ zIndex: 5, top: '168px', left: '145px', width: '30px', height: '195px', objectFit: 'fill' }}
            />

            {/* ── TALI RINGKASAN MATERI ──
                Badge: top=390px, left≈32px (50%-278px), right≈205px
                Bentuk: garis horizontal di y≈400-420
                Posisi: top=390 (sedikit ke dalam badge), left=200, w=115, h=30
                Efek: garis horizontal terlihat dari x=205 (kanan badge) ke x=270 (siswa menutupi kanan)
                      Badge menutupi x=32-205, siswa menutupi x=270+ */}
            <img
              src={ringkasanTali}
              alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none"
              style={{ zIndex: 5, top: '400px', left: '195px', width: '95px', height: '24px', objectFit: 'fill' }}
            />

            {/* ── TALI ACHIEVEMENT ──
                Badge: top=300px, left≈428px (50%+118px), right≈595px
                Bentuk L: right edge (vertikal x≈595) + bottom edge (horizontal y≈440)
                Posisi: top=300 (badge menutupi atas), left=480, w=115, h=140
                Efek: garis vertikal di x=595 terlihat dari y=368 (bawah badge) ke y=440,
                      garis horizontal di y=440 terlihat dari x=480-595 */}
            <img
              src={achievementTali}
              alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none"
              style={{ zIndex: 5, top: '300px', left: '480px', width: '115px', height: '140px', objectFit: 'fill' }}
            />

            {/* Bintang dekoratif — z-6 (di atas tali, di bawah student) */}
            {/* Star di sudut progress (kanan atas, antara badge dan bahu siswa) */}
            <img src={starImg} alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none w-[20px] h-[30px] opacity-90 animate-pulse"
              style={{ zIndex: 6, top: '230px', left: '448px', animationDelay: '0.2s' }} />
            {/* Star di kiri bawah socratic (persimpangan ke ringkasan) */}
            <img src={starImg} alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none w-[20px] h-[30px] opacity-90 animate-pulse"
              style={{ zIndex: 6, top: '353px', left: '137px', animationDelay: '0.7s' }} />
            {/* Star di sudut achievement (kanan bawah) */}
            <img src={starImg} alt="" aria-hidden="true"
              className="absolute pointer-events-none select-none w-[20px] h-[30px] opacity-90 animate-pulse"
              style={{ zIndex: 6, top: '433px', left: '472px', animationDelay: '1.2s' }} />

            {/* Character Student Illustration - larger to match Figma */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={heroImg} 
              alt="PahamIn Hero Student" 
              className="w-[480px] lg:w-[520px] object-contain drop-shadow-[0_25px_60px_rgba(30,58,95,0.08)] z-10 relative top-[30px] pointer-events-none"
            />

            {/* Floating Badge 1: Progress belajar — top-right (kanan atas, di atas kepala siswa) */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute top-[52px] left-1/2 translate-x-[55px] bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,34,61,0.10)] border border-slate-100 p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <img src={progressImg} alt="Progress Icon" className="w-10 h-10 object-contain shrink-0" />
              <span className="font-bold text-[#1E3A5F] text-[13px] pr-1">Progress belajar</span>
            </motion.div>

            {/* Floating Badge 2: Socratic Chat — left-center (kiri, setinggi bahu siswa) */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-[168px] left-1/2 -translate-x-[230px] bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,34,61,0.10)] border border-slate-100 p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <img src={chatImg} alt="Chat Icon" className="w-10 h-10 object-contain shrink-0" />
              <span className="font-bold text-[#1E3A5F] text-[13px] pr-1">Socratic Chat</span>
            </motion.div>

            {/* Floating Badge 3: Ringkasan Materi — bottom-left (kiri bawah, di bawah laptop) */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.6 }}
              className="absolute top-[390px] left-1/2 -translate-x-[278px] bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,34,61,0.10)] border border-slate-100 p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <DocumentIcon />
              <span className="font-bold text-[#1E3A5F] text-[13px] pr-1">Ringkasan Materi</span>
            </motion.div>

            {/* Floating Badge 4: Achievement — right-center (kanan, setinggi siku siswa) */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.9 }}
              className="absolute top-[300px] left-1/2 translate-x-[118px] bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,34,61,0.10)] border border-slate-100 p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <img src={achievementImg} alt="Achievement Icon" className="w-10 h-10 object-contain shrink-0" />
              <span className="font-bold text-[#1E3A5F] text-[13px] pr-1">Achievement</span>
            </motion.div>
          </div>

        </div>

      </main>

      {/* --- FITUR SECTION (NEW - Figma Exact Layout) --- */}
      <section id="fitur" className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24 select-none">
        <h2 className="text-4xl font-black text-[#1E3A5F] text-center mb-10 tracking-tight">Fitur</h2>
        
        {/* Light Blue Container with Rounded Corners - Matching Box Border Color! */}
        <div className="border border-[#00B4B4] bg-[#EEF4FC]/40 p-8 lg:p-10 rounded-[32px] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Socratic Chat */}
            <div className="bg-white border border-[#D4EDEC] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(15,34,61,0.03)] flex flex-col hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(15,34,61,0.06)] transition-all duration-300">
              <h3 className="font-extrabold text-[#1E3A5F] text-lg text-center mb-5">Socratic Chat</h3>
              <div className="flex items-start gap-4 text-left">
                <img src={chatImg} alt="Socratic Chat" className="w-12 h-12 object-contain shrink-0" />
                <p className="text-slate-500 font-semibold text-[11px] leading-relaxed">
                  AI membimbingmu dengan pertanyaan yang menuntun pemahaman, bukan sekadar memberi jawaban.
                </p>
              </div>
            </div>

            {/* Card 2: Upload Dokumen */}
            <div className="bg-white border border-[#D4EDEC] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(15,34,61,0.03)] flex flex-col hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(15,34,61,0.06)] transition-all duration-300">
              <h3 className="font-extrabold text-[#1E3A5F] text-lg text-center mb-5">Upload Dokumen</h3>
              <div className="flex items-start gap-4 text-left">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                  <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 28C8.686 28 6 25.314 6 22C6 19.18 7.93 16.81 10.6 16.14C11.3 11.56 15.25 8 20 8C25.52 8 30 12.48 30 18C30 18.68 29.93 19.35 29.8 20C32.32 20.73 34 23.11 34 26C34 29.31 31.31 32 28 32H12" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 28V18" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M16 22L20 18L24 22" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-slate-500 font-semibold text-[11px] leading-relaxed">
                  Unggah materi dalam PDF atau gambar, AI akan meringkas dan menjelaskan intinya untukmu
                </p>
              </div>
            </div>

            {/* Card 3: Thinking Trace */}
            <div className="bg-white border border-[#D4EDEC] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(15,34,61,0.03)] flex flex-col hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(15,34,61,0.06)] transition-all duration-300">
              <h3 className="font-extrabold text-[#1E3A5F] text-lg text-center mb-5">Thinking Trace</h3>
              <div className="flex items-start gap-4 text-left">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                  <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="20" r="4" fill="none" stroke="#00B4B4" strokeWidth="2.5"/>
                    <circle cx="26" cy="10" r="4" fill="none" stroke="#00B4B4" strokeWidth="2.5"/>
                    <circle cx="26" cy="30" r="4" fill="none" stroke="#00B4B4" strokeWidth="2.5"/>
                    <path d="M13.5 18.5L22.5 11.5" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M13.5 21.5L22.5 28.5" stroke="#00B4B4" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-slate-500 font-semibold text-[11px] leading-relaxed">
                  Lihat penalaran langkah demi langkah agar kamu paham bagaimana suatu jawaban ditemukan
                </p>
              </div>
            </div>

            {/* Card 4: Progress */}
            <div className="bg-white border border-[#D4EDEC] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(15,34,61,0.03)] flex flex-col hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(15,34,61,0.06)] transition-all duration-300">
              <h3 className="font-extrabold text-[#1E3A5F] text-lg text-center mb-5">Progress</h3>
              <div className="flex items-start gap-4 text-left">
                <img src={progressImg} alt="Progress" className="w-12 h-12 object-contain shrink-0" />
                <p className="text-slate-500 font-semibold text-[11px] leading-relaxed">
                  Pantau progress belajarmu agar semakin siap menghadapi evaluasi
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CARA KERJA SECTION (NEW - Figma Exact Layout) --- */}
      <section id="cara-kerja" className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24 select-none">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text Column */}
          <div className="lg:w-1/4 flex flex-col text-left">
            <h2 className="text-4xl font-black text-[#1E3A5F] tracking-tight">Cara Kerja</h2>
            <p className="text-slate-400 font-bold text-sm mt-2">Dalam 3 langkah mudah</p>
          </div>

          {/* Right Steps Column inside clean bordered container */}
          <div className="lg:w-3/4 w-full border border-[#00B4B4] rounded-[24px] bg-white p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative shadow-sm">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4 text-left md:w-[28%]">
              <div className="border-2 border-[#00B4B4] bg-[#00B4B4]/5 p-2 rounded-xl text-[#00B4B4] shrink-0 flex items-center justify-center w-12 h-12">
                {/* Custom Inline SVG for Document-Upload */}
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8H24L32 16V32C32 33.1 31.1 34 30 34H12C10.9 34 10 33.1 10 32V10C10 8.9 10.9 8 12 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 8V16H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 27L21 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M17 24L21 20L25 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-[#1E3A5F] text-sm">Upload atau Pilih Topik</h4>
                <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-1">
                  Unggah dokumen atau pilih topik pelajaran yang ingin dipahami
                </p>
              </div>
            </div>

            {/* Dotted connector 1 */}
            <div className="hidden md:block flex-1 border-t-2.5 border-dashed border-[#00B4B4] opacity-80 min-w-[30px]" />

            {/* Step 2 */}
            <div className="flex items-start gap-4 text-left md:w-[28%]">
              <div className="border-2 border-[#00B4B4] bg-[#00B4B4]/5 p-2 rounded-xl text-[#00B4B4] shrink-0 flex items-center justify-center w-12 h-12">
                {/* Custom Inline SVG for Chat-3dots */}
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="8" width="28" height="20" rx="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 28L10 32V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="14" cy="18" r="1.5" fill="currentColor" />
                  <circle cx="20" cy="18" r="1.5" fill="currentColor" />
                  <circle cx="26" cy="18" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-[#1E3A5F] text-sm">Diskusi dengan AI</h4>
                <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-1">
                  AI memberi pertanyaan penuntun dan membimbingmu memahami konsep secara mendalam
                </p>
              </div>
            </div>

            {/* Dotted connector 2 */}
            <div className="hidden md:block flex-1 border-t-2.5 border-dashed border-[#00B4B4] opacity-80 min-w-[30px]" />

            {/* Step 3 */}
            <div className="flex items-start gap-4 text-left md:w-[28%]">
              <div className="border-2 border-[#00B4B4] bg-[#00B4B4]/5 p-2 rounded-xl text-[#00B4B4] shrink-0 flex items-center justify-center w-12 h-12">
                {/* Custom Inline SVG for Bar-Chart */}
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="30" x2="12" y2="18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="20" y1="30" x2="20" y2="10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="28" y1="30" x2="28" y2="22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="8" y1="34" x2="32" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-[#1E3A5F] text-sm">Pahami Materi & Cek Progress</h4>
                <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-1">
                  Dapatkan rangkuman, latihan soal, dan lihat progress belajarmu dari waktu ke waktu
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- KEY POINTS PILL BAR (NEW - Figma Exact Layout) --- */}
      <section className="max-w-7xl mx-auto px-6 mb-24 select-none">
        <div className="bg-[#EEF4FC] rounded-[32px] p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-sm">
          
          {/* Key Point 1 */}
          <div className="flex items-center gap-4 flex-1 text-left">
            <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[#1E3A5F] font-bold text-sm leading-relaxed max-w-sm">
              Kami fokus pada pemahaman konsep, bukan memberi jawaban saja.
            </p>
          </div>

          {/* Divider line 1 */}
          <div className="hidden lg:block w-[1.5px] h-10 bg-slate-200" />

          {/* Key Point 2 */}
          <div className="flex items-center gap-4 flex-1 text-left">
            <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                <line x1="9" y1="18" x2="15" y2="18"/>
                <line x1="10" y1="22" x2="14" y2="22"/>
              </svg>
            </div>
            <p className="text-[#1E3A5F] font-bold text-sm leading-relaxed max-w-sm">
              Pertanyaan Socratic dan penalaran langkah demi langkah melatih cara berpikirmu.
            </p>
          </div>

          {/* Divider line 2 */}
          <div className="hidden lg:block w-[1.5px] h-10 bg-slate-200" />

          {/* Key Point 3 */}
          <div className="flex items-center gap-4 flex-1 text-left">
            <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <p className="text-[#1E3A5F] font-bold text-sm leading-relaxed max-w-sm">
              Bahasa yang mudah dipahami, sesuai dengan kurikulum, dan mendukung belajarmu.
            </p>
          </div>

        </div>
      </section>

      {/* --- FOOTER SECTION (NEW - Figma Exact Layout) --- */}
      <footer className="bg-[#0F223D] text-white pt-16 pb-8 px-6 mt-20 select-none border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 text-left">
          
          {/* Column 1: Logo & Follow us (span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              {/* SVG Icon part of Logo rendered in white */}
              <Logo size="normal" showText={false} />
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">Paham</span>
                <span className="text-[#00B4B4]">In</span>
              </span>
            </div>
            <p className="text-slate-400 font-bold text-xs">
              Belajar lebih cerdas dengan AI PahamIn
            </p>
            
            <span className="text-slate-300 font-bold text-xs mt-8 mb-3 block">Follow us</span>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'facebook', 'instagram'].map((soc, i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors cursor-pointer text-xs font-bold uppercase">
                  {soc[0]}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Navigasi (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Navigasi</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Beranda</Link>
              <Link to="/fitur" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Fitur</Link>
              <Link to="/cara-kerja" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Cara Kerja</Link>
              <Link to="/tentang" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Tentang</Link>
            </div>
          </div>

          {/* Column 3: Fitur (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Fitur</h4>
            <div className="space-y-3">
              <a href="#" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Socratic Chat</a>
              <a href="#" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Upload Dokumen</a>
              <a href="#" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Thinking Trace</a>
              <a href="#" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Quiz & Progress</a>
            </div>
          </div>

          {/* Column 4: Tentang (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Tentang</h4>
            <div className="space-y-3">
              <Link to="/tentang" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Tentang Kami</Link>
              <a href="#" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Kebijakan Privasi</a>
              <a href="#" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>

          {/* Column 5: Hubungi Kami (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Hubungi Kami</h4>
            <div className="space-y-3 text-slate-400 font-semibold text-xs">
              <span className="block">pahamin@gmail.com</span>
              <span className="block">+62 813-5832-8568</span>
              <span className="block leading-relaxed">Malang, Indonesia</span>
            </div>
          </div>

        </div>

        {/* Divider line & Copyright */}
        <div className="max-w-7xl mx-auto border-t border-slate-800/80 my-6"></div>
        <p className="text-slate-500 font-bold text-xs text-center">
          PahamIn All Right Reserved, 2026
        </p>
      </footer>

    </div>
  );
};

export default LandingPage;
