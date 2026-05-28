import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Compass, 
  Users, 
  Heart, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Award,
  BookOpen
} from 'lucide-react';
import Logo from '../components/Logo';
import ilustrasiBelajar from '../assets/ilustrasi belajar.png';
import starImg from '../assets/Vector.png';

const TentangPage = () => {
  // Card profile design with interactive hover
  const teamMembers = [
    {
      name: "Ahmad Rofiqi",
      role: "CEO & AI Specialist",
      desc: "Mengembangkan sistem kecerdasan buatan PahamIn agar mampu memandu dialog Socratic secara analitis dan empatik.",
      initials: "AR",
      bgGradient: "from-teal-500 to-[#00B4B4]"
    },
    {
      name: "Sabrina Putri",
      role: "Lead UI/UX Designer",
      desc: "Menciptakan desain antarmuka premium, intuitif, dan bebas hambatan agar belajar terasa menyenangkan bagi siswa.",
      initials: "SP",
      bgGradient: "from-[#1E3A5F] to-[#152a46]"
    },
    {
      name: "Farhan Maulana",
      role: "Lead Developer",
      desc: "Menyusun arsitektur frontend berkinerja tinggi, responsif, dan super lancar di berbagai perangkat.",
      initials: "FM",
      bgGradient: "from-emerald-500 to-[#00B4B4]"
    }
  ];

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
          <Link to="/cara-kerja" className="hover:text-[#1E3A5F] transition-colors relative pb-1 group">
            Cara kerja
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link to="/tentang" className="text-[#1E3A5F] relative pb-1">
            Tentang
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00B4B4] rounded-full"></span>
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

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-[#00B4B4]/10 text-[#00B4B4] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                Tentang Kami
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-[#1E3A5F] leading-tight tracking-tighter">
                Mengubah Cara Belajar Menjadi Lebih <span className="text-[#00B4B4]">Berarti</span>
              </h1>
              <p className="text-slate-500 font-medium text-base md:text-lg mt-6 leading-relaxed max-w-xl">
                PahamIn lahir dari sebuah visi sederhana: membebaskan siswa Indonesia dari lingkaran hapalan kosong tanpa arah, lalu menggantinya dengan metode dialogis yang merangsang alur logika berpikir mandiri.
              </p>
              <div className="flex gap-4 mt-8 font-bold">
                <Link 
                  to="/register" 
                  className="bg-[#1E3A5F] hover:bg-[#152a46] text-white px-7 py-3.5 rounded-xl text-center shadow-lg transition-all"
                >
                  Gabung Sekarang
                </Link>
                <Link 
                  to="/cara-kerja" 
                  className="bg-white border-2 border-[#00B4B4] text-[#00B4B4] hover:bg-[#00B4B4]/5 px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <span>Bagaimana Ia Bekerja</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Image (Uses ilustrasi belajar.png with premium glassmorphism outline) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-3 bg-white border border-slate-100 rounded-[32px] shadow-2xl shadow-navy/5 max-w-md"
            >
              <img 
                src={ilustrasiBelajar} 
                alt="Ilustrasi Belajar PahamIn" 
                className="w-full h-auto rounded-[24px] object-cover" 
              />
              
              {/* Decorative floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-slate-50 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#1E3A5F] text-xs">Socratic Dialog</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Berpikir analitis & mandiri</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* PHILOSOPHY SECTION (Socratic vs Conventional) */}
      <section className="max-w-6xl mx-auto px-6 pb-24 select-none">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F] tracking-tight">Mengapa Kami Berbeda?</h2>
          <p className="text-slate-500 font-semibold text-sm mt-3 max-w-xl mx-auto">
            Kami percaya belajar sejati bukan tentang menjejalkan jawaban, melainkan tentang menanyakan pertanyaan yang tepat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Hafalan Konvensional */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-xl shadow-navy/5 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-6">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-[#1E3A5F]">Sistem Hafalan Konvensional</h3>
            <p className="text-slate-400 font-semibold text-xs mt-2 leading-relaxed">
              Metode pasif yang mengutamakan ingatan jangka pendek demi menyelesaikan ujian formal.
            </p>
            
            <ul className="mt-6 space-y-3.5 text-slate-500 font-bold text-xs text-left">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>Menyuapkan jawaban langsung tanpa proses nalar</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>Materi cepat dilupakan setelah lembar ujian selesai dikumpul</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>Siswa cenderung pasif menerima informasi dari satu arah</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: Socratic PahamIn */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border-2 border-[#00B4B4] rounded-[28px] p-8 shadow-xl shadow-navy/5 relative overflow-hidden bg-[#00B4B4]/5"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00B4B4]/5 rounded-bl-full flex items-center justify-center pl-6 pb-6">
              <Sparkles className="text-[#00B4B4] opacity-35" size={20} />
            </div>

            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00B4B4] mb-6">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-[#1E3A5F]">PahamIn Socratic Method</h3>
            <p className="text-[#00B4B4] font-extrabold text-xs mt-2 leading-relaxed">
              Metode dialogis interaktif yang membimbing alur berpikir kritis untuk pemahaman jangka panjang.
            </p>
            
            <ul className="mt-6 space-y-3.5 text-[#1E3A5F] font-bold text-xs text-left">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4] shrink-0" />
                <span>Membimbing siswa dengan pertanyaan kritis untuk mencari jawaban sendiri</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4] shrink-0" />
                <span>Memahami pondasi konsep terdalam, bukan sekadar menghafal rumus</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4] shrink-0" />
                <span>Fitur *Thinking Trace* mendokumentasikan langkah nalar secara terstruktur</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section className="bg-[#EEF4FC] py-20 px-6 select-none relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col (Visi) */}
            <div className="lg:col-span-5 text-left">
              <span className="text-[#00B4B4] font-extrabold text-xs uppercase tracking-wider block mb-2">Arah Masa Depan</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F] tracking-tight">Visi Kami</h2>
              
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 mt-6 shadow-xl shadow-navy/5 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white shrink-0">
                  <Target size={20} />
                </div>
                <p className="text-[#1E3A5F] font-extrabold text-base leading-relaxed">
                  \"Menjadi platform pembelajaran utama yang membentuk generasi kritis, mandiri, dan analitis melalui bimbingan AI yang interaktif serta transparan.\"
                </p>
              </div>
            </div>

            {/* Right Col (Misi) */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[#00B4B4] font-extrabold text-xs uppercase tracking-wider block mb-2">Langkah Nyata</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F] tracking-tight">Misi Kami</h2>
              
              <div className="space-y-6 mt-6">
                
                {/* Misi 1 */}
                <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] shrink-0 font-extrabold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] text-sm">Akses Dialog Interaktif</h4>
                    <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-1">
                      Menghadirkan pendamping belajar berbasis kecerdasan buatan (Socratic AI) yang ramah, sabar, dan menuntun logika berpikir.
                    </p>
                  </div>
                </div>

                {/* Misi 2 */}
                <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] shrink-0 font-extrabold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] text-sm">Visualisasi Alur Berpikir (Thinking Trace)</h4>
                    <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-1">
                      Membedah langkah-langkah logika di balik penyelesaian rumus atau analisis bacaan secara runut demi menghindari kebingungan.
                    </p>
                  </div>
                </div>

                {/* Misi 3 */}
                <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] shrink-0 font-extrabold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] text-sm">Dukungan Kurikulum Nasional</h4>
                    <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-1">
                      Menyediakan bank latihan soal adaptif dan modul interaktif yang diselaraskan dengan kebutuhan akademik siswa SMA.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEAM SECTION (Our Founders) */}
      <section className="max-w-6xl mx-auto px-6 py-24 select-none text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F] tracking-tight">Tim di Balik PahamIn</h2>
        <p className="text-slate-500 font-semibold text-sm mt-3 max-w-xl mx-auto mb-16">
          Pengembang dan visioner yang berdedikasi tinggi untuk memajukan pendidikan kritis di Indonesia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i}
              className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-xl shadow-navy/5 flex flex-col items-center hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
            >
              {/* Initials avatar with gradient */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${member.bgGradient} flex items-center justify-center text-white font-black text-xl shadow-md mb-6`}>
                {member.initials}
              </div>
              
              <h3 className="font-extrabold text-[#1E3A5F] text-lg">{member.name}</h3>
              <span className="text-[#00B4B4] font-extrabold text-xs mt-1">{member.role}</span>
              
              <p className="text-slate-400 font-semibold text-xs mt-4 leading-relaxed text-center">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-[#1E3A5F] text-white py-20 px-6 text-center select-none relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Ingin Menguji Daya Pikir Kritis Anda?
          </h2>
          <p className="text-slate-300 font-semibold text-base mt-6 max-w-xl leading-relaxed">
            Daftarkan diri Anda hari ini dan mulailah berdiskusi dengan AI Socratic kami secara gratis!
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

export default TentangPage;
