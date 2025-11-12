'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Settings, Palette, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui';

export const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos, responsivos y optimizados para SEO',
      features: [
        'Diseño Responsivo',
        'Optimización SEO',
        'Velocidad Optimizada',
        'CMS Personalizado',
      ],
    },
    {
      icon: Settings,
      title: 'Software a Medida',
      description: 'Soluciones personalizadas que se adaptan a tu negocio',
      features: [
        'Análisis de Requisitos',
        'Arquitectura Escalable',
        'Integración API',
        'Soporte Continuo',
      ],
    },
    {
      icon: Palette,
      title: 'Creación de Marca',
      description: 'Identidad visual única que conecta con tu audiencia',
      features: [
        'Logo y Branding',
        'Guía de Estilo',
        'Material Gráfico',
        'Identidad Digital',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Campañas Publicitarias',
      description: 'Estrategias de marketing digital que maximizan tu ROI',
      features: [
        'Google Ads',
        'Facebook Ads',
        'SEO/SEM',
        'Analytics y Reportes',
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-saint-gray mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Soluciones completas para impulsar tu presencia digital
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                gradient={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
