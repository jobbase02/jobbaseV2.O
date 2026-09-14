import { NextRequest, NextResponse } from 'next/server';
import { getJobs } from '@/lib/sanity/client';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

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
  const ip = getClientIp(req);
  const rl = rateLimit(`jobs:${ip}`, { limit: 60, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
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

    // ─── Data Fetching ────────────────────────────────────────────────────────
    const jobs = await getJobs({ opportunityType, batch, experience, domain, workMode, location, qualification, keywords });

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

    // ─── Response with Caching Headers ───────────────────────────────────────
    return NextResponse.json(
      { jobs: result, count: result.length },
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
