import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

describe('WhatsAppFloat Component', () => {
  it('renders the WhatsApp button', () => {
    render(<WhatsAppFloat />);
    const button = screen.getByLabelText('Contact us on WhatsApp');
    expect(button).toBeInTheDocument();
  });

  it('has correct WhatsApp URL with message', () => {
    render(<WhatsAppFloat />);
    const link = screen.getByLabelText('Contact us on WhatsApp');
    const expectedUrl = 'https://wa.me/573226740993?text=Hola!%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.';
    expect(link).toHaveAttribute('href', expectedUrl);
  });

  it('opens in new tab with security attributes', () => {
    render(<WhatsAppFloat />);
    const link = screen.getByLabelText('Contact us on WhatsApp');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows tooltip on mouse enter', () => {
    render(<WhatsAppFloat />);
    const button = screen.getByLabelText('Contact us on WhatsApp');

    // Show tooltip on hover
    fireEvent.mouseEnter(button);
    expect(screen.getByText(/Chatea con nosotros/i)).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(<WhatsAppFloat />);
    const button = screen.getByLabelText('Contact us on WhatsApp');

    // Show tooltip
    fireEvent.mouseEnter(button);
    expect(screen.getByText(/¿Necesitas ayuda?/i)).toBeInTheDocument();

    // Hide tooltip on leave
    fireEvent.mouseLeave(button);
    expect(screen.queryByText(/¿Necesitas ayuda?/i)).not.toBeInTheDocument();
  });

  it('can close tooltip with close button', () => {
    render(<WhatsAppFloat />);
    const button = screen.getByLabelText('Contact us on WhatsApp');

    // Show tooltip
    fireEvent.mouseEnter(button);
    expect(screen.getByText(/¿Necesitas ayuda?/i)).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByLabelText('Close tooltip');
    fireEvent.click(closeButton);

    expect(screen.queryByText(/¿Necesitas ayuda?/i)).not.toBeInTheDocument();
  });

  it('is positioned fixed at bottom right', () => {
    const { container } = render(<WhatsAppFloat />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('fixed', 'bottom-6', 'right-6', 'z-50');
  });
});
