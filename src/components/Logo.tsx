import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="14" stroke="#C9A24B" strokeWidth="1.75" />
        <circle cx="16" cy="16" r="5.75" stroke="#C9A24B" strokeWidth="1.5" />
        <path
          d="M16 2L20.2 11.2M30 16L20.8 20.2M16 30L11.8 20.8M2 16L11.2 11.8"
          stroke="#C9A24B"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M25.9 6.1L19.8 12.2M25.9 25.9L19.8 19.8M6.1 25.9L12.2 19.8M6.1 6.1L12.2 12.2"
          stroke="#C9A24B"
          strokeOpacity="0.55"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#F5F1EA] whitespace-nowrap">
        RockyLens Studio
      </span>
    </span>
  );
};
