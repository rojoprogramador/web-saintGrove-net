'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Pencil, Code2, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: MessageSquare,
      title: 'Consulta Inicial',
      description: 'Análisis de necesidades y objetivos de tu proyecto',
    },
    {
      number: 2,
      icon: Pencil,
      title: 'Diseño y Planificación',
      description: 'Creación de prototipos y wireframes detallados',
    },
    {
      number: 3,
      icon: Code2,
      title: 'Desarrollo',
      description: 'Implementación con las últimas tecnologías',
    },
    {
      number: 4,
      icon: Rocket,
      title: 'Lanzamiento y Soporte',
      description: 'Deploy profesional y soporte continuo',
    },
  ];

  return (
    <section className="py-20 bg-saint-light">
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
            Nuestro Proceso
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Un enfoque estructurado para garantizar el éxito de tu proyecto
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Connecting Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-saint-green to-saint-blue opacity-30 -z-10" />
                )}

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-smooth text-center">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-saint-gradient text-white font-bold text-lg mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card-gradient mb-4">
                    <Icon size={32} className="text-saint-green" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-saint-gray mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
