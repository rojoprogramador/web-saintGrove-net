import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: { icon: 24, text: 'text-xl' },
    md: { icon: 32, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-3xl' },
  };

  const IconSvg = () => (
    <svg
      width={sizes[size].icon}
      height={sizes[size].icon}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="saintgrove-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14c681" />
          <stop offset="100%" stopColor="#286999" />
        </linearGradient>
      </defs>
      {/* Triangle/Mountain shape */}
      <path
        d="M20 5 L35 35 L5 35 Z"
        fill="url(#saintgrove-gradient)"
      />
    </svg>
  );

  const TextLogo = () => (
    <span className={`font-bold text-saint-gradient ${sizes[size].text}`}>
      SaintGrove
    </span>
  );

  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      {(variant === 'full' || variant === 'icon') && <IconSvg />}
      {(variant === 'full' || variant === 'text') && <TextLogo />}
    </Link>
  );
};
