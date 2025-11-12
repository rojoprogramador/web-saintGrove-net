'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Global Error Boundary
 *
 * Captura errores críticos de toda la aplicación.
 * Este componente debe ser minimalista y no depender de componentes complejos
 * ya que podría fallar si hay errores en el sistema de UI.
 *
 * Solo se usa en casos extremos cuando error.tsx falla.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log crítico del error
    console.error('[CRITICAL ERROR]', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  // Estilos inline para evitar dependencias de Tailwind en caso de fallo crítico
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)',
      padding: '1rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    },
    card: {
      maxWidth: '600px',
      width: '100%',
      background: '#ffffff',
      borderRadius: '16px',
      padding: '3rem 2rem',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      textAlign: 'center' as const,
    },
    iconWrapper: {
      display: 'inline-flex',
      padding: '1.5rem',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#3F3F3F',
      marginBottom: '1rem',
    },
    description: {
      fontSize: '1.125rem',
      color: '#6b7280',
      marginBottom: '2rem',
      lineHeight: '1.6',
    },
    buttonPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #14c681 0%, #286999 100%)',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginRight: '0.75rem',
      marginBottom: '0.75rem',
    },
    buttonSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#3F3F3F',
      background: '#f3f4f6',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: '0.75rem',
    },
    divider: {
      width: '100%',
      height: '1px',
      background: '#e5e7eb',
      margin: '2rem 0',
    },
    footer: {
      fontSize: '0.875rem',
      color: '#9ca3af',
    },
    errorCode: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      fontFamily: 'monospace',
      background: '#f3f4f6',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      marginTop: '1rem',
      display: 'inline-block',
    },
  };

  const handleReload = () => {
    window.location.href = '/';
  };

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error - SaintGrove</title>
      </head>
      <body>
        <div style={styles.container}>
          <div style={styles.card}>
            {/* Icono de error */}
            <div style={styles.iconWrapper}>
              <AlertCircle
                size={48}
                color="#ffffff"
                strokeWidth={2}
              />
            </div>

            {/* Logo SVG simple */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              style={{ margin: '0 auto 1.5rem' }}
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#14c681' }} />
                  <stop offset="100%" style={{ stopColor: '#286999' }} />
                </linearGradient>
              </defs>
              <path d="M20 5 L35 35 L5 35 Z" fill="url(#logo-gradient)" />
            </svg>

            {/* Título */}
            <h1 style={styles.title}>Error cr&iacute;tico</h1>

            {/* Descripción */}
            <p style={styles.description}>
              La aplicaci&oacute;n encontr&oacute; un problema cr&iacute;tico.
              <br />
              Por favor, recarga la p&aacute;gina para continuar.
            </p>

            {/* Botones de acción */}
            <div>
              <button
                style={styles.buttonPrimary}
                onClick={() => reset()}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <RefreshCw size={18} />
                <span>Reintentar</span>
              </button>

              <button
                style={styles.buttonSecondary}
                onClick={handleReload}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#e5e7eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
              >
                Ir al inicio
              </button>
            </div>

            {/* Error digest para debugging */}
            {error.digest && (
              <div style={styles.errorCode}>
                Error ID: {error.digest}
              </div>
            )}

            {/* Divider */}
            <div style={styles.divider}></div>

            {/* Footer */}
            <p style={styles.footer}>
              Si el problema persiste, contacta a soporte:<br />
              <a
                href="mailto:soporte@saintgrove.com"
                style={{
                  color: '#14c681',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                soporte@saintgrove.com
              </a>
            </p>

            <p style={{ ...styles.footer, marginTop: '1rem' }}>
              SaintGrove - Soluciones digitales profesionales
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
