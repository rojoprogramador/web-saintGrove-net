import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from '@/components/ui/Logo';

describe('Logo Component', () => {
  it('renders the company name', () => {
    render(<Logo />);
    expect(screen.getByText(/SaintGrove/i)).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Logo size="sm" />);
    let logo = screen.getByText(/SaintGrove/i);
    expect(logo).toHaveClass('text-xl');

    rerender(<Logo size="md" />);
    logo = screen.getByText(/SaintGrove/i);
    expect(logo).toHaveClass('text-2xl');

    rerender(<Logo size="lg" />);
    logo = screen.getByText(/SaintGrove/i);
    expect(logo).toHaveClass('text-3xl');
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-logo" />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('custom-logo');
  });
});
