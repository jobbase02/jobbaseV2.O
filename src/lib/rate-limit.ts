import 'server-only';

import { createHmac } from 'node:crypto';
import { supabaseAdmin } from '@/lib/supabase/client';

interface RateLimitConfig {
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  unavailable?: boolean;
}

interface RateLimitRow {
  success: boolean;
  remaining: number;
  reset_at: string;
}

/**
 * Uses the client address asserted by the edge proxy. The application must not
 * be reachable directly when TRUSTED_PROXY is enabled, otherwise forwarded-IP
 * headers can be forged by an attacker.
 */
function getTrustedClientIp(request: Request): string | null {
  if (process.env.TRUSTED_PROXY !== 'true') return null;

  const headers = request.headers;
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    null
  );
}

/**
 * Enforces an atomic, cross-instance rate limit through the private Supabase
 * RPC. It fails closed if the production security configuration is incomplete.
 */
// Local memory store for development rate limiting
const devRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function enforceRateLimit(
  request: Request,
  scope: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const clientIp = getTrustedClientIp(request);
  const secret = process.env.RATE_LIMIT_SECRET;

  if (!clientIp || !secret || !supabaseAdmin) {
    if (process.env.NODE_ENV === 'development') {
      // Bypass rate limit in development mode to allow unrestricted testing
      return { success: true, remaining: 999, resetAt: Date.now() + 60000 };
    }
    return { success: false, remaining: 0, resetAt: Date.now(), unavailable: true };
  }

  // Do not retain a raw IP address in the rate-limit table.
  const identifier = createHmac('sha256', secret)
    .update(`${scope}:${clientIp}`)
    .digest('base64url');

  const { data, error } = await supabaseAdmin.rpc('check_rate_limit', {
    p_identifier: identifier,
    p_limit: config.limit,
    p_window_seconds: config.windowSeconds,
  });

  const row = Array.isArray(data) ? data[0] as RateLimitRow | undefined : data as RateLimitRow | null;
  if (error || !row || typeof row.success !== 'boolean' || !row.reset_at) {
    console.error('[rate-limit] Supabase RPC failed:', error);
    return { success: false, remaining: 0, resetAt: Date.now(), unavailable: true };
  }

  const resetAt = new Date(row.reset_at).getTime();
  return {
    success: row.success,
    remaining: Math.max(0, Number(row.remaining) || 0),
    resetAt: Number.isFinite(resetAt) ? resetAt : Date.now(),
  };
}
