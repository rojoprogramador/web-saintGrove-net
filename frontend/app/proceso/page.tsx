'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Footer, WhatsAppFloat, SocialBar } from '@/components/layout';
import {
  MessageSquare,
  Pencil,
  Code2,
  Rocket,
  Users,
  Target,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui';

export default function ProcesoPage() {
  const mainSteps = [
    {
      number: 1,
      icon: MessageSquare,
      title: 'Consulta Inicial',
      description: 'Analizamos tus necesidades, objetivos y el alcance del proyecto.',
      details: [
        'Reunión de descubrimiento',
        'Análisis de requerimientos',
        'Definición de objetivos',
        'Propuesta inicial',
      ],
    },
    {
      number: 2,
      icon: Pencil,
      title: 'Diseño y Planificación',
      description: 'Creamos prototipos y wireframes detallados antes de desarrollar.',
      details: [
        'Arquitectura de información',
        'Diseño UI/UX',
        'Prototipos interactivos',
        'Plan de proyecto',
      ],
    },
    {
      number: 3,
      icon: Code2,
      title: 'Desarrollo',
      description: 'Implementamos usando las últimas tecnologías y mejores prácticas.',
      details: [
        'Desarrollo ágil',
        'Revisiones periódicas',
        'Testing continuo',
        'Integración de feedback',
      ],
    },
    {
      number: 4,
      icon: Rocket,
      title: 'Lanzamiento y Soporte',
      description: 'Desplegamos tu proyecto y brindamos soporte continuo.',
      details: [
        'Deploy profesional',
        'Capacitación',
        'Documentación',
        'Soporte técnico',
      ],
    },
  ];

  const principles = [
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabajamos contigo como un equipo, manteniendo comunicación constante.',
    },
    {
      icon: Target,
      title: 'Orientado a Resultados',
      description: 'Nos enfocamos en cumplir tus objetivos de negocio, no solo en entregar código.',
    },
    {
      icon: Zap,
      title: 'Agilidad',
      description: 'Metodologías ágiles que permiten adaptarnos rápidamente a cambios.',
    },
    {
      icon: Shield,
      title: 'Calidad',
      description: 'Testing exhaustivo y revisiones de código para garantizar excelencia.',
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
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Nuestro Proceso de Trabajo
              </motion.h1>
              <motion.p
                className="text-xl text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Una metodología probada para entregar proyectos exitosos
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Process Steps */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-16">
                {mainSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={index}
                      className={`flex flex-col ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      } gap-8 items-center`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {/* Icon and Number */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full bg-saint-gradient flex items-center justify-center">
                            <Icon size={48} className="text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-saint-blue text-white flex items-center justify-center text-xl font-bold border-4 border-white">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-saint-gray mb-4">
                          {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-6">
                          {step.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-saint-green mr-2">✓</span>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-20 bg-saint-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-saint-gray mb-12 text-center">
                Nuestros Principios
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {principles.map((principle, index) => {
                  const Icon = principle.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="inline-flex p-3 rounded-lg bg-card-gradient mb-4">
                        <Icon size={32} className="text-saint-green" />
                      </div>
                      <h3 className="text-xl font-bold text-saint-gray mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600">{principle.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-saint-gray mb-12 text-center">
                Tiempos Estimados
              </h2>

              <div className="space-y-6">
                {[
                  { service: 'Desarrollo Web', time: '4-8 semanas' },
                  { service: 'Software a Medida', time: '8-16 semanas' },
                  { service: 'Branding Completo', time: '3-6 semanas' },
                  { service: 'Campaña Publicitaria', time: '2-4 semanas setup + mantenimiento' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-6 bg-card-gradient rounded-lg border border-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <span className="text-lg font-semibold text-saint-gray">
                      {item.service}
                    </span>
                    <span className="text-saint-green font-bold">{item.time}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-gray-600 mt-8">
                *Los tiempos son estimados y pueden variar según la complejidad del proyecto
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para Comenzar tu Proyecto?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Conversemos sobre tus necesidades y cómo podemos ayudarte
              </p>
              <Link href="/contacto">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-white text-saint-blue hover:bg-gray-100"
                >
                  Solicitar Consulta Gratuita
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
