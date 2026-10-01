import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showTagline = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Pulse & Code Logo Icon */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-slate-900 to-cyan-500/20 border border-white/15 p-1.5 shadow-md shadow-indigo-500/10 group`}
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/30 to-cyan-400/30 blur-md opacity-40 group-hover:opacity-75 transition-opacity" />

        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
          aria-hidden="true"
        >
          {/* Subtle grid accent inside logo */}
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
          
          {/* Left bracket */}
          <path
            d="M8.5 12L5 16L8.5 20"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic pulse / frequency line */}
          <path
            d="M10 16H13L15 10L17.5 22L20 14L21.5 16H23"
            stroke="url(#pulse-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right bracket */}
          <path
            d="M23.5 12L27 16L23.5 20"
            stroke="#818CF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active telemetry node dot */}
          <circle cx="17.5" cy="22" r="1.5" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '3s' }} />

          <defs>
            <linearGradient id="pulse-gradient" x1="10" y1="10" x2="23" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#818CF8" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-wider">
          <span
            className={`font-extrabold tracking-tight ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            CODE
          </span>
          <span
            className={`font-black tracking-tight ${textSizes[size]} bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent`}
          >
            PULSE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1 mb-2 animate-pulse" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium tracking-normal text-slate-400 -mt-1">
            Developer Performance Platform
          </span>
        )}
      </div>
    </div>
  );
};
