import React from 'react';

const Logo = ({ size = 'normal', showText = true, className = '' }) => {
  // Determine scale dimensions based on size prop
  const dimensions = {
    small: { height: 28, viewWidth: 160 },
    normal: { height: 40, viewWidth: 190 },
    large: { height: 56, viewWidth: 220 },
  };

  const { height } = dimensions[size] || dimensions.normal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Icon Logo PahamIn */}
      <svg
        height={height}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Left Network Node 1 (Top) */}
        <path
          d="M25 15V22C25 24 28 27 30 27H40"
          stroke="#00B4B4"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="25" cy="15" r="4.5" fill="#EEF4FC" stroke="#00B4B4" strokeWidth="3" />

        {/* Left Network Node 2 (Middle) */}
        <path
          d="M15 35H30"
          stroke="#00B4B4"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="35" r="4.5" fill="#EEF4FC" stroke="#00B4B4" strokeWidth="3" />

        {/* Left Network Node 3 (Bottom) */}
        <path
          d="M20 52C20 48 23 45 28 45H32"
          stroke="#00B4B4"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="52" r="4.5" fill="#EEF4FC" stroke="#00B4B4" strokeWidth="3" />

        {/* Navy P-Shape (Top & Outer Loop) */}
        <path
          d="M40 27H62C72 27 80 34 80 43C80 52 72 59 62 59H52"
          stroke="#1E3A5F"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Teal P-Shape (Bottom Curve & Stem) */}
        <path
          d="M40 27V59C40 67 44 71 52 71"
          stroke="#00B4B4"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Three Socratic Chat Dots (Teal) inside P-loop */}
        <circle cx="50" cy="43" r="3.5" fill="#00B4B4" />
        <circle cx="59" cy="43" r="3.5" fill="#00B4B4" />
        <circle cx="68" cy="43" r="3.5" fill="#00B4B4" />
      </svg>

      {/* Text Logo: PahamIn */}
      {showText && (
        <span
          className={`font-extrabold tracking-tight select-none ${
            size === 'small' ? 'text-xl' : size === 'large' ? 'text-4xl' : 'text-3xl'
          }`}
        >
          <span className="text-[#1E3A5F]">Paham</span>
          <span className="text-[#00B4B4]">In</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
