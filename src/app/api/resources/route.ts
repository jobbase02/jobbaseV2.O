import { NextRequest, NextResponse } from 'next/server';
import { getResources } from '@/lib/supabase/client';
import { enforceRateLimit } from '@/lib/rate-limit';

const ALLOWED_CATEGORIES = new Set([
  'All', 'Interview Roadmaps', 'PDF Cheatsheets', 'Resume Templates',
]);

export async function GET(req: NextRequest) {
  // ─── Rate Limiting ──────────────────────────────────────────────────────────
  const rl = await enforceRateLimit(req, 'resources', { limit: 30, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: rl.unavailable ? 'Service temporarily unavailable.' : 'Too many requests. Please slow down.' },
      { status: rl.unavailable ? 503 : 429, headers: rl.unavailable ? undefined : { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
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
