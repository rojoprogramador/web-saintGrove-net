import { Metadata } from 'next';
import { Header, Footer, WhatsAppFloat, SocialBar } from '@/components/layout';
import { ContactForm } from '@/components/features/contact';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto - SaintGrove',
  description: 'Contáctanos para discutir tu proyecto. Ofrecemos consultas gratuitas para desarrollo web, software a medida, branding y marketing digital.',
};

export default function ContactoPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@saintgrove.net',
      link: 'mailto:info@saintgrove.net',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+57 322 674 0993',
      link: 'https://wa.me/573226740993',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Cali, Colombia',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun - Vie: 9:00 AM - 6:00 PM',
      link: '#',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-hero-gradient py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hablemos de tu Proyecto
              </h1>
              <p className="text-xl text-white/90">
                Estamos aquí para ayudarte a transformar tus ideas en realidad
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-bold text-saint-gray mb-6">
                    Envíanos un Mensaje
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Completa el formulario y te responderemos en menos de 24 horas
                  </p>
                  <ContactForm />
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-bold text-saint-gray mb-6">
                    Información de Contacto
                  </h2>
                  <p className="text-gray-600 mb-8">
                    También puedes contactarnos directamente a través de estos medios
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <a
                          key={index}
                          href={info.link}
                          className="flex items-start gap-4 p-4 bg-card-gradient rounded-lg border border-gray-200 hover:shadow-md transition-smooth"
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-saint-gradient flex items-center justify-center">
                            <Icon size={24} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-saint-gray mb-1">
                              {info.title}
                            </h3>
                            <p className="text-gray-600">{info.value}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Social Media */}
                  <div className="mt-12">
                    <h3 className="font-semibold text-saint-gray mb-4">
                      Síguenos en Redes Sociales
                    </h3>
                    <div className="flex gap-4">
                      {[
                        { name: 'Instagram', url: 'https://instagram.com/saintgrove' },
                        { name: 'LinkedIn', url: 'https://linkedin.com/company/saintgrove' },
                        { name: 'YouTube', url: 'https://youtube.com/@saintgrove' },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-saint-gradient hover:text-white hover:border-transparent transition-smooth"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-saint-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-saint-gray mb-12 text-center">
                Preguntas Frecuentes
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: '¿Cuánto tiempo toma un proyecto?',
                    answer: 'Los tiempos varían según la complejidad. Un sitio web puede tomar 4-8 semanas, mientras que software a medida puede requerir 8-16 semanas. Te daremos un estimado detallado después de la consulta inicial.',
                  },
                  {
                    question: '¿Cuál es el costo de sus servicios?',
                    answer: 'Cada proyecto es único. Después de entender tus necesidades, preparamos una propuesta personalizada con precios transparentes.',
                  },
                  {
                    question: '¿Ofrecen soporte después del lanzamiento?',
                    answer: 'Sí, todos nuestros proyectos incluyen un período de soporte post-lanzamiento. También ofrecemos planes de mantenimiento continuo.',
                  },
                  {
                    question: '¿Trabajan con clientes internacionales?',
                    answer: 'Absolutamente. Trabajamos con clientes en toda Latinoamérica y otros países. La comunicación puede ser 100% remota.',
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="text-lg font-bold text-saint-gray mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
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
