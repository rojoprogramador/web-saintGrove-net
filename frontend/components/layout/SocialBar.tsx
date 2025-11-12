'use client';

import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

export const SocialBar: React.FC = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/saintgrove',
      label: 'Instagram',
      color: 'hover:bg-pink-600',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/saintgrove',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@saintgrove',
      label: 'YouTube',
      color: 'hover:bg-red-600',
    },
  ];

  return (
    <>
      {/* Desktop - Fixed Left Side */}
      <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 bg-saint-gray text-white ${social.color} transition-smooth group`}
              aria-label={social.label}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>

      {/* Mobile - Show in Footer only (already included in Footer component) */}
    </>
  );
};
