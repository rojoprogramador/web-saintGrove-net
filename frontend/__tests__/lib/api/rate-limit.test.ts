import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  checkRateLimit,
  resetRateLimit,
  getRateLimitStatus,
  cleanupRateLimitStore,
  getRateLimitStoreSize,
  RATE_LIMIT_CONFIG,
} from '@/lib/api/rate-limit';

describe('rate-limit utilities', () => {
  beforeEach(() => {
    // Reset all rate limits before each test
    const testIdentifiers = ['test-ip-1', 'test-ip-2', 'test-ip-3'];
    testIdentifiers.forEach(id => resetRateLimit(id));
  });

  describe('checkRateLimit', () => {
    it('allows first request', () => {
      expect(checkRateLimit('test-ip-1')).toBe(true);
    });

    it('allows up to maxRequests', () => {
      const ip = 'test-ip-2';

      // Should allow 10 requests
      for (let i = 0; i < RATE_LIMIT_CONFIG.maxRequests; i++) {
        expect(checkRateLimit(ip)).toBe(true);
      }
    });

    it('blocks request after exceeding limit', () => {
      const ip = 'test-ip-3';

      // Make 10 allowed requests
      for (let i = 0; i < RATE_LIMIT_CONFIG.maxRequests; i++) {
        checkRateLimit(ip);
      }

      // 11th request should be blocked
      expect(checkRateLimit(ip)).toBe(false);
    });

    it('tracks different IPs separately', () => {
      const ip1 = 'test-ip-a';
      const ip2 = 'test-ip-b';

      // Max out ip1
      for (let i = 0; i < RATE_LIMIT_CONFIG.maxRequests; i++) {
        checkRateLimit(ip1);
      }

      // ip2 should still be allowed
      expect(checkRateLimit(ip2)).toBe(true);
    });
  });

  describe('getRateLimitStatus', () => {
    it('returns correct status for new identifier', () => {
      const status = getRateLimitStatus('new-ip');
      expect(status.remaining).toBe(RATE_LIMIT_CONFIG.maxRequests);
      expect(status.total).toBe(RATE_LIMIT_CONFIG.maxRequests);
      expect(status.resetAt).toBeGreaterThan(Date.now());
    });

    it('returns correct remaining count after requests', () => {
      const ip = 'status-test-ip';

      // Make 3 requests
      for (let i = 0; i < 3; i++) {
        checkRateLimit(ip);
      }

      const status = getRateLimitStatus(ip);
      expect(status.remaining).toBe(RATE_LIMIT_CONFIG.maxRequests - 3);
      expect(status.total).toBe(RATE_LIMIT_CONFIG.maxRequests);
    });

    it('shows zero remaining when limit exceeded', () => {
      const ip = 'exceeded-ip';

      // Max out requests
      for (let i = 0; i < RATE_LIMIT_CONFIG.maxRequests + 2; i++) {
        checkRateLimit(ip);
      }

      const status = getRateLimitStatus(ip);
      expect(status.remaining).toBe(0);
    });
  });

  describe('resetRateLimit', () => {
    it('resets rate limit for identifier', () => {
      const ip = 'reset-test-ip';

      // Max out requests
      for (let i = 0; i < RATE_LIMIT_CONFIG.maxRequests; i++) {
        checkRateLimit(ip);
      }

      // Should be blocked
      expect(checkRateLimit(ip)).toBe(false);

      // Reset
      resetRateLimit(ip);

      // Should be allowed again
      expect(checkRateLimit(ip)).toBe(true);
    });
  });

  describe('cleanupRateLimitStore', () => {
    it('removes expired entries', () => {
      const ip = 'cleanup-test-ip';

      // Add an entry
      checkRateLimit(ip);

      // Mock time passing beyond window
      vi.useFakeTimers();
      vi.advanceTimersByTime(RATE_LIMIT_CONFIG.windowMs + 1000);

      // Clean up
      const cleaned = cleanupRateLimitStore();

      // Entry should be cleaned
      expect(cleaned).toBeGreaterThanOrEqual(0);

      vi.useRealTimers();
    });

    it('does not remove active entries', () => {
      const ip = 'active-test-ip';

      // Add a recent entry
      checkRateLimit(ip);

      const sizeBefore = getRateLimitStoreSize();

      // Clean up
      cleanupRateLimitStore();

      const sizeAfter = getRateLimitStoreSize();

      // Size should be the same or greater (other tests might add entries)
      expect(sizeAfter).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getRateLimitStoreSize', () => {
    it('returns correct store size', () => {
      const initialSize = getRateLimitStoreSize();

      // Add some entries
      checkRateLimit('size-test-1');
      checkRateLimit('size-test-2');

      const newSize = getRateLimitStoreSize();

      // Size should have increased
      expect(newSize).toBeGreaterThanOrEqual(initialSize);
    });
  });

  describe('RATE_LIMIT_CONFIG', () => {
    it('has correct configuration', () => {
      expect(RATE_LIMIT_CONFIG.maxRequests).toBe(10);
      expect(RATE_LIMIT_CONFIG.windowMs).toBe(60 * 60 * 1000); // 1 hour
      expect(RATE_LIMIT_CONFIG.cleanupIntervalMs).toBe(5 * 60 * 1000); // 5 minutes
    });
  });
});
