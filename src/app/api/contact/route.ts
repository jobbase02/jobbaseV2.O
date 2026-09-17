import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { enforceRateLimit } from '@/lib/rate-limit';
import { isSameOriginRequest, readJsonBody } from '@/lib/request-security';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const rl = await enforceRateLimit(request, 'contact', { limit: 5, windowSeconds: 600 });
  if (!rl.success) {
    return NextResponse.json(
      { error: rl.unavailable ? 'Service temporarily unavailable.' : 'Too many messages. Please try again later.' },
      { status: rl.unavailable ? 503 : 429 },
    );
  }

  try {
    const body = await readJsonBody(request);
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    const input = body as Record<string, unknown>;
    const clean = (value: unknown, max: number) => typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim().slice(0, max) : '';
    const name = clean(input.name, 100);
    const email = clean(input.email, 254).toLowerCase();
    const reason = clean(input.reason, 100);
    const message = clean(input.message, 4000);
    const ad_spot = clean(input.ad_spot, 150);
    const page_name = clean(input.page_name, 150);

    if (!name || !reason || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Name, email, and reason are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      console.error('[API] Supabase not initialized');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Insert into contact_messages using supabase client
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          reason,
          message: message || null,
          ad_spot: ad_spot || null,
          page_name: page_name || null,
        }
      ]);

    if (error) {
      console.error('[API] Contact insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === 'REQUEST_TOO_LARGE') {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }
    console.error('[API] Contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
