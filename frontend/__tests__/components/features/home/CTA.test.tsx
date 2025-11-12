import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CTA } from '@/components/features/home/CTA';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('CTA Component', () => {
  it('renders the CTA section', () => {
    const { container } = render(<CTA />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<CTA />);
    expect(screen.getByText(/¿Listo para Transformar tu Negocio?/i)).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<CTA />);
    expect(screen.getByText(/Contáctanos hoy y descubre cómo podemos llevar tu empresa/i)).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<CTA />);
    expect(screen.getByText('Comenzar Ahora')).toBeInTheDocument();
  });

  it('has gradient background', () => {
    const { container } = render(<CTA />);
    const gradient = container.querySelector('.bg-hero-gradient');
    expect(gradient).toBeInTheDocument();
  });

  it('button has white background variant', () => {
    render(<CTA />);
    const button = screen.getByText('Comenzar Ahora');
    expect(button).toHaveClass('bg-white', 'text-saint-blue');
  });
});
