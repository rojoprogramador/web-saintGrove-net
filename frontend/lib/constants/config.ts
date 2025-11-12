/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  name: 'SaintGrove',
  tagline: 'Transformamos Ideas en Soluciones Digitales',
  description:
    'Especialistas en desarrollo web, software a medida, branding y campañas publicitarias en Cali, Colombia.',
  url: 'https://saintgrove.net',
  locale: 'es-CO',
  timezone: 'America/Bogota',
};

export const CONTACT_INFO = {
  email: 'info@saintgrove.net',
  phone: '+57 322 674 0993',
  whatsapp: '+573226740993',
  whatsappLink: 'https://wa.me/573226740993',
  location: 'Cali, Colombia',
  workingHours: 'Lun - Vie: 9:00 AM - 6:00 PM',
};

export const BUSINESS_STATS = {
  projectsCompleted: '50+',
  satisfiedClients: '30+',
  yearsExperience: '5+',
};

export const API_CONFIG = {
  strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  strapiToken: process.env.STRAPI_API_TOKEN || '',
  revalidateTime: 3600, // 1 hour in seconds
};

export const SEO_CONFIG = {
  defaultTitle: 'SaintGrove - Desarrollo Web y Software a Medida en Cali',
  titleTemplate: '%s | SaintGrove',
  defaultDescription: APP_CONFIG.description,
  defaultKeywords: [
    'desarrollo web',
    'software a medida',
    'branding',
    'marketing digital',
    'Cali',
    'Colombia',
    'diseño web',
    'aplicaciones web',
  ],
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@saintgrove',
};
