/**
 * Class name utility for combining tailwind classes
 * Prevents conflicts and merges class names properly
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
