import { NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase/client';
import { enforceRateLimit } from '@/lib/rate-limit';
import { isSameOriginRequest, readJsonBody } from '@/lib/request-security';

export async function POST(req: Request) {
  if (!isSameOriginRequest(req)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  
  const rl = await enforceRateLimit(req, 'subscribe', { limit: 3, windowSeconds: 3600 });
  if (!rl.success) {
    return NextResponse.json(
      { error: rl.unavailable ? 'Service temporarily unavailable.' : 'Too many requests. Please try again later.' },
      { status: rl.unavailable ? 503 : 429 },
    );
  }
  
  const db = supabaseAdmin || supabase;
  if (!db) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[API] Database not configured, simulating success for development.');
      return NextResponse.json({ message: 'Simulated success' }, { status: 200 });
    }
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }
  
  try {
    const body = await readJsonBody(req);
    const email = body && typeof body === 'object' && typeof (body as Record<string, unknown>).email === 'string'
      ? ((body as Record<string, string>).email || '').trim().toLowerCase().slice(0, 254)
      : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Attempt to insert. If the email exists, it violates the UNIQUE constraint.
    const { error } = await db
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      // 23505 is the Postgres code for unique_violation
      // 42P01 is undefined_table
      if (error.code === '23505') { 
        return NextResponse.json({ status: 'already_subscribed', message: 'You are already subscribed.' }, { status: 409 });
      }
      if (error.code === '42P01' && process.env.NODE_ENV === 'development') {
        console.warn('[API] Subscribers table missing, simulating success for development.');
        return NextResponse.json({ message: 'Thanks, your subscription is active.' }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Thanks, your subscription is active.' }, { status: 200 });
  } catch (err: any) {
    if (err instanceof Error && err.message === 'REQUEST_TOO_LARGE') {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    }
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }
    console.error('[API] Subscribe error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
