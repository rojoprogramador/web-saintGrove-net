/**
 * Validation utilities for common patterns
 */

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Colombian phone number
 * @param phone - Phone number to validate
 * @returns True if valid Colombian phone format
 */
export function isValidColombianPhone(phone: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Colombian numbers are typically 10 digits
  // Mobile numbers start with 3
  return cleaned.length === 10 && cleaned.startsWith('3');
}

/**
 * Validate URL format
 * @param url - URL string to validate
 * @returns True if valid URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize string input (basic XSS prevention)
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
