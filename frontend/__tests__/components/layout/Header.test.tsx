import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '@/components/layout/Header';

describe('Header Component', () => {
  it('renders the header', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders the SaintGrove logo', () => {
    render(<Header />);
    expect(screen.getByText(/SaintGrove/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText(/Servicios/i)).toBeInTheDocument();
    expect(screen.getByText(/Proceso/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

  it('applies sticky positioning', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });
});
