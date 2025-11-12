import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Process } from '@/components/features/home/Process';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Process Component', () => {
  it('renders the process section', () => {
    render(<Process />);
    expect(screen.getByText('Nuestro Proceso')).toBeInTheDocument();
  });

  it('displays section description', () => {
    render(<Process />);
    expect(screen.getByText(/Un enfoque estructurado para garantizar el éxito de tu proyecto/i)).toBeInTheDocument();
  });

  it('renders all four process steps', () => {
    render(<Process />);
    expect(screen.getByText('Consulta Inicial')).toBeInTheDocument();
    expect(screen.getByText('Diseño y Planificación')).toBeInTheDocument();
    expect(screen.getByText('Desarrollo')).toBeInTheDocument();
    expect(screen.getByText('Lanzamiento y Soporte')).toBeInTheDocument();
  });

  it('displays step descriptions', () => {
    render(<Process />);
    expect(screen.getByText(/Análisis de necesidades y objetivos/i)).toBeInTheDocument();
    expect(screen.getByText(/Creación de prototipos y wireframes/i)).toBeInTheDocument();
    expect(screen.getByText(/Implementación con las últimas tecnologías/i)).toBeInTheDocument();
    expect(screen.getByText(/Deploy profesional y soporte continuo/i)).toBeInTheDocument();
  });

  it('displays step numbers', () => {
    render(<Process />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('has proper background styling', () => {
    const { container } = render(<Process />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-saint-light');
  });
});
