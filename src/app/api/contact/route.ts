import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason, message, ad_spot, page_name } = body;

    if (!name || !email || !reason) {
      return NextResponse.json(
        { error: 'Name, email, and reason are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error('[API] Supabase not initialized');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Insert into contact_messages using supabase client
    const { error } = await supabase
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
    console.error('[API] Contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
