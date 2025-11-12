import type { NextConfig } from "next";

/**
 * Content Security Policy
 * Protección contra XSS y control de recursos cargados
 *
 * TRADE-OFFS ACTUALES:
 * - 'unsafe-inline' en style-src: Requerido por Framer Motion y Next.js
 * - 'unsafe-eval' en script-src (dev only): Requerido por Next.js dev server
 *
 * FUTURO (Fase 5): Migrar a nonce-based CSP para eliminar 'unsafe-inline'
 */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https: res.cloudinary.com;
  font-src 'self' data:;
  connect-src 'self' https://vercel.live https://vitals.vercel-insights.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`;

/**
 * Security Headers Configuration
 * Implementa protección contra vulnerabilidades comunes:
 * - XSS (Cross-Site Scripting)
 * - Clickjacking
 * - MIME type sniffing
 * - Information leakage
 */
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

// HSTS (HTTP Strict Transport Security) - Solo en producción
if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  /**
   * Security Headers
   * Aplicados a todas las rutas para máxima protección
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
