import { NextRequest, NextResponse } from 'next/server';
import { getResourceBySlug } from '@/lib/supabase/client';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`resource-slug:${ip}`, { limit: 30, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || '';

    // Basic slug validation
    if (!slug || !/^[a-z0-9-_]+$/i.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug.' }, { status: 400 });
    }

    const resource = await getResourceBySlug(slug);

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { resource },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (_error) {
    console.error('[/api/resources/by-slug] Error:', _error);
    return NextResponse.json({ error: 'Failed to fetch resource.' }, { status: 500 });
  }
}
