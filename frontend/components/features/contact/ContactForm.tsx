'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido').optional().or(z.literal('')),
  service: z.string().min(1, 'Por favor selecciona un servicio'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Send data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Handle rate limit error
      if (response.status === 429) {
        setErrorMessage('Has enviado demasiados mensajes. Por favor intenta de nuevo en 1 hora.');
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 8000);
        return;
      }

      // Handle validation errors
      if (response.status === 400) {
        setErrorMessage(result.error || 'Los datos enviados no son válidos.');
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 6000);
        return;
      }

      // Handle server errors
      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }

      // Success!
      console.log('[ContactForm] Email sent successfully:', result);
      setSubmitStatus('success');
      reset();

      // Reset status después de 5 segundos
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('[ContactForm] Error submitting form:', error);
      setErrorMessage('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-saint-gray mb-2">
          Nombre Completo *
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: true })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-saint-green`}
          placeholder="Juan Pérez"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-saint-gray mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email', { required: true })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-saint-green`}
          placeholder="juan@ejemplo.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-saint-gray mb-2">
          Teléfono (Opcional)
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-saint-green`}
          placeholder="+57 300 123 4567"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-saint-gray mb-2">
          Servicio de Interés *
        </label>
        <select
          id="service"
          {...register('service', { required: true })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.service ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-saint-green`}
        >
          <option value="">Selecciona un servicio</option>
          <option value="desarrollo-web">Desarrollo Web</option>
          <option value="software-medida">Software a Medida</option>
          <option value="branding">Creación de Marca</option>
          <option value="marketing">Campañas Publicitarias</option>
          <option value="consultoria">Consultoría</option>
          <option value="otro">Otro</option>
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-saint-gray mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          {...register('message', { required: true })}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-saint-green resize-none`}
          placeholder="Cuéntanos sobre tu proyecto..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={Send}
        iconPosition="right"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </Button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <CheckCircle2 size={20} />
          <p>¡Mensaje enviado exitosamente! Te contactaremos pronto.</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <AlertCircle size={20} />
          <p>{errorMessage || 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.'}</p>
        </div>
      )}
    </form>
  );
};
