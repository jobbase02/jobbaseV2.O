import { NextRequest, NextResponse } from 'next/server';
import { getJobs } from '@/lib/sanity/client';
import { enforceRateLimit } from '@/lib/rate-limit';

// Allowed filter values — whitelist to prevent unexpected input
const ALLOWED_OPPORTUNITY_TYPES = new Set(['All', 'Full-Time', 'Internship']);
const ALLOWED_WORK_MODES = new Set(['All', 'Remote', 'Hybrid', 'Onsite']);
const ALLOWED_EXPERIENCES = new Set(['All', 'Fresher', '1-3 YOE', '3+ YOE']);
const ALLOWED_BATCHES = new Set(['All', '2021', '2022', '2023', '2024', '2025', '2026', '2027']);
const ALLOWED_LOCATIONS = new Set(['All', 'Bangalore', 'Remote', 'Hyderabad', 'Gurugram', 'Coimbatore', 'Mumbai', 'Pune', 'Delhi', 'Noida']);
const ALLOWED_QUALIFICATIONS = new Set(['All', 'B.Tech / B.E', 'M.Tech / M.E', 'BCA / MCA', 'B.Sc / M.Sc', 'Any Graduate']);
const ALLOWED_DOMAINS = new Set(['All', 'IT/Software', 'Non-IT', 'Core', 'Design', 'Product']);

function sanitizeEnum<T extends string>(value: string | null, allowed: Set<string>, fallback: T): T {
  if (!value) return fallback;
  return allowed.has(value) ? (value as T) : fallback;
}

export async function GET(req: NextRequest) {
  // ─── Rate Limiting ──────────────────────────────────────────────────────────
  const rl = await enforceRateLimit(req, 'jobs', { limit: 60, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: rl.unavailable ? 'Service temporarily unavailable.' : 'Too many requests. Please slow down.' },
      {
        status: rl.unavailable ? 503 : 429,
        headers: {
          ...(rl.unavailable ? {} : { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) }),
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    const { searchParams } = new URL(req.url);

    // ─── Input Validation & Whitelisting ────────────────────────────────────
    const opportunityType = sanitizeEnum(searchParams.get('opportunityType'), ALLOWED_OPPORTUNITY_TYPES, 'All');
    const batch = sanitizeEnum(searchParams.get('batch'), ALLOWED_BATCHES, 'All');
    const experience = sanitizeEnum(searchParams.get('experience'), ALLOWED_EXPERIENCES, 'All');
    const domain = sanitizeEnum(searchParams.get('domain'), ALLOWED_DOMAINS, 'All');
    const workMode = sanitizeEnum(searchParams.get('workMode'), ALLOWED_WORK_MODES, 'All');
    const location = sanitizeEnum(searchParams.get('location'), ALLOWED_LOCATIONS, 'All');
    const qualification = sanitizeEnum(searchParams.get('qualification'), ALLOWED_QUALIFICATIONS, 'All');

    // Keywords: limit count and length to prevent abuse
    const keywordsParam = searchParams.get('keywords');
    const keywords = keywordsParam
      ? keywordsParam
          .split(',')
          .slice(0, 10)                       // Max 10 keywords
          .map((k) => k.trim().slice(0, 50))  // Max 50 chars per keyword
          .filter((k) => k.length > 0)
      : undefined;

    const requestedLimit = Number.parseInt(searchParams.get('limit') || '12', 10);
    const requestedOffset = Number.parseInt(searchParams.get('offset') || '0', 10);
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 24) : 12;
    const offset = Number.isFinite(requestedOffset) ? Math.min(Math.max(requestedOffset, 0), 1000) : 0;

    // ─── Data Fetching ────────────────────────────────────────────────────────
    const jobs = await getJobs({
      opportunityType,
      batch,
      experience,
      domain,
      workMode,
      location,
      qualification,
      keywords,
      limit: keywords?.length ? undefined : limit + 1,
      offset: keywords?.length ? undefined : offset,
    });

    // ─── Relevance Scoring (only for keyword searches) ────────────────────────
    let result = jobs;
    if (keywords && keywords.length > 0 && jobs.length > 0) {
      const tokens = keywords.map((k) => k.toLowerCase());

      result = jobs
        .map((j) => {
          let score = 0;
          const companyLow = (j.company || '').toLowerCase();
          const titleLow = (j.title || '').toLowerCase();
          const locationLow = (j.location || '').toLowerCase();

          tokens.forEach((t) => {
            if (companyLow.includes(t)) score += 10;
            if (titleLow.includes(t)) score += 8;
            if (locationLow.includes(t)) score += 5;
            if (j.qualification?.some((q) => q.toLowerCase().includes(t))) score += 4;
            if (j.eligibleBatches?.some((b) => b.includes(t))) score += 4;
          });

          return { job: j, score };
        })
        .sort((a, b) => b.score - a.score)
        .map((x) => x.job);
    }

    const page = keywords?.length ? result.slice(offset, offset + limit + 1) : result;
    const hasMore = page.length > limit;
    const pagedResult = hasMore ? page.slice(0, limit) : page;

    // ─── Response with Caching Headers ───────────────────────────────────────
    return NextResponse.json(
      { jobs: pagedResult, count: pagedResult.length, hasMore },
      {
        headers: {
          // Cache for 60 seconds at CDN/browser, serve stale for 5 min while revalidating
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': String(rl.remaining),
        },
      }
    );
  } catch (_error) {
    // ⚠️ Never leak internal error details to clients
    console.error('[/api/jobs] Unhandled error:', _error);
    return NextResponse.json(
      { error: 'An error occurred while fetching jobs. Please try again.' },
      { status: 500 }
    );
  }
}
