import type { SVGProps } from "react";

export default function AssistantIcon({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Green rounded square background */}
      <rect width="100" height="100" rx="20" fill="#34D462" />

      {/* Dark navy speech bubble circle */}
      <circle cx="53" cy="45" r="37" fill="#2D2B72" />
      {/* Speech bubble tail */}
      <path d="M30 75 L16 90 L40 80 Z" fill="#2D2B72" />

      {/* Antenna stem */}
      <rect x="49" y="10" width="8" height="10" rx="3" fill="#34D462" />
      {/* Antenna tip */}
      <circle cx="53" cy="9" r="5.5" fill="#7DDFD4" />

      {/* Robot head */}
      <rect x="28" y="20" width="50" height="34" rx="11" fill="#34D462" />
      {/* Left ear */}
      <rect x="19" y="30" width="9" height="16" rx="4.5" fill="#34D462" />
      {/* Right ear */}
      <rect x="72" y="30" width="9" height="16" rx="4.5" fill="#34D462" />

      {/* Face plate (darker green) */}
      <rect x="33" y="25" width="40" height="24" rx="8" fill="#26B94E" />

      {/* Left eye white */}
      <ellipse cx="43" cy="36" rx="5" ry="6" fill="white" />
      {/* Left pupil */}
      <circle cx="44" cy="35" r="2.5" fill="#111827" />

      {/* Right eye white */}
      <ellipse cx="63" cy="36" rx="5" ry="6" fill="white" />
      {/* Right pupil */}
      <circle cx="64" cy="35" r="2.5" fill="#111827" />

      {/* Smile */}
      <path d="M44 45 Q53 52 62 45" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Body */}
      <rect x="33" y="57" width="40" height="20" rx="8" fill="#34D462" />
      {/* Body center detail */}
      <rect x="49" y="61" width="8" height="12" rx="3" fill="#26B94E" />

      {/* Left arm */}
      <rect x="21" y="59" width="12" height="7" rx="3.5" fill="#34D462" />
      {/* Right arm */}
      <rect x="67" y="59" width="12" height="7" rx="3.5" fill="#34D462" />
    </svg>
  );
}
