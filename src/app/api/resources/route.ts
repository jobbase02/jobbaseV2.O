import { NextRequest, NextResponse } from 'next/server';
import { getResources } from '@/lib/supabase/client';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const ALLOWED_CATEGORIES = new Set([
  'All', 'Interview Roadmaps', 'PDF Cheatsheets', 'Resume Templates',
]);

export async function GET(req: NextRequest) {
  // ─── Rate Limiting ──────────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = rateLimit(`resources:${ip}`, { limit: 30, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const rawCategory = searchParams.get('category') || 'All';

    // Whitelist category values
    const category = ALLOWED_CATEGORIES.has(rawCategory) ? rawCategory : 'All';

    const resources = await getResources(category);

    return NextResponse.json(
      { resources, count: resources.length },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (_error) {
    console.error('[/api/resources] Error:', _error);
    return NextResponse.json(
      { error: 'Failed to fetch resources. Please try again.' },
      { status: 500 }
    );
  }
}
