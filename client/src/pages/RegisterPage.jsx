import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';
import heroImg from '../assets/ilustrasi belajar.png';
import starImg from '../assets/Vector.png';
import chatImg from '../assets/icon socratic chat.png';
import achievementImg from '../assets/icon quiz hari ini.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      return "Semua field harus diisi.";
    }
    if (!formData.email.includes('@')) {
      return "Format email tidak valid.";
    }
    if (formData.password.length < 8) {
      return "Password minimal harus 8 karakter.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Konfirmasi password tidak cocok.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError('');
    setLoading(true);
    try {
      await register(formData.fullName, formData.email, formData.password);
      alert("Registrasi berhasil! Silakan masuk.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Custom Inline SVG for Ringkasan Materi Document Icon (matches Figma exactly)
  const DocumentIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0 select-none">
      <rect width="40" height="40" rx="10" fill="#00B4B4" />
      <path d="M14 11H22L27 16V29C27 30.1 26.1 31 25 31H14C12.9 31 12 30.1 12 29V13C12 11.9 12.9 11 14 11Z" fill="white" />
      <path d="M22 11V16H27" fill="#E0F2F1" />
      <path d="M15 20H24" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 24H24" stroke="#00B4B4" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  // Star component using the exact 22x33px figma asset provided by UI/UX
  const StarIcon = ({ className, style }) => (
    <img 
      src={starImg} 
      alt="star" 
      className={`w-[22px] h-[33px] object-contain shrink-0 select-none ${className}`} 
      style={style}
    />
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0f6fc] to-[#e6eef8] flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-x-hidden font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: BRANDING & ILLUSTRATION */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full py-4 relative">
          {/* Logo PahamIn in Top Left */}
          <div className="mb-10">
            <Logo size="normal" />
          </div>

          {/* Heading and Subtitle */}
          <div className="max-w-lg mb-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A5F] leading-tight tracking-tight">
              Daftar dan <br />
              mulailah <span className="text-[#00B4B4]">belajarmu</span>
            </h1>
            <p className="text-slate-600 text-base lg:text-lg mt-4 leading-relaxed font-medium">
              Belajar lebih efektif dengan AI yang tetap membantu untuk memahami konsep.
            </p>
          </div>

          {/* Interactive Illustration Area with Dotted Path & Floating Badges */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 mt-8 h-[340px] flex items-end justify-center select-none">
            
            {/* Dotted path lines behind everything */}
            <div className="absolute inset-0 w-full h-full -z-10">
              <svg width="100%" height="100%" viewBox="0 0 400 340" fill="none" className="opacity-80">
                {/* Circuit Path 1: From Socratic Chat to Achievement */}
                <path 
                  d="M 120 40 H 220 V 130 H 320" 
                  stroke="#1E3A5F" 
                  strokeWidth="2" 
                  strokeDasharray="4 6"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                
                {/* Circuit Path 2: From Ringkasan Materi to Socratic Chat */}
                <path 
                  d="M 60 220 H 120 V 90" 
                  stroke="#1E3A5F" 
                  strokeWidth="2" 
                  strokeDasharray="4 6"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />

                {/* Circuit Path 3: From Achievement down */}
                <path 
                  d="M 320 170 V 270 H 200" 
                  stroke="#1E3A5F" 
                  strokeWidth="2" 
                  strokeDasharray="4 6"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>

            {/* Character Student Illustration */}
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              src={heroImg} 
              alt="PahamIn Student" 
              className="w-[280px] object-contain drop-shadow-2xl z-10 relative bottom-0 pointer-events-none"
            />

            {/* Floating Badge 1: Socratic Chat */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-6 left-6 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3 flex items-center gap-3.5 z-20 cursor-pointer"
            >
              <img src={chatImg} alt="Chat Icon" className="w-10 h-10 object-contain shrink-0" />
              <span className="font-bold text-[#1E3A5F] text-sm pr-1">Socratic Chat</span>
            </motion.div>

            {/* Floating Badge 2: Ringkasan Materi */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-24 -left-8 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3 flex items-center gap-3.5 z-20 cursor-pointer"
            >
              <DocumentIcon />
              <span className="font-bold text-[#1E3A5F] text-sm pr-1">Ringkasan Materi</span>
            </motion.div>

            {/* Floating Badge 3: Achievement */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-28 -right-4 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3 flex items-center gap-3.5 z-20 cursor-pointer"
            >
              <img src={achievementImg} alt="Achievement Icon" className="w-10 h-10 object-contain shrink-0" />
              <span className="font-bold text-[#1E3A5F] text-sm pr-1">Achievement</span>
            </motion.div>

            {/* Decorative Stars matching figma exact sizes centered precisely on dotted paths turns */}
            <StarIcon className="absolute opacity-80 animate-pulse" style={{ left: '209px', top: '24px', animationDelay: '0.2s' }} />
            <StarIcon className="absolute opacity-70 animate-pulse" style={{ left: '209px', top: '114px', animationDelay: '0.8s' }} />
            <StarIcon className="absolute opacity-60 animate-pulse" style={{ left: '109px', top: '204px', animationDelay: '1.4s' }} />
            <StarIcon className="absolute opacity-50 animate-pulse" style={{ left: '309px', top: '254px', animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTER FORM CARD */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[480px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 sm:p-12"
          >
            {/* Header Text */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-[#1E3A5F] tracking-tight">Gabung PahamIn</h2>
              <p className="text-slate-500 text-sm font-semibold mt-2">
                Mulai perjalanan critical thinking-mu sekarang juga!
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm"
              >
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#1E3A5F] mb-2">Nama Lengkap</label>
                <input 
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:border-transparent transition-all text-[#1E3A5F] placeholder-slate-400 font-semibold"
                  placeholder="Budi Santoso"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1E3A5F] mb-2">Email</label>
                <input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:border-transparent transition-all text-[#1E3A5F] placeholder-slate-400 font-semibold"
                  placeholder="budi@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1E3A5F] mb-2">Password</label>
                <div className="relative">
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:border-transparent transition-all text-[#1E3A5F] placeholder-slate-400 font-semibold"
                    placeholder="Minimal 8 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1E3A5F] mb-2">Konfirmasi Password</label>
                <div className="relative">
                  <input 
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:border-transparent transition-all text-[#1E3A5F] placeholder-slate-400 font-semibold"
                    placeholder="Ulangi password minimal 8 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E3A5F] hover:bg-[#152a46] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-navy/10 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-base mt-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Buat Akun Sekarang'}
              </button>
            </form>

            {/* Bottom Login Link */}
            <div className="mt-8 text-center text-slate-500 font-semibold text-sm">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-[#00B4B4] font-extrabold hover:underline">
                Masuk
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
