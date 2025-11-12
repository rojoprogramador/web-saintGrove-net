/**
 * Simple in-memory rate limiter for API endpoints
 * Implements a sliding window algorithm
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
  requests: number[]; // timestamps of requests
}

// Store rate limit data in memory (per IP)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limit configuration
 */
export const RATE_LIMIT_CONFIG = {
  maxRequests: 10, // Maximum number of requests
  windowMs: 60 * 60 * 1000, // Time window: 1 hour in milliseconds
  cleanupIntervalMs: 5 * 60 * 1000, // Cleanup old entries every 5 minutes
} as const;

/**
 * Check if an IP has exceeded the rate limit
 * @param identifier - IP address or unique identifier
 * @returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No previous requests - allow
  if (!entry) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_CONFIG.windowMs,
      requests: [now],
    });
    return true;
  }

  // Filter out requests outside the current window (sliding window)
  const validRequests = entry.requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_CONFIG.windowMs
  );

  // Check if limit exceeded
  if (validRequests.length >= RATE_LIMIT_CONFIG.maxRequests) {
    console.warn(
      `[RateLimit] IP ${identifier} exceeded rate limit: ${validRequests.length}/${RATE_LIMIT_CONFIG.maxRequests}`
    );
    return false;
  }

  // Update entry with new request
  validRequests.push(now);
  rateLimitStore.set(identifier, {
    count: validRequests.length,
    resetAt: now + RATE_LIMIT_CONFIG.windowMs,
    requests: validRequests,
  });

  return true;
}

/**
 * Get rate limit status for an identifier
 * @param identifier - IP address or unique identifier
 * @returns Rate limit status information
 */
export function getRateLimitStatus(identifier: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    return {
      remaining: RATE_LIMIT_CONFIG.maxRequests,
      resetAt: now + RATE_LIMIT_CONFIG.windowMs,
      total: RATE_LIMIT_CONFIG.maxRequests,
    };
  }

  // Count valid requests in current window
  const validRequests = entry.requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_CONFIG.windowMs
  );

  return {
    remaining: Math.max(0, RATE_LIMIT_CONFIG.maxRequests - validRequests.length),
    resetAt: entry.resetAt,
    total: RATE_LIMIT_CONFIG.maxRequests,
  };
}

/**
 * Reset rate limit for an identifier
 * Useful for testing or manual overrides
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
  console.log(`[RateLimit] Reset rate limit for: ${identifier}`);
}

/**
 * Clean up old entries from the rate limit store
 * Automatically removes entries that are past their reset time
 */
export function cleanupRateLimitStore(): number {
  const now = Date.now();
  let cleaned = 0;

  rateLimitStore.forEach((entry, identifier) => {
    // Remove entries where all requests are outside the window
    const validRequests = entry.requests.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_CONFIG.windowMs
    );

    if (validRequests.length === 0) {
      rateLimitStore.delete(identifier);
      cleaned++;
    }
  });

  if (cleaned > 0) {
    console.log(`[RateLimit] Cleaned up ${cleaned} expired entries`);
  }

  return cleaned;
}

/**
 * Get total number of tracked identifiers
 */
export function getRateLimitStoreSize(): number {
  return rateLimitStore.size;
}

// Auto-cleanup: Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, RATE_LIMIT_CONFIG.cleanupIntervalMs);
}
