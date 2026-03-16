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
      <rect width="100" height="100" rx="18" fill="#3DDC6B" />

      {/* Dark navy speech bubble circle */}
      <circle cx="53" cy="46" r="37" fill="#3C3A96" />
      {/* Speech bubble tail - bottom left */}
      <path d="M24 72 C18 80 12 88 10 93 C18 87 30 83 38 80 Z" fill="#3C3A96" />

      {/* Antenna stem */}
      <rect x="50" y="10" width="6" height="9" rx="2.5" fill="#3DDC6B" />
      {/* Antenna teal circle */}
      <circle cx="53" cy="9" r="5.5" fill="#82E0D8" />

      {/* Head */}
      <rect x="27" y="19" width="52" height="35" rx="11" fill="#3DDC6B" />
      {/* Left ear */}
      <rect x="18" y="29" width="9" height="17" rx="4.5" fill="#3DDC6B" />
      {/* Right ear */}
      <rect x="73" y="29" width="9" height="17" rx="4.5" fill="#3DDC6B" />

      {/* Face plate (darker green) */}
      <rect x="31" y="23" width="44" height="27" rx="8" fill="#2DC45A" />

      {/* Left eye white */}
      <ellipse cx="42" cy="34" rx="5.5" ry="6.5" fill="white" />
      {/* Left pupil */}
      <circle cx="43" cy="33" r="2.8" fill="#0D0D1A" />

      {/* Right eye white */}
      <ellipse cx="64" cy="34" rx="5.5" ry="6.5" fill="white" />
      {/* Right pupil */}
      <circle cx="65" cy="33" r="2.8" fill="#0D0D1A" />

      {/* Smile */}
      <path d="M43 43 Q53 51 63 43" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Neck */}
      <rect x="47" y="54" width="12" height="5" rx="2" fill="#3DDC6B" />

      {/* Body */}
      <rect x="29" y="57" width="48" height="22" rx="9" fill="#3DDC6B" />
      {/* Body center detail */}
      <rect x="49" y="61" width="8" height="14" rx="3" fill="#2DC45A" />

      {/* Left shoulder */}
      <rect x="19" y="59" width="10" height="8" rx="4" fill="#3DDC6B" />
      {/* Right shoulder */}
      <rect x="71" y="59" width="10" height="8" rx="4" fill="#3DDC6B" />
    </svg>
  );
}
