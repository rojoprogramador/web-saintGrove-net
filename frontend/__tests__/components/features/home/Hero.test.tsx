import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from '@/components/features/home/Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Hero Component', () => {
  it('renders the hero section', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Transformamos Ideas en/i)).toBeInTheDocument();
    expect(screen.getByText(/Soluciones Digitales/i)).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Especialistas en desarrollo web, software a medida/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Comenzar Proyecto')).toBeInTheDocument();
    expect(screen.getByText('Ver Portfolio')).toBeInTheDocument();
  });

  it('displays statistics', () => {
    render(<Hero />);
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Proyectos Completados')).toBeInTheDocument();

    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('Clientes Satisfechos')).toBeInTheDocument();

    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('Años de Experiencia')).toBeInTheDocument();
  });

  it('has animated background elements', () => {
    const { container } = render(<Hero />);
    const backgroundGradient = container.querySelector('.bg-hero-gradient');
    expect(backgroundGradient).toBeInTheDocument();
  });
});
