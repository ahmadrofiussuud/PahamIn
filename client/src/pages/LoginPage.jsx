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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      return setError('Semua field harus diisi');
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Cek email dan password-mu.');
    } finally {
      setLoading(false);
    }
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
              Masuk dan <br />
              lanjutkan <span className="text-[#00B4B4]">belajarmu</span>
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

        {/* RIGHT COLUMN: LOGIN FORM CARD */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[480px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 sm:p-12"
          >
            {/* Header Text */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-[#1E3A5F] tracking-tight">Masuk ke PahamIn</h2>
              <p className="text-slate-500 text-sm font-semibold mt-2">
                Selamat datang kembali, Yuk lanjutkan perjalanan belajarmu!
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1E3A5F] mb-2">Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:border-transparent transition-all text-[#1E3A5F] placeholder-slate-400 font-semibold"
                  placeholder="Example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1E3A5F] mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-sm select-none font-semibold">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-600 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4.5 h-4.5 rounded border-slate-300 text-[#00B4B4] focus:ring-[#00B4B4]"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#00B4B4] hover:underline">
                  Lupa Password?
                </a>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E3A5F] hover:bg-[#152a46] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-navy/10 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-base"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Masuk'}
              </button>
            </form>

            {/* Divider "atau" */}
            <div className="relative my-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative px-4 bg-white text-sm font-semibold text-slate-400">atau</span>
            </div>

            {/* Social Logins */}
            <div className="space-y-3 font-bold">
              {/* Google Button */}
              <button
                type="button"
                className="w-full py-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-slate-700 shadow-sm text-sm"
              >
                {/* Google Icon SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.48 7.52l3.86 3C6.27 7.55 8.9 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2 3.7-4.97 3.7-8.62z" />
                  <path fill="#FBBC05" d="M5.34 14.52c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29l-3.86-3C.68 8.65 0 10.25 0 12s.68 3.35 1.48 4.77l3.86-3.25z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.52 1.18-4.23 1.18-3.1 0-5.73-2.51-6.66-5.48l-3.86 3C3.37 20.35 7.35 23 12 23z" />
                </svg>
                <span>Masuk dengan Google</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                className="w-full py-3.5 bg-[#1877F2] text-white rounded-xl hover:bg-[#1464cc] transition-all flex items-center justify-center gap-3 shadow-sm text-sm"
              >
                {/* Facebook Icon SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Masuk dengan Facebook</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                className="w-full py-3.5 bg-[#000000] text-white rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-sm text-sm"
              >
                {/* Apple Icon SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.73-1.2 1.87-1.05 2.98 1.12.09 2.26-.57 3-1.42z" />
                </svg>
                <span>Masuk dengan Apple</span>
              </button>
            </div>

            {/* Bottom Register Link */}
            <div className="mt-8 text-center text-slate-500 font-semibold text-sm">
              Belum punya akun?{' '}
              <Link to="/register" className="text-[#00B4B4] font-extrabold hover:underline">
                Daftar
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
