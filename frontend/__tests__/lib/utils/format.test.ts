import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPhone, truncate, capitalize, slugToTitle } from '@/lib/utils/format';

describe('format utilities', () => {
  describe('formatCurrency', () => {
    it('formats USD currency', () => {
      const result = formatCurrency(1000, 'USD');
      expect(result).toContain('1');
      expect(result).toContain('000');
    });

    it('formats COP currency', () => {
      const result = formatCurrency(50000, 'COP');
      expect(result).toContain('50');
      expect(result).toContain('000');
    });

    it('handles zero amount', () => {
      const result = formatCurrency(0, 'USD');
      expect(result).toContain('0');
    });

    it('handles negative amounts', () => {
      const result = formatCurrency(-100, 'USD');
      expect(result).toContain('100');
    });
  });

  describe('formatPhone', () => {
    it('formats 10-digit phone number', () => {
      expect(formatPhone('3001234567')).toBe('(300) 123-4567');
    });

    it('handles already formatted phone', () => {
      const result = formatPhone('+57 300 123 4567');
      expect(result).toContain('300');
    });

    it('returns original if not 10 digits', () => {
      expect(formatPhone('12345')).toBe('12345');
    });

    it('removes non-numeric characters before formatting', () => {
      expect(formatPhone('300-123-4567')).toBe('(300) 123-4567');
    });
  });

  describe('truncate', () => {
    it('truncates text longer than maxLength', () => {
      expect(truncate('This is a very long text', 10)).toBe('This is a...');
    });

    it('does not truncate text shorter than maxLength', () => {
      expect(truncate('Short', 10)).toBe('Short');
    });

    it('handles exact length', () => {
      expect(truncate('Exact', 5)).toBe('Exact');
    });

    it('trims whitespace before adding ellipsis', () => {
      expect(truncate('Hello     World', 7)).toBe('Hello...');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('lowercases rest of string', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('h')).toBe('H');
    });
  });

  describe('slugToTitle', () => {
    it('converts slug to title case', () => {
      expect(slugToTitle('desarrollo-web')).toBe('Desarrollo Web');
    });

    it('handles multiple words', () => {
      expect(slugToTitle('software-a-medida')).toBe('Software A Medida');
    });

    it('handles single word', () => {
      expect(slugToTitle('branding')).toBe('Branding');
    });

    it('handles empty string', () => {
      expect(slugToTitle('')).toBe('');
    });
  });
});
