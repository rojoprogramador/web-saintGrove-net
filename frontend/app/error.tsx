'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error en desarrollo para debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Boundary]', {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      });
    }
    // TODO: En producción, enviar a servicio de logging (Sentry, LogRocket, etc.)
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saint-light via-white to-saint-green/5 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo variant="full" size="lg" />
        </div>

        {/* Icono de error con animación */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-saint-gradient opacity-20 blur-2xl rounded-full"></div>
            <div className="relative bg-white p-6 rounded-full shadow-xl border-4 border-orange-100">
              <AlertTriangle className="text-orange-500" size={64} strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Mensaje principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-saint-gray mb-4">
            Ups! Algo sali&oacute; mal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Ha ocurrido un error inesperado en la aplicaci&oacute;n.
          </p>
          <p className="text-base text-gray-500">
            No te preocupes, puedes intentar de nuevo o volver al inicio.
          </p>
        </motion.div>

        {/* Error digest (solo para desarrollo/debugging) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-200"
          >
            <p className="text-xs text-gray-500 font-mono">
              Error ID: {error.digest}
            </p>
          </motion.div>
        )}

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button
            variant="primary"
            size="lg"
            icon={RefreshCw}
            iconPosition="left"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Intentar de nuevo
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={Home}
            iconPosition="left"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto"
          >
            Volver al inicio
          </Button>
        </motion.div>

        {/* Línea divisoria */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-br from-saint-light via-white to-saint-green/5 text-gray-500">
              ¿Necesitas ayuda?
            </span>
          </div>
        </div>

        {/* Soporte adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600 mb-4">
            Si el problema persiste, no dudes en contactarnos
          </p>
          <Button
            variant="secondary"
            size="md"
            icon={Mail}
            iconPosition="left"
            onClick={() => window.location.href = '/contacto'}
            className="w-full sm:w-auto"
          >
            Contactar soporte
          </Button>
        </motion.div>

        {/* Footer informativo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-xs text-gray-400">
            SaintGrove - Soluciones digitales profesionales
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
