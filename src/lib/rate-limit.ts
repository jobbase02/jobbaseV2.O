/**
 * Lightweight in-memory rate limiter for API routes.
 * Uses a sliding window approach with per-IP tracking.
 * No external dependencies needed.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Global store — persists across requests in the same Node.js process
const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request from `identifier` (e.g. IP address) is within rate limits.
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { limit, windowSeconds } = config;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const key = identifier;

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // New window
    const newEntry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    store.set(key, newEntry);
    return { success: true, remaining: limit - 1, resetAt: newEntry.resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/**
 * Get client IP from Next.js request headers.
 * Handles proxies, Vercel, Cloudflare, etc.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get('cf-connecting-ip') ||         // Cloudflare
    headers.get('x-real-ip') ||                 // Nginx proxy
    headers.get('x-forwarded-for')?.split(',')[0].trim() || // Load balancer
    '127.0.0.1'
  );
}
