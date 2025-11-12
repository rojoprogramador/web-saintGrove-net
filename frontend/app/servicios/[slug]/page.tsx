import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer, WhatsAppFloat, SocialBar } from '@/components/layout';
import { Code, Settings, Palette, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/data/fallback';
import { Button } from '@/components/ui';

const iconMap: { [key: string]: any } = {
  Code,
  Settings,
  Palette,
  TrendingUp,
};

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado - SaintGrove',
    };
  }

  return {
    title: `${service.name} - SaintGrove`,
    description: service.fullDescription,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-hero-gradient py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex p-4 rounded-lg bg-white/10 mb-6">
                <Icon size={48} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.name}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {service.fullDescription}
              </p>
              {service.pricing && (
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-sm text-white/80">Desde</p>
                  <p className="text-3xl font-bold">
                    ${service.pricing.from} {service.pricing.currency}
                  </p>
                  <p className="text-sm text-white/80">por {service.pricing.period}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-saint-gray mb-8">
                ¿Qué incluye?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 size={24} className="text-saint-green mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-saint-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-saint-gray mb-8">
                Beneficios para tu Negocio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-saint-gray mb-12 text-center">
                Nuestro Proceso
              </h2>
              <div className="space-y-8">
                {service.process.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-saint-gradient text-white flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-saint-gray mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        {service.technologies && service.technologies.length > 0 && (
          <section className="py-20 bg-saint-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-saint-gray mb-8 text-center">
                  Tecnologías que Utilizamos
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-white rounded-full border border-gray-200 text-saint-gray font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para Comenzar?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos
              </p>
              <Link href={service.cta.link}>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-white text-saint-blue hover:bg-gray-100"
                >
                  {service.cta.text}
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
