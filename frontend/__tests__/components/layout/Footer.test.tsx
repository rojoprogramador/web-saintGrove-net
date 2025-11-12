import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the footer', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the company description', () => {
    render(<Footer />);
    expect(screen.getByText(/Transformamos ideas en soluciones digitales/i)).toBeInTheDocument();
  });

  it('renders all service links', () => {
    render(<Footer />);
    expect(screen.getByText('Desarrollo Web')).toBeInTheDocument();
    expect(screen.getByText('Software a Medida')).toBeInTheDocument();
    expect(screen.getByText('Creación de Marca')).toBeInTheDocument();
    expect(screen.getByText('Campañas Publicitarias')).toBeInTheDocument();
  });

  it('renders company section links', () => {
    render(<Footer />);
    expect(screen.getByText('Acerca de Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Carreras')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('info@saintgrove.net')).toBeInTheDocument();
    expect(screen.getByText('+57 322 674 0993')).toBeInTheDocument();
    expect(screen.getByText('Cali, Colombia')).toBeInTheDocument();
  });

  it('renders social media links with correct aria-labels', () => {
    render(<Footer />);
    const instagramLink = screen.getByLabelText('Instagram');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const youtubeLink = screen.getByLabelText('YouTube');

    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/saintgrove');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/saintgrove');
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/@saintgrove');
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} SaintGrove`))).toBeInTheDocument();
  });

  it('has proper external link attributes', () => {
    render(<Footer />);
    const whatsappLink = screen.getByText('+57 322 674 0993');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
