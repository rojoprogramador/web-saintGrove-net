import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

/**
 * Custom render function that includes common providers
 * Extend this as needed when adding context providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

/**
 * Mock data for testing
 */
export const mockServiceData = {
  id: 1,
  title: 'Test Service',
  description: 'Test description',
  icon: 'Globe',
  features: ['Feature 1', 'Feature 2'],
};

export const mockProjectData = {
  id: 1,
  title: 'Test Project',
  description: 'Test project description',
  imageUrl: '/test-image.jpg',
  technologies: ['React', 'TypeScript'],
};

/**
 * Helper to wait for async operations
 */
export const waitFor = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Helper to create mock form data
 */
export const createMockFormData = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'Test message',
  ...overrides,
});
