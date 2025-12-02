import React from 'react';
import Link from 'next/link';
import Image from "next/image";

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 24, text: 'text-xl' },
  md: { icon: 32, text: 'text-2xl' },
  lg: { icon: 40, text: 'text-3xl' },
};

const IconSvg: React.FC<{ size: 'sm' | 'md' | 'lg' }> = ({ size }) => (
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

IconSvg.displayName = 'IconSvg';

const TextLogo: React.FC<{ width : number, height : number }> = ({ width, height }) => (
  <Image src="/Saintgrove.svg" alt="Logotipo" width={width} height={height} />
);

TextLogo.displayName = 'TextLogo';

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
}) => {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      {(variant === 'full' || variant === 'text') && <TextLogo width={250} height={150} />}
    </Link>
  );
};
