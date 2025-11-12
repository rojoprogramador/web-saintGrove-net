/**
 * Format utilities for strings, numbers, dates, etc.
 */

/**
 * Format currency value
 * @param amount - The numeric amount
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format phone number for display
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as Colombian phone number if applicable
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Capitalize first letter of string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert slug to title case
 * @param slug - Slug string (e.g., "desarrollo-web")
 * @returns Title case string (e.g., "Desarrollo Web")
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}
