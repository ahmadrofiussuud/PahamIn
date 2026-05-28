import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MessageSquare, Compass, BarChart, Play, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';

const CaraKerjaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f6fc] to-[#e6eef8] font-sans relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <Logo size="normal" />

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Beranda
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link to="/fitur" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Fitur
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link to="/cara-kerja" className="text-[#1E3A5F] relative pb-1">
            Cara kerja
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full"></span>
          </Link>
          <Link to="/tentang" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Tentang
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 font-bold text-sm">
          <Link 
            to="/login" 
            className="bg-[#1E3A5F] hover:bg-[#152a46] text-white px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Masuk
          </Link>
          <Link 
            to="/register" 
            className="bg-white border-2 border-[#00B4B4] text-[#00B4B4] hover:bg-[#00B4B4] hover:text-white px-5 py-2 rounded-xl transition-all shadow-sm"
          >
            Registrasi
          </Link>
        </div>
      </nav>

      {/* HERO HERO SECTION */}
      <header className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 pb-16 text-center select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <span className="bg-[#00B4B4]/10 text-[#00B4B4] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Metode PahamIn
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1E3A5F] leading-tight tracking-tighter max-w-3xl">
            Bagaimana <span className="text-[#00B4B4]">PahamIn</span> Membantu Belajarmu?
          </h1>
          <p className="text-slate-500 font-medium text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
            PahamIn dirancang menggunakan metode Socratic, melatih pikiranmu untuk memahami konsep secara logis dan mendalam daripada sekadar menghafal jawaban.
          </p>
        </motion.div>
      </header>

      {/* STEPS PIPELINE (Interactive Vertical Timeline) */}
      <section className="max-w-5xl mx-auto px-6 pb-24 relative select-none">
        
        {/* Center line connector */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 border-l-2 border-dashed border-[#00B4B4]/30 hidden md:block" />

        <div className="space-y-20 relative">
          
          {/* Step 1: Upload */}
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            <div className="md:w-1/2 flex justify-end text-right order-1 md:order-1">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-md flex flex-col md:items-end items-center text-center md:text-right"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] mb-4 shadow-sm border border-[#00B4B4]/20">
                  <BookOpen size={24} />
                </div>
                <span className="text-[#00B4B4] font-bold text-xs">LANGKAH 01</span>
                <h3 className="text-2xl font-extrabold text-[#1E3A5F] mt-2">Unggah Materi atau Pilih Topik</h3>
                <p className="text-slate-500 font-semibold text-sm mt-3 leading-relaxed">
                  Unggah file PDF catatanmu, jepret foto lembar tugas, atau pilih topik pelajaran langsung dari kurikulum nasional. AI kami akan memproses materi dalam hitungan detik.
                </p>
              </motion.div>
            </div>
            
            {/* Circle timeline index */}
            <div className="w-10 h-10 rounded-full bg-[#00B4B4] text-white font-extrabold flex items-center justify-center border-4 border-white shadow-md z-10 order-2 md:order-2">
              1
            </div>

            {/* Visual Panel Right */}
            <div className="md:w-1/2 order-3 md:order-3">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-xl shadow-navy/5 flex flex-col gap-4 max-w-md"
              >
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#00B4B4] mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  </div>
                  <span className="font-bold text-[#1E3A5F] text-xs">Unggah Dokumen (PDF, PNG)</span>
                  <span className="text-slate-400 font-semibold text-[10px] mt-1">Maksimal 10MB per dokumen</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-[#00B4B4]/10 text-[#00B4B4] font-bold text-[10px] px-2.5 py-1 rounded-md">Biologi</span>
                  <span className="bg-[#00B4B4]/10 text-[#00B4B4] font-bold text-[10px] px-2.5 py-1 rounded-md">Fisika SMA</span>
                  <span className="bg-[#00B4B4]/10 text-[#00B4B4] font-bold text-[10px] px-2.5 py-1 rounded-md">Matematika Wajib</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Step 2: Socratic Dialog */}
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            
            {/* Visual Panel Left */}
            <div className="md:w-1/2 flex justify-end order-3 md:order-1">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-xl shadow-navy/5 flex flex-col gap-4 max-w-md w-full"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-xs font-black shrink-0">AI</div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3.5 text-xs text-[#1E3A5F] font-semibold leading-relaxed">
                    Bagus sekali! Kamu benar bahwa fotosintesis membutuhkan cahaya matahari. Namun, menurutmu bagian sel tumbuhan manakah yang berfungsi menangkap energi cahaya ini?
                  </div>
                </div>
                <div className="flex gap-3 items-start justify-end">
                  <div className="bg-[#00B4B4]/10 rounded-2xl rounded-tr-none p-3.5 text-xs text-[#00B4B4] font-semibold leading-relaxed max-w-[80%] text-left">
                    Hmm... Apakah bagian itu kloroplas?
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#00B4B4] text-white flex items-center justify-center text-xs font-black shrink-0">Kamu</div>
                </div>
              </motion.div>
            </div>
            
            {/* Circle timeline index */}
            <div className="w-10 h-10 rounded-full bg-[#00B4B4] text-white font-extrabold flex items-center justify-center border-4 border-white shadow-md z-10 order-2 md:order-2">
              2
            </div>

            {/* Content Right */}
            <div className="md:w-1/2 order-1 md:order-3">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-md flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] mb-4 shadow-sm border border-[#00B4B4]/20">
                  <MessageSquare size={24} />
                </div>
                <span className="text-[#00B4B4] font-bold text-xs">LANGKAH 02</span>
                <h3 className="text-2xl font-extrabold text-[#1E3A5F] mt-2">Bimbingan Pertanyaan Socratic</h3>
                <p className="text-slate-500 font-semibold text-sm mt-3 leading-relaxed">
                  Bukannya langsung menyuapkan jawaban akhir, PahamIn AI akan menuntunmu melalui seri pertanyaan kritis yang merangsang penalaran logis, membantumu mengoreksi kesalahan berpikir secara mandiri.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Step 3: Thinking Trace */}
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            <div className="md:w-1/2 flex justify-end text-right order-1 md:order-1">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-md flex flex-col md:items-end items-center text-center md:text-right"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] mb-4 shadow-sm border border-[#00B4B4]/20">
                  <Compass size={24} />
                </div>
                <span className="text-[#00B4B4] font-bold text-xs">LANGKAH 03</span>
                <h3 className="text-2xl font-extrabold text-[#1E3A5F] mt-2">Thinking Trace (Penalaran Alur)</h3>
                <p className="text-slate-500 font-semibold text-sm mt-3 leading-relaxed">
                  Gunakan fitur *Thinking Trace* untuk membedah langkah demi langkah analisis logika di balik setiap materi atau pemecahan rumus matematika, sehingga kamu tidak bingung asal-muasal formulasi jawaban.
                </p>
              </motion.div>
            </div>
            
            {/* Circle timeline index */}
            <div className="w-10 h-10 rounded-full bg-[#00B4B4] text-white font-extrabold flex items-center justify-center border-4 border-white shadow-md z-10 order-2 md:order-2">
              3
            </div>

            {/* Visual Panel Right */}
            <div className="md:w-1/2 order-3 md:order-3">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-xl shadow-navy/5 flex flex-col gap-3 max-w-md w-full"
              >
                <span className="font-extrabold text-[#1E3A5F] text-xs pb-1 border-b border-slate-100">Alur Berpikir (Thinking Trace)</span>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-50 text-[#00B4B4] text-[10px] font-black flex items-center justify-center shrink-0">1</div>
                  <span className="text-slate-500 font-bold text-[11px]">Identifikasi Variabel dan Konstanta</span>
                </div>
                <div className="h-4 border-l-2 border-dashed border-[#00B4B4]/30 ml-3" />
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-50 text-[#00B4B4] text-[10px] font-black flex items-center justify-center shrink-0">2</div>
                  <span className="text-slate-500 font-bold text-[11px]">Ubah Kalimat Masalah ke Bentuk Aljabar</span>
                </div>
                <div className="h-4 border-l-2 border-dashed border-[#00B4B4]/30 ml-3" />
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-50 text-[#00B4B4] text-[10px] font-black flex items-center justify-center shrink-0">3</div>
                  <span className="text-[#00B4B4] font-bold text-[11px]">Substitusi Nilai & Selesaikan Persamaan</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Step 4: Progress Tracker */}
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            
            {/* Visual Panel Left */}
            <div className="md:w-1/2 flex justify-end order-3 md:order-1">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-xl shadow-navy/5 flex flex-col gap-4 max-w-md w-full text-left"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-[#1E3A5F] text-xs">Evaluasi Hasil & Kuis</span>
                  <span className="bg-emerald-50 text-emerald-500 font-bold text-[10px] px-2 py-0.5 rounded-full">Selesai</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold text-xs">Skor Kuis Kemarin</span>
                  <span className="text-2xl font-black text-[#1E3A5F]">95/100</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00B4B4] h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
              </motion.div>
            </div>
            
            {/* Circle timeline index */}
            <div className="w-10 h-10 rounded-full bg-[#00B4B4] text-white font-extrabold flex items-center justify-center border-4 border-white shadow-md z-10 order-2 md:order-2">
              4
            </div>

            {/* Content Right */}
            <div className="md:w-1/2 order-1 md:order-3">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-md flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] mb-4 shadow-sm border border-[#00B4B4]/20">
                  <BarChart size={24} />
                </div>
                <span className="text-[#00B4B4] font-bold text-xs">LANGKAH 04</span>
                <h3 className="text-2xl font-extrabold text-[#1E3A5F] mt-2">Kuasai Materi & Cek Progress</h3>
                <p className="text-slate-500 font-semibold text-sm mt-3 leading-relaxed">
                  Uji kemampuan barumu dengan latihan soal kustom yang digenerate otomatis berdasarkan kelemahanmu, lalu lihat kemajuan grafik belajarmu tumbuh di dasbor pribadi.
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-[#1E3A5F] text-white py-20 px-6 text-center select-none relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Siap Belajar Lebih Cerdas dengan PahamIn?
          </h2>
          <p className="text-slate-300 font-semibold text-base mt-6 max-w-xl leading-relaxed">
            Daftarkan akun gratis hari ini juga dan kembangkan kebiasaan berpikir kritis yang kuat bersama Socratic AI kami!
          </p>
          <div className="flex gap-4 mt-8 font-bold">
            <Link 
              to="/register" 
              className="bg-[#00B4B4] hover:bg-[#009c9c] text-white px-8 py-4 rounded-xl text-center shadow-lg transition-all"
            >
              Mulai Belajar Sekarang
            </Link>
            <Link 
              to="/" 
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl text-center shadow-lg transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F223D] text-white pt-16 pb-8 px-6 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <Logo size="normal" showText={false} />
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">Paham</span>
                <span className="text-[#00B4B4]">In</span>
              </span>
            </div>
            <p className="text-slate-400 font-bold text-xs">
              Belajar lebih cerdas dengan AI Socratic PahamIn
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

          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Navigasi</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Beranda</Link>
              <Link to="/fitur" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Fitur</Link>
              <Link to="/cara-kerja" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Cara Kerja</Link>
              <Link to="/tentang" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Tentang</Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Fitur</h4>
            <div className="space-y-3">
              <span className="block text-slate-400 font-semibold text-xs">Socratic Chat</span>
              <span className="block text-slate-400 font-semibold text-xs">Upload Dokumen</span>
              <span className="block text-slate-400 font-semibold text-xs">Thinking Trace</span>
              <span className="block text-slate-400 font-semibold text-xs">Quiz & Progress</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Tentang</h4>
            <div className="space-y-3">
              <Link to="/tentang" className="block text-slate-400 hover:text-white font-semibold text-xs transition-colors">Tentang Kami</Link>
              <span className="block text-slate-400 font-semibold text-xs">Kebijakan Privasi</span>
              <span className="block text-slate-400 font-semibold text-xs">Syarat & Ketentuan</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm mb-5">Hubungi Kami</h4>
            <div className="space-y-3 text-slate-400 font-semibold text-xs">
              <span className="block">pahamin@gmail.com</span>
              <span className="block">+62 813-5832-8568</span>
              <span className="block">Malang, Indonesia</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800/80 my-6"></div>
        <p className="text-slate-500 font-bold text-xs text-center">
          PahamIn All Right Reserved, 2026
        </p>
      </footer>

    </div>
  );
};

export default CaraKerjaPage;
