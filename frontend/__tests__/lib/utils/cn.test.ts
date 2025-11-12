import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils/cn';

describe('cn utility', () => {
  it('combines multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('filters out falsy values', () => {
    expect(cn('class1', null, 'class2', undefined, false, 'class3')).toBe('class1 class2 class3');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles only falsy values', () => {
    expect(cn(null, undefined, false)).toBe('');
  });

  it('handles single class name', () => {
    expect(cn('single-class')).toBe('single-class');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
  });
});
