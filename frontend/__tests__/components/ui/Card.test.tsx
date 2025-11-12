import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '@/components/ui/Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card title="Test Card" description="Test description">
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(
      <Card title="Test" description="Test description" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-xl');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card title="Test" description="Test description" className="custom-card" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-card');
  });

  it('renders with shadow by default', () => {
    const { container } = render(
      <Card title="Test" description="Test description" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:shadow-lg');
  });
});
