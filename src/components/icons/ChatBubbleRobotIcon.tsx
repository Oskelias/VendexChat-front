import type { SVGProps } from "react";

export default function ChatBubbleRobotIcon({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* WhatsApp-style bubble in emerald */}
      <rect x="0" y="0" width="100" height="100" rx="24" fill="#10b981" />
      {/* Tail / colita bottom-left */}
      <path d="M28 95 Q18 105 5 110 Q22 108 32 100 Z" fill="#10b981" />

      {/* Robot (scaled and centered) */}
      <g transform="translate(15, 10) scale(0.70)">
        {/* Background rounded square */}
        <rect width="100" height="100" rx="22" fill="url(#cbrobot-bg)" />
        {/* Antenna base */}
        <rect x="45" y="14" width="10" height="8" rx="3" fill="#2dd4a0" />
        {/* Antenna tip */}
        <circle cx="50" cy="12" r="4" fill="#5eead4" />
        {/* Head */}
        <rect x="22" y="22" width="56" height="42" rx="12" fill="#1cd4a0" />
        {/* Left ear */}
        <rect x="14" y="34" width="8" height="16" rx="4" fill="#1cd4a0" />
        {/* Right ear */}
        <rect x="78" y="34" width="8" height="16" rx="4" fill="#1cd4a0" />
        {/* Face plate */}
        <rect x="28" y="28" width="44" height="30" rx="8" fill="#15b88a" />
        {/* Left eye */}
        <ellipse cx="39" cy="42" rx="5" ry="6" fill="white" />
        <circle cx="40" cy="41" r="2.5" fill="#1a1a2e" />
        {/* Right eye */}
        <ellipse cx="61" cy="42" rx="5" ry="6" fill="white" />
        <circle cx="62" cy="41" r="2.5" fill="#1a1a2e" />
        {/* Mouth */}
        <path d="M42 52 Q50 58 58 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Body */}
        <rect x="30" y="66" width="40" height="22" rx="8" fill="#1cd4a0" />
        {/* Body detail */}
        <rect x="48" y="70" width="4" height="14" rx="2" fill="#15b88a" />
        {/* Left arm */}
        <rect x="20" y="68" width="10" height="6" rx="3" fill="#1cd4a0" />
        {/* Right arm */}
        <rect x="70" y="68" width="10" height="6" rx="3" fill="#1cd4a0" />
      </g>

      <defs>
        <linearGradient id="cbrobot-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b2f80" />
          <stop offset="1" stopColor="#2a1f6e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
