import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  name?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  name = 'FUEGO & BRASA',
}) => {
  const iconSize = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const titleSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  }[size];

  return (
    <div id="brand-logo" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Original Vector Brand Emblem */}
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 rounded-2xl blur-[6px] opacity-75 group-hover:opacity-100 transition-opacity" />
        
        {/* Badge Base */}
        <div className="relative w-full h-full bg-[#16161f] border border-orange-500/40 rounded-2xl shadow-lg flex items-center justify-center p-1.5 overflow-hidden">
          {/* Subtle grill lines in background */}
          <div className="absolute inset-0 opacity-15 flex flex-col justify-between py-1 px-0.5 pointer-events-none">
            <div className="w-full h-[1px] bg-orange-300" />
            <div className="w-full h-[1px] bg-orange-300" />
            <div className="w-full h-[1px] bg-orange-300" />
            <div className="w-full h-[1px] bg-orange-300" />
          </div>

          {/* Handcrafted Original Dual-Flame & Grill SVG */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,87,34,0.6)]"
          >
            <defs>
              <linearGradient id="flameGradMain" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#D81B60" />
                <stop offset="35%" stopColor="#FF3D00" />
                <stop offset="75%" stopColor="#FF9100" />
                <stop offset="100%" stopColor="#FFD54F" />
              </linearGradient>
              <linearGradient id="flameGradInner" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#FF3D00" />
                <stop offset="50%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient id="grillMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6E40" />
                <stop offset="50%" stopColor="#FFE082" />
                <stop offset="100%" stopColor="#FF6E40" />
              </linearGradient>
            </defs>

            {/* External Fire Tongue Left */}
            <path
              d="M14 44C14 44 11 36 16 28C18.5 24 23 23 22 17C28 20 29 27 28 31C30 28 32 24 32 18C34 23 37 26 36 32C39 27 43 28 44 34C46 29 50 32 50 40C50 51 40 56 32 56C21 56 14 51 14 44Z"
              fill="url(#flameGradMain)"
            />

            {/* Inner Intense Flame Core */}
            <path
              d="M24 48C24 48 22 41 26 35C28 32 31 31 31 25C34 28 36 34 35 37C37 34 39 31 40 37C41 42 38 48 32 48C28 48 24 48 24 48Z"
              fill="url(#flameGradInner)"
            />

            {/* Cross Grill Iron Grate */}
            <path
              d="M16 46H48M20 50H44"
              stroke="url(#grillMetal)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Spark Dot */}
            <circle cx="21" cy="19" r="1.5" fill="#FFE57F" />
            <circle cx="43" cy="22" r="1.2" fill="#FFE57F" />
          </svg>
        </div>
      </div>

      {/* Typography Mark */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-black tracking-wider leading-none uppercase bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 bg-clip-text text-transparent drop-shadow-sm ${titleSize}`}
          >
            {name}
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-orange-400/90 uppercase mt-0.5">
            Craft Burgers • Smokehouse
          </span>
        )}
      </div>
    </div>
  );
};
