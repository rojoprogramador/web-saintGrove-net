import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  features?: string[];
  gradient?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  gradient = true,
  className = '',
  children,
}) => {
  return (
    <div
      className={`p-6 rounded-xl border border-gray-200 ${
        gradient ? 'bg-card-gradient' : 'bg-white'
      } hover:shadow-lg transition-smooth ${className}`}
    >
      {Icon && (
        <div className="mb-4 inline-flex p-3 rounded-lg bg-saint-gradient">
          <Icon size={24} className="text-white" />
        </div>
      )}

      <h3 className="text-xl font-bold text-saint-gray mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <span className="text-saint-green mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
};
