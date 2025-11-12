import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ServicesGrid } from '@/components/features/services/ServicesGrid';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ServicesGrid Component', () => {
  it('renders the services section', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
  });

  it('displays section description', () => {
    render(<ServicesGrid />);
    expect(screen.getByText(/Soluciones completas para impulsar tu presencia digital/i)).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('Desarrollo Web')).toBeInTheDocument();
    expect(screen.getByText('Software a Medida')).toBeInTheDocument();
    expect(screen.getByText('Creación de Marca')).toBeInTheDocument();
    expect(screen.getByText('Campañas Publicitarias')).toBeInTheDocument();
  });

  it('displays service descriptions', () => {
    render(<ServicesGrid />);
    expect(screen.getByText(/Sitios web modernos, responsivos y optimizados/i)).toBeInTheDocument();
    expect(screen.getByText(/Soluciones personalizadas que se adaptan/i)).toBeInTheDocument();
    expect(screen.getByText(/Identidad visual única que conecta/i)).toBeInTheDocument();
    expect(screen.getByText(/Estrategias de marketing digital/i)).toBeInTheDocument();
  });

  it('displays service features for Desarrollo Web', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('Diseño Responsivo')).toBeInTheDocument();
    expect(screen.getByText('Optimización SEO')).toBeInTheDocument();
    expect(screen.getByText('Velocidad Optimizada')).toBeInTheDocument();
    expect(screen.getByText('CMS Personalizado')).toBeInTheDocument();
  });

  it('displays service features for Software a Medida', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('Análisis de Requisitos')).toBeInTheDocument();
    expect(screen.getByText('Arquitectura Escalable')).toBeInTheDocument();
    expect(screen.getByText('Integración API')).toBeInTheDocument();
    expect(screen.getByText('Soporte Continuo')).toBeInTheDocument();
  });

  it('has white background', () => {
    const { container } = render(<ServicesGrid />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-white');
  });
});
