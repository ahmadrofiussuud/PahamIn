import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User, BookOpen, Clock, Target, CheckSquare } from 'lucide-react';
import Logo from '../components/Logo';

// Asset Imports
import imgStar from '../assets/star.png';
import imgFire from '../assets/fire flame.png';
import imgBook from '../assets/book.png';
import imgProgress from '../assets/progress.png';
import imgSaran1 from '../assets/saran materi 1.png';
import imgSaran2 from '../assets/saran materi 2.png';
import imgUploadMateri from '../assets/upload materi.png';
import imgFokus from '../assets/fokus.png';
import imgRajin from '../assets/rajin.png';
import imgExplorer from '../assets/eksplorer.png';

const HourglassIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2H19M5 22H19M17 2V7.24C17 8.56 16.2 9.76 14.94 10.38L12.94 11.38C12.35 11.67 11.65 11.67 11.06 11.38L9.06 10.38C7.8 9.76 7 8.56 7 7.24V2M17 22V16.76C17 15.44 16.2 14.24 14.94 13.62L12.94 12.62C12.35 12.33 11.65 12.33 11.06 12.62L9.06 13.62C7.8 14.24 7 15.44 7 16.76V22" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 17C10 18.5 14 18.5 15 17" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M10 7C11 5.5 13 5.5 14 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="14.5" r="1.5" fill="#EC4899" />
  </svg>
);

const CrosshairIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="2.5"/>
    <circle cx="12" cy="12" r="5" stroke="#3B82F6" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="1.5" fill="#EF4444"/>
    <line x1="12" y1="2" x2="12" y2="22" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2"/>
  </svg>
);

const ProgressPage = () => {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('section') === 'rekomendasi') {
      const timer = setTimeout(() => {
        const element = document.getElementById('rekomendasi-belajar');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Chart Data (Minutes studied per week)
  const actualData = [68, 155, 68, 68, 102, 110]; // Matches the navy line
  const goalData = [26, 60, 68, 86, 60, 85];      // Matches the teal line

  // Helper to generate a smooth Bezier SVG path from numeric data points
  const generateSmoothPath = (data) => {
    if (!data || data.length === 0) return '';
    
    // Map values to 500x180 canvas with margin-left: 50, width: 420, height: 140
    const points = data.map((val, idx) => {
      const x = 50 + (idx / (data.length - 1)) * 420; // x range: 50 to 470
      const y = 160 - (val / 240) * 140;            // y range: 20 to 160 (for 0 to 240 mins)
      return { x, y };
    });

    let pathStr = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      
      // Horizontal control points
      const cp1x = p0.x + (p1.x - p0.x) / 3;
      const cp1y = p0.y;
      const cp2x = p0.x + 2 * (p1.x - p0.x) / 3;
      const cp2y = p1.y;
      
      pathStr += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return pathStr;
  };

  // Extract user info
  const displayName = user?.name || "Budi Saputra";
  const firstName = displayName.split(' ')[0];

  return (
    <div className="min-h-screen bg-[#EEF4FC] overflow-x-hidden font-sans pb-16">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center select-none shadow-sm relative z-40 border-b border-slate-100">
        <Logo size="normal" />

        {/* Navigation Items (Middle) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-[#1E3A5F] transition-colors">Beranda</Link>
          <Link to="/chat" className="hover:text-[#1E3A5F] transition-colors">Socratic Chat</Link>
          <Link to="/library" className="hover:text-[#1E3A5F] transition-colors">Library</Link>
          <Link to="/progress" className="text-[#00B4B4] relative pb-1">
            Progress
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00B4B4] rounded-full"></span>
          </Link>
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

      {/* CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Title Section */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-extrabold text-[#1E3A5F] tracking-tight">
            Progress <span className="text-[#00B4B4]">Belajar</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold mt-1">
            Pantau perkembangan belajarmu dan capai targetmu secara konsisten.
          </p>
        </div>

        {/* 4 Stats Cards Grid Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Stat 1: Total XP */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <img src={imgStar} alt="Star" className="w-[52px] h-[52px] object-contain shrink-0" />
            <div className="text-left">
              <span className="text-xs text-slate-400 font-bold block">Total XP</span>
              <span className="text-2xl font-black text-[#1E3A5F] leading-tight block">1.250</span>
              <span className="text-[11px] text-[#00B4B4] font-extrabold mt-0.5 block">↑ 120 XP dari minggu lalu</span>
            </div>
          </div>

          {/* Stat 2: Streak */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <img src={imgFire} alt="Flame" className="w-[52px] h-[52px] object-contain shrink-0" />
            <div className="text-left">
              <span className="text-xs text-slate-400 font-bold block">Streak</span>
              <span className="text-2xl font-black text-[#1E3A5F] leading-tight block">7 Hari</span>
              <span className="text-[11px] text-[#00B4B4] font-extrabold mt-0.5 block">Terbaik!</span>
            </div>
          </div>

          {/* Stat 3: Materi dipelajari */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <img src={imgBook} alt="Book" className="w-[52px] h-[52px] object-contain shrink-0" />
            <div className="text-left">
              <span className="text-xs text-slate-400 font-bold block">Materi dipelajari</span>
              <span className="text-2xl font-black text-[#1E3A5F] leading-tight block">18 Topik</span>
              <span className="text-[11px] text-[#00B4B4] font-extrabold mt-0.5 block">↑ 5 topik dari minggu lalu</span>
            </div>
          </div>

          {/* Stat 4: Waktu belajar */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <img src={imgProgress} alt="Clock" className="w-[52px] h-[52px] object-contain shrink-0" />
            <div className="text-left">
              <span className="text-xs text-slate-400 font-bold block">Waktu belajar</span>
              <span className="text-2xl font-black text-[#1E3A5F] leading-tight block">39j 45m</span>
              <span className="text-[11px] text-[#00B4B4] font-extrabold mt-0.5 block">↑ 8j 15m dari minggu lalu</span>
            </div>
          </div>

        </section>

        {/* TWO-COLUMN DETAIL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (Progress 30 hari & Rekomendasi belajar) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Card: Progress 30 hari */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6 sm:p-8 text-left">
              <h3 className="text-lg font-black text-[#1E3A5F] mb-6">Progress 30 hari</h3>
              
              {/* Line Chart Area (SVG) */}
              <div className="w-full h-56 relative mb-6">
                <span className="absolute left-0 top-0 text-[10px] text-slate-400 font-bold">Menit</span>
                
                {/* SVG Canvas */}
                <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="40" y1="55" x2="480" y2="55" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="40" y1="90" x2="480" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="40" y1="125" x2="480" y2="125" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="40" y1="160" x2="480" y2="160" stroke="#F1F5F9" strokeWidth="1" />
                  
                  {/* Y-Axis Labels */}
                  <text x="15" y="24" fill="#94A3B8" fontSize="10" fontWeight="bold">240</text>
                  <text x="15" y="59" fill="#94A3B8" fontSize="10" fontWeight="bold">180</text>
                  <text x="15" y="94" fill="#94A3B8" fontSize="10" fontWeight="bold">120</text>
                  <text x="20" y="129" fill="#94A3B8" fontSize="10" fontWeight="bold">60</text>
                  <text x="25" y="164" fill="#94A3B8" fontSize="10" fontWeight="bold">0</text>

                  {/* Dark Navy Path (Actual Minutes) */}
                  <path
                    d={generateSmoothPath(actualData)}
                    fill="none"
                    stroke="#1E3A5F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Teal Path (Goal/Comparison) */}
                  <path
                    d={generateSmoothPath(goalData)}
                    fill="none"
                    stroke="#00B4B4"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between items-center px-8 text-[11px] text-slate-400 font-extrabold mb-8 border-b border-slate-100 pb-6">
                <span>27 Apr</span>
                <span>4 Mei</span>
                <span>11 Mei</span>
                <span>18 Mei</span>
                <span>25 Mei</span>
                <span>31 Mei</span>
              </div>

              {/* Stat Grid Underneath Chart */}
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="border-r border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold block">Rata-rata per hari</span>
                  <span className="text-[17px] font-black text-[#00B4B4] mt-1 block">133 menit</span>
                </div>
                <div className="border-r border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold block">Total waktu</span>
                  <span className="text-[17px] font-black text-[#1E3A5F] mt-1 block">39j 45m</span>
                </div>
                <div className="border-r border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold block">Hari aktif</span>
                  <span className="text-[17px] font-black text-[#1E3A5F] mt-1 block">22 hari</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Peningkatan</span>
                  <span className="text-[17px] font-black text-[#00B4B4] mt-1 block">28%</span>
                </div>
              </div>

            </div>

            {/* Card: Rekomendasi belajar */}
            <div id="rekomendasi-belajar" className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-[#1E3A5F]">Rekomendasi belajar</h3>
                <a href="#" className="text-xs font-extrabold text-[#3B82F6] hover:underline">Lihat semua rekomendasi</a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Recommendation 1 */}
                <div className="border border-slate-200 bg-white rounded-[20px] p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <img src={imgSaran1} alt="Genetika Dasar" className="w-[64px] h-[64px] object-contain shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[15px] font-black text-[#1E3A5F] leading-tight">Genetika Dasar</h4>
                    <p className="text-[11px] text-slate-500 font-bold mt-1 leading-relaxed">
                      Pahami konsep dasar genetika dan pewarisan sifat.
                    </p>
                  </div>
                </div>

                {/* Recommendation 2 */}
                <div className="border border-slate-200 bg-white rounded-[20px] p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <img src={imgSaran2} alt="Fungsi Kuadrat" className="w-[64px] h-[64px] object-contain shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[15px] font-black text-[#1E3A5F] leading-tight">Fungsi Kuadrat</h4>
                    <p className="text-[11px] text-slate-500 font-bold mt-1 leading-relaxed">
                      Belajar grafik, akar, dan penerapan fungsi kuadrat.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (Target mingguan, Ringkasan kinerja, & Pencapaian) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Card: Target mingguan & Ringkasan kinerja (Unified) */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6 sm:p-8 text-left space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#1E3A5F] mb-6">Target mingguan</h3>
                
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  {/* Circular Gauge Ring */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="#F1F5F9"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="#00B4B4"
                          strokeWidth="10"
                          fill="transparent"
                          strokeDasharray="238.76"
                          strokeDashoffset={238.76 * (1 - 0.75)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-black text-[#00B4B4]">75%</span>
                    </div>
                    <span className="text-[11px] text-[#1E3A5F] font-black mt-2">Target tercapai</span>
                    <span className="text-xs text-slate-400 font-bold">3 dari 4</span>
                  </div>

                  {/* Progress bars list */}
                  <div className="flex-1 w-full space-y-4">
                    {/* Task 1 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-[#1E3A5F]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-xs font-extrabold text-[#1E3A5F] mb-1">
                          <span>Pelajari 20 topik</span>
                          <span className="text-slate-400">15/20</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00B4B4] rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Task 2 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-[#1E3A5F]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-xs font-extrabold text-[#1E3A5F] mb-1">
                          <span>Belajar 8 jam</span>
                          <span className="text-[#00B4B4]">8/8</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00B4B4] rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Task 3 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <Target size={16} className="text-[#1E3A5F]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-xs font-extrabold text-[#1E3A5F] mb-1">
                          <span>Kerjakan 40 kuis</span>
                          <span className="text-slate-400">32/40</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00B4B4] rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Task 4 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <CheckSquare size={16} className="text-[#1E3A5F]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-xs font-extrabold text-[#1E3A5F] mb-1">
                          <span>Selesaikan 2 latihan</span>
                          <span className="text-[#00B4B4]">2/2</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00B4B4] rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-100" />

              {/* Ringkasan Kinerja Row */}
              <div>
                <h3 className="text-lg font-black text-[#1E3A5F] mb-6">Ringkasan kinerja</h3>
                
                <div className="flex items-center justify-between border-slate-100">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3.5 flex-1 justify-start">
                    <img src={imgFokus} alt="Target Selesai" className="w-10 h-10 object-contain shrink-0" />
                    <div className="text-left">
                      <span className="text-xs text-slate-400 font-bold block">Target selesai</span>
                      <span className="text-sm font-black text-[#1E3A5F] mt-0.5 block">3 dari 4</span>
                      <span className="text-[10px] text-[#00B4B4] font-extrabold block">75%</span>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px h-10 bg-slate-100 mx-2" />

                  {/* Item 2 */}
                  <div className="flex items-center gap-3.5 flex-1 justify-center">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                      <HourglassIcon />
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-slate-400 font-bold block">Waktu tersisa</span>
                      <span className="text-sm font-black text-[#1E3A5F] mt-0.5 block">1 hari</span>
                      <span className="text-[10px] text-slate-400 font-semibold block">Hingga akhir minggu</span>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px h-10 bg-slate-100 mx-2" />

                  {/* Item 3 */}
                  <div className="flex items-center gap-3.5 flex-1 justify-end">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                      <CrosshairIcon />
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-slate-400 font-bold block">Fokus minggu ini</span>
                      <span className="text-[13px] font-black text-[#1E3A5F] mt-0.5 block max-w-[120px] truncate leading-tight">
                        Kimia & Fisika
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold block">Pendalaman konsep</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Pencapaian & insight */}
            <div className="bg-white rounded-[24px] shadow-sm border-2 border-[#0084FF] p-6 sm:p-8 text-left">
              <h3 className="text-lg font-black text-[#1E3A5F] mb-6">Pencapaian & insight</h3>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-stretch">
                {/* Left Column (Pencapaian) */}
                <div className="flex-1 flex flex-col justify-between pr-0 md:pr-6">
                  <div className="flex items-center gap-4">
                    <img src={imgRajin} alt="Rajin" className="w-[60px] h-[60px] object-contain shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-base font-black text-[#1E3A5F]">Rajin</h4>
                      <p className="text-sm text-slate-500 font-bold mt-0.5 leading-snug">Belajar 5 hari berturut-turut.</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <a href="#" className="text-xs font-black text-[#0084FF] hover:underline">Lihat semua pencapaian</a>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px bg-slate-200 self-stretch my-1" />

                {/* Right Column (Insight) */}
                <div className="flex-1 flex flex-col justify-between pl-0 md:pl-6 pt-6 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-4">
                    <img src={imgExplorer} alt="Explorer" className="w-[60px] h-[60px] object-contain shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-base font-black text-[#1E3A5F]">Tingkatkan di Fisika</h4>
                      <p className="text-sm text-slate-500 font-bold mt-0.5 leading-snug">Coba pelajari lebih banyak topik.</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <a href="#" className="text-xs font-black text-[#0084FF] hover:underline">Lihat semua insight</a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default ProgressPage;
