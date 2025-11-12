'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = '573226740993';
  const message = encodeURIComponent('Hola! Me gustaría obtener más información sobre sus servicios.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-white rounded-lg shadow-lg border border-gray-200 animate-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
          <p className="text-sm text-saint-gray pr-4">
            ¿Necesitas ayuda? Chatea con nosotros
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-saint-gradient rounded-full shadow-lg hover:scale-110 transition-smooth"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
};
