import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SocialBar } from '@/components/layout/SocialBar';

describe('SocialBar Component', () => {
  it('renders all social media links', () => {
    render(<SocialBar />);
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
  });

  it('has correct href attributes for social links', () => {
    render(<SocialBar />);
    const instagram = screen.getByLabelText('Instagram');
    const linkedin = screen.getByLabelText('LinkedIn');
    const youtube = screen.getByLabelText('YouTube');

    expect(instagram).toHaveAttribute('href', 'https://instagram.com/saintgrove');
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/company/saintgrove');
    expect(youtube).toHaveAttribute('href', 'https://youtube.com/@saintgrove');
  });

  it('opens links in new tab with security attributes', () => {
    render(<SocialBar />);
    const links = screen.getAllByRole('link');

    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('is only visible on desktop (hidden on mobile)', () => {
    const { container } = render(<SocialBar />);
    const socialBar = container.querySelector('.hidden.lg\\:flex');
    expect(socialBar).toBeInTheDocument();
  });

  it('is positioned fixed on the left side', () => {
    const { container } = render(<SocialBar />);
    const socialBar = container.querySelector('.fixed.left-0');
    expect(socialBar).toBeInTheDocument();
    expect(socialBar).toHaveClass('top-1/2', '-translate-y-1/2');
  });
});
