import Link from 'next/link';
import { Metadata } from 'next';
import { Header, Footer, WhatsAppFloat, SocialBar } from '@/components/layout';
import { Code, Settings, Palette, TrendingUp, ArrowRight } from 'lucide-react';
import { servicesData } from '@/lib/data/fallback';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Nuestros Servicios - SaintGrove',
  description: 'Descubre todos nuestros servicios de desarrollo web, software a medida, branding y marketing digital en Cali, Colombia.',
};

const iconMap: { [key: string]: any } = {
  Code,
  Settings,
  Palette,
  TrendingUp,
};

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-hero-gradient py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Nuestros Servicios
              </h1>
              <p className="text-xl text-white/90">
                Soluciones digitales completas para impulsar tu negocio
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.map((service) => {
                const Icon = iconMap[service.icon];
                return (
                  <div
                    key={service.slug}
                    className="bg-card-gradient border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-smooth"
                  >
                    {/* Icon */}
                    <div className="inline-flex p-4 rounded-lg bg-saint-gradient mb-6">
                      <Icon size={32} className="text-white" />
                    </div>

                    {/* Content */}
                    <h2 className="text-2xl font-bold text-saint-gray mb-4">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {service.fullDescription}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <span className="text-saint-green mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href={`/servicios/${service.slug}`}>
                      <Button variant="outline" icon={ArrowRight} iconPosition="right">
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-saint-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-saint-gray mb-6">
                ¿No sabes qué servicio necesitas?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Contáctanos y te ayudaremos a encontrar la solución perfecta para tu negocio
              </p>
              <Link href="/contacto">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Hablemos de tu Proyecto
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <SocialBar />
    </>
  );
}
