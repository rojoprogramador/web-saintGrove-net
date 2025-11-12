/**
 * Navigation constants for the application
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Contacto', href: '/contacto' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'Desarrollo Web', href: '/servicios/desarrollo-web' },
    { label: 'Software a Medida', href: '/servicios/software-medida' },
    { label: 'Branding', href: '/servicios/branding' },
    { label: 'Marketing Digital', href: '/servicios/marketing' },
  ],
  company: [
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Nuestro Proceso', href: '/proceso' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { label: 'Términos y Condiciones', href: '/terminos' },
    { label: 'Política de Privacidad', href: '/privacidad' },
  ],
};

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/saintgrove',
  linkedin: 'https://linkedin.com/company/saintgrove',
  youtube: 'https://youtube.com/@saintgrove',
  facebook: 'https://facebook.com/saintgrove',
  twitter: 'https://twitter.com/saintgrove',
};
