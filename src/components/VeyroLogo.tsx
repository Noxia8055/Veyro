import React from 'react';

interface VeyroLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showWordmark?: boolean;
  theme?: 'light' | 'dark' | 'metallic';
  variant?: 'image' | 'vector' | 'card';
}

export function VeyroLogo({
  className = '',
  size = 'md',
  showText = true,
  showWordmark,
  theme = 'dark',
}: VeyroLogoProps) {
  const displayWordmark = showWordmark !== undefined ? showWordmark : showText;

  // Dimension presets for transparent emblem
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
    xl: 'w-11 h-11 sm:w-12 sm:h-12',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.22em]',
    md: 'text-base tracking-[0.24em]',
    lg: 'text-lg tracking-[0.26em]',
    xl: 'text-xl tracking-[0.28em]',
  };

  const isLight = theme === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none bg-transparent ${className}`}>
      {/* Official Brand Logo Emblem - 100% Transparent, No Background Box */}
      <div
        className={`relative shrink-0 bg-transparent flex items-center justify-center ${iconSizes[size]} transition-transform duration-200 group-hover:scale-[1.04]`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="VEYRO Logo"
        >
          <defs>
            <linearGradient id={isLight ? 'veyroLeftLight' : 'veyroLeftDark'} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLight ? '#94A3B8' : '#0F172A'} />
              <stop offset="50%" stopColor={isLight ? '#CBD5E1' : '#1E293B'} />
              <stop offset="100%" stopColor={isLight ? '#FFFFFF' : '#334155'} />
            </linearGradient>

            <linearGradient id={isLight ? 'veyroRightLight' : 'veyroRightDark'} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? '#FFFFFF' : '#334155'} />
              <stop offset="50%" stopColor={isLight ? '#E2E8F0' : '#1E293B'} />
              <stop offset="100%" stopColor={isLight ? '#64748B' : '#0F172A'} />
            </linearGradient>

            <linearGradient id={isLight ? 'veyroBevelLight' : 'veyroBevelDark'} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isLight ? '#FFFFFF' : '#64748B'} stopOpacity="0.9" />
              <stop offset="50%" stopColor={isLight ? '#E2E8F0' : '#475569'} stopOpacity="0.6" />
              <stop offset="100%" stopColor={isLight ? '#94A3B8' : '#0F172A'} stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Left Wing Facet */}
          <path
            d="M 18 16 L 38 16 L 52 76 L 38 86 L 18 16 Z"
            fill={`url(#${isLight ? 'veyroLeftLight' : 'veyroLeftDark'})`}
          />

          {/* Right Wing Facet */}
          <path
            d="M 44 86 L 58 76 L 82 16 L 62 16 L 44 86 Z"
            fill={`url(#${isLight ? 'veyroRightLight' : 'veyroRightDark'})`}
          />

          {/* Center Bevel Highlight */}
          <polygon
            points="38,16 48,16 54,76 44,76"
            fill={`url(#${isLight ? 'veyroBevelLight' : 'veyroBevelDark'})`}
          />
        </svg>
      </div>

      {/* Brand Typography: Only Name Visible */}
      {displayWordmark && (
        <span
          className={`font-black font-sans uppercase tracking-[0.24em] leading-none ${
            isLight ? 'text-white' : 'text-[#0F172A]'
          } ${textSizes[size]}`}
        >
          VEYRO
        </span>
      )}
    </div>
  );
}

// Brand Luxury Embossed Card Component directly reproducing the user's card photo
export function VeyroBrandCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0D13] p-5 shadow-2xl text-white select-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 20%, #171B26 0%, #0B0D13 70%)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700/50 shadow-md bg-black shrink-0">
          <img
            src="/image.png"
            alt="VEYRO Embossed Card"
            className="w-full h-full object-cover filter contrast-115"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-[0.28em] text-white font-sans">VEYRO</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              ₹ LIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Non-custodial INR Escrow Vault • 85/15 Split Protocol
          </p>
        </div>
      </div>
    </div>
  );
}

// Monogram Watermark
export function VeyroWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-15 ${className}`}
    >
      <path
        d="M 18 20 L 38 20 L 52 74 L 38 84 L 18 20 Z"
        fill="currentColor"
      />
      <path
        d="M 44 84 L 58 74 L 82 20 L 62 20 L 44 84 Z"
        fill="currentColor"
      />
    </svg>
  );
}
