import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidColombianPhone,
  isValidURL,
  sanitizeInput,
} from '@/lib/utils/validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('missing@')).toBe(false);
      expect(isValidEmail('@missing.com')).toBe(false);
      expect(isValidEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('isValidColombianPhone', () => {
    it('validates correct Colombian mobile number', () => {
      expect(isValidColombianPhone('3001234567')).toBe(true);
      expect(isValidColombianPhone('3112345678')).toBe(true);
    });

    it('validates formatted Colombian number', () => {
      const phone1 = '+57 300 123 4567';
      const phone2 = '300-123-4567';
      // These will clean to 10 digits starting with 3
      expect(isValidColombianPhone(phone1)).toBe(phone1.replace(/\D/g, '').length === 10 && phone1.replace(/\D/g, '').startsWith('3'));
      expect(isValidColombianPhone(phone2)).toBe(true);
    });

    it('rejects invalid Colombian numbers', () => {
      expect(isValidColombianPhone('2001234567')).toBe(false); // Doesn't start with 3
      expect(isValidColombianPhone('30012345')).toBe(false); // Too short
      expect(isValidColombianPhone('300123456789')).toBe(false); // Too long
    });
  });

  describe('isValidURL', () => {
    it('validates correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://example.com')).toBe(true);
      expect(isValidURL('https://example.com/path?query=value')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidURL('not a url')).toBe(false);
      expect(isValidURL('missing-protocol.com')).toBe(false);
      expect(isValidURL('')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('escapes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      );
    });

    it('escapes quotes', () => {
      expect(sanitizeInput('This is a "quote"')).toBe('This is a &quot;quote&quot;');
      expect(sanitizeInput("This is a 'quote'")).toBe('This is a &#x27;quote&#x27;');
    });

    it('handles multiple special characters', () => {
      const input = '<div class="test">Hello</div>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
      expect(result).not.toContain('"');
    });

    it('handles empty string', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('preserves safe text', () => {
      expect(sanitizeInput('Hello World 123')).toBe('Hello World 123');
    });
  });
});
