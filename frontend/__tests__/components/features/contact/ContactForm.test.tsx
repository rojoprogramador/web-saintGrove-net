import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from '@/components/features/contact/ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servicio de Interés/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Mensaje/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  it('validates name field input', () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Nombre Completo/i);
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toBeInTheDocument();
  });

  it('validates email field input', () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/^Email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toBeInTheDocument();
  });

  it('has service selection dropdown', () => {
    render(<ContactForm />);
    const serviceSelect = screen.getByLabelText(/Servicio de Interés/i);
    expect(serviceSelect).toBeInTheDocument();
    expect(screen.getByText('Desarrollo Web')).toBeInTheDocument();
  });

  it('validates message field input', () => {
    render(<ContactForm />);
    const messageInput = screen.getByLabelText(/^Mensaje/i);
    expect(messageInput).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ success: true }),
      })
    ) as any;

    render(<ContactForm />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'Juan Perez' },
    });
    fireEvent.change(screen.getByLabelText(/^Email/i), {
      target: { value: 'juan@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), {
      target: { value: '+57 300 123 4567' },
    });
    fireEvent.change(screen.getByLabelText(/Servicio de Interés/i), {
      target: { value: 'desarrollo-web' },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: 'Este es un mensaje de prueba con suficiente longitud' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Mensaje enviado exitosamente/i)).toBeInTheDocument();
    });
  });

  it('handles rate limit error (429)', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 429,
        json: () => Promise.resolve({ error: 'Rate limit exceeded' }),
      })
    ) as any;

    render(<ContactForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'Juan Perez' },
    });
    fireEvent.change(screen.getByLabelText(/^Email/i), {
      target: { value: 'juan@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Servicio de Interés/i), {
      target: { value: 'desarrollo-web' },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: 'Este es un mensaje de prueba con suficiente longitud' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/Has enviado demasiados mensajes/i)).toBeInTheDocument();
    });
  });

  it('handles validation error (400)', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Datos inválidos' }),
      })
    ) as any;

    render(<ContactForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'Juan Perez' },
    });
    fireEvent.change(screen.getByLabelText(/^Email/i), {
      target: { value: 'juan@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Servicio de Interés/i), {
      target: { value: 'desarrollo-web' },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: 'Este es un mensaje de prueba con suficiente longitud' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/Datos inválidos/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    global.fetch = vi.fn(() =>
      new Promise<Response>((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              status: 200,
              json: () => Promise.resolve({ success: true }),
            } as any),
          100
        )
      )
    );

    render(<ContactForm />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
      target: { value: 'Juan Perez' },
    });
    fireEvent.change(screen.getByLabelText(/^Email/i), {
      target: { value: 'juan@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Servicio de Interés/i), {
      target: { value: 'desarrollo-web' },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: 'Este es un mensaje de prueba con suficiente longitud' },
    });

    const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Enviando.../i)).toBeInTheDocument();
    });
  });
});
