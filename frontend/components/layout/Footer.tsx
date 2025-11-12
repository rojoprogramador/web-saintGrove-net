import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { Logo } from '@/components/ui';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Desarrollo Web', href: '/servicios/desarrollo-web' },
    { label: 'Software a Medida', href: '/servicios/software-medida' },
    { label: 'Creación de Marca', href: '/servicios/branding' },
    { label: 'Campañas Publicitarias', href: '/servicios/marketing' },
  ];

  const company = [
    { label: 'Acerca de Nosotros', href: '/acerca' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreras', href: '/carreras' },
  ];

  const contact = [
    { label: 'info@saintgrove.net', href: 'mailto:info@saintgrove.net' },
    { label: '+57 322 674 0993', href: 'https://wa.me/573226740993' },
    { label: 'Cali, Colombia', href: '#' },
  ];

  const socialMedia = [
    { icon: Instagram, href: 'https://instagram.com/saintgrove', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/saintgrove', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@saintgrove', label: 'YouTube' },
  ];

  return (
    <footer className="bg-saint-gray text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo size="md" className="mb-4 text-white" />
            <p className="text-gray-300 text-sm">
              Transformamos ideas en soluciones digitales que impulsan tu negocio al siguiente nivel.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Servicios</h4>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-saint-green transition-smooth text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-saint-green transition-smooth text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-2">
              {contact.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-saint-green transition-smooth text-sm"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex gap-4 mb-4 md:mb-0">
            {socialMedia.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-saint-gradient flex items-center justify-center transition-smooth"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} SaintGrove. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
