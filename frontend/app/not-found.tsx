import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SearchX, Home, Mail, ArrowRight, Wrench, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saint-green/10 via-white to-saint-blue/10 px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Logo en la parte superior */}
        <div className="flex justify-center mb-12">
          <Logo variant="full" size="lg" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: Error visual */}
          <div className="text-center md:text-left">
            {/* 404 Grande con gradiente */}
            <div className="relative mb-6">
              <h1 className="text-9xl md:text-[12rem] font-black bg-saint-gradient bg-clip-text text-transparent leading-none">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                <SearchX
                  className="text-saint-green/20"
                  size={200}
                  strokeWidth={1}
                />
              </div>
            </div>

            {/* Mensaje principal */}
            <h2 className="text-3xl md:text-4xl font-bold text-saint-gray mb-4">
              P&aacute;gina no encontrada
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Lo sentimos, la p&aacute;gina que buscas no existe o ha sido movida.
            </p>

            {/* Botones principales */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Home}
                  iconPosition="left"
                  className="w-full"
                >
                  Volver al inicio
                </Button>
              </Link>
              <Link href="/contacto" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  icon={Mail}
                  iconPosition="left"
                  className="w-full"
                >
                  Contactar
                </Button>
              </Link>
            </div>
          </div>

          {/* Columna derecha: Sugerencias de navegación */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-saint-gray mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-saint-gradient rounded-full"></span>
              Quiz&aacute;s te interese...
            </h3>

            {/* Lista de links sugeridos */}
            <div className="space-y-4">
              {/* Servicios */}
              <Link
                href="/servicios"
                className="group block p-4 rounded-xl border border-gray-200 hover:border-saint-green hover:bg-card-gradient transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-saint-gradient">
                      <Wrench className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-saint-gray group-hover:text-saint-green transition-colors">
                        Nuestros Servicios
                      </h4>
                      <p className="text-sm text-gray-500">
                        Descubre lo que podemos hacer por ti
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="text-gray-400 group-hover:text-saint-green group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </div>
              </Link>

              {/* Proceso */}
              <Link
                href="/proceso"
                className="group block p-4 rounded-xl border border-gray-200 hover:border-saint-blue hover:bg-card-gradient transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-saint-blue to-saint-blue-light">
                      <ArrowRight className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-saint-gray group-hover:text-saint-blue transition-colors">
                        Nuestro Proceso
                      </h4>
                      <p className="text-sm text-gray-500">
                        C&oacute;mo trabajamos contigo
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="text-gray-400 group-hover:text-saint-blue group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </div>
              </Link>

              {/* Contacto */}
              <Link
                href="/contacto"
                className="group block p-4 rounded-xl border border-gray-200 hover:border-saint-green hover:bg-card-gradient transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-saint-gradient">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-saint-gray group-hover:text-saint-green transition-colors">
                        Contactar
                      </h4>
                      <p className="text-sm text-gray-500">
                        Comencemos tu proyecto
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="text-gray-400 group-hover:text-saint-green group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </div>
              </Link>
            </div>

            {/* Mensaje de ayuda adicional */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                ¿No encuentras lo que buscas?{' '}
                <Link
                  href="/contacto"
                  className="text-saint-green hover:text-saint-blue font-semibold underline decoration-2 underline-offset-2 transition-colors"
                >
                  Cont&aacute;ctanos
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-400">
            SaintGrove - Transformando ideas en soluciones digitales
          </p>
        </div>
      </div>
    </div>
  );
}
