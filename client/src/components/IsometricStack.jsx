import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, HelpCircle, TrendingUp } from 'lucide-react';

const IsometricStack = () => {
  // Star SVG component for decoration
  const StarIcon = ({ className }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="#1E3A5F">
      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
    </svg>
  );

  return (
    <div className="relative w-full max-w-[500px] h-[440px] flex items-center justify-center select-none font-sans">
      
      {/* BACKGROUND DECORATIONS (Dotted Path & Stars) */}
      <div className="absolute inset-0 w-full h-full -z-10 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 450 400" fill="none" className="opacity-40">
          {/* Dotted paths connecting badges to the center */}
          <path 
            d="M80 80 C 130 50, 320 50, 370 120 C 420 190, 370 300, 220 320 C 100 330, 40 210, 80 80" 
            stroke="#00B4B4" 
            strokeWidth="2" 
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* 3D PERSPECTIVE WRAPPER */}
      <div 
        className="relative w-[280px] h-[280px] flex items-center justify-center transition-transform duration-500 hover:scale-105"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* BOTTOM GLOW */}
        <div 
          className="absolute w-[240px] h-[240px] bg-gradient-to-tr from-[#9333ea] to-[#00b4b4] rounded-[40px] opacity-40 blur-3xl"
          style={{
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(-40px)',
          }}
        />

        {/* BOTTOM ISOMETRIC PLATE (Purple Neon Base) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute w-[220px] h-[220px] rounded-[36px] p-2 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] shadow-[0_20px_50px_rgba(124,58,237,0.3)] border border-[#a78bfa]/50"
          style={{
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(0px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner neon pattern */}
          <div className="w-full h-full rounded-[28px] bg-[#1a0e3a] relative overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-40" 
              style={{ 
                backgroundImage: 'radial-gradient(circle, #00b4b4 1.5px, transparent 1.5px)', 
                backgroundSize: '16px 16px' 
              }} 
            />
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#7c3aed]/10 to-[#00b4b4]/20 rounded-[28px]" />
            {/* Glowing neon core */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#00b4b4] filter blur-xl opacity-80 animate-pulse" />
          </div>
        </motion.div>

        {/* VERTICAL CONNECTING PILLAR (Dotted Line) */}
        <div 
          className="absolute w-0.5 h-[100px] border-l-2 border-dashed border-[#00B4B4]/50 z-20"
          style={{
            transform: 'translateY(-10px) translateZ(50px)',
          }}
        />

        {/* TOP ISOMETRIC PLATE (Translucent Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute w-[220px] h-[220px] rounded-[36px] bg-white/20 backdrop-blur-md border border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex items-center justify-center"
          style={{
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(90px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner details for realism */}
          <div className="absolute inset-2 rounded-[28px] border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-inner" />
          
          {/* Center glowing logo outline */}
          <div className="w-12 h-12 rounded-2xl bg-white/40 flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>

      </div>

      {/* FLOATING BADGES POSITIONED AROUND THE 3D STACK */}
      
      {/* 1. Socratic Chat (Top Left) */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-12 left-6 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3.5 flex items-center gap-3 z-30 cursor-pointer"
      >
        <div className="w-10 h-10 bg-[#00B4B4] rounded-xl flex items-center justify-center text-white">
          <MessageSquare size={20} />
        </div>
        <span className="font-bold text-[#1E3A5F] text-sm">Socratic Chat</span>
      </motion.div>

      {/* 2. Progress belajar (Top Right) */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-2 -right-4 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3.5 flex items-center gap-3 z-30 cursor-pointer"
      >
        <div className="w-10 h-10 bg-[#00B4B4] rounded-xl flex items-center justify-center text-white">
          <TrendingUp size={20} />
        </div>
        <span className="font-bold text-[#1E3A5F] text-sm">Progress belajar</span>
      </motion.div>

      {/* 3. Ringkasan Materi (Bottom Left) */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.6 }}
        className="absolute bottom-16 -left-10 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3.5 flex items-center gap-3 z-30 cursor-pointer"
      >
        <div className="w-10 h-10 bg-[#00B4B4] rounded-xl flex items-center justify-center text-white">
          <FileText size={20} />
        </div>
        <span className="font-bold text-[#1E3A5F] text-sm">Ringkasan Materi</span>
      </motion.div>

      {/* 4. Achievement (Bottom Right) */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.9 }}
        className="absolute bottom-28 -right-8 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-100 p-3.5 flex items-center gap-3 z-30 cursor-pointer"
      >
        <div className="w-10 h-10 bg-[#00B4B4] rounded-xl flex items-center justify-center text-white">
          <HelpCircle size={20} />
        </div>
        <span className="font-bold text-[#1E3A5F] text-sm">Achievement</span>
      </motion.div>

      {/* DECORATIVE STAR ICONS */}
      <StarIcon className="absolute top-24 right-20 opacity-60 animate-pulse" />
      <StarIcon className="absolute bottom-36 left-16 opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <StarIcon className="absolute bottom-14 right-10 opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }} />
      <StarIcon className="absolute bottom-4 left-6 opacity-30 animate-pulse" />

    </div>
  );
};

export default IsometricStack;
