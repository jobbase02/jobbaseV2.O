import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }
  
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Attempt to insert. If the email exists, it violates the UNIQUE constraint.
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      // 23505 is the Postgres code for unique_violation
      if (error.code === '23505') { 
        return NextResponse.json({ message: 'You are already subscribed!' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });
  } catch (err: any) {
    console.error('[API] Subscribe error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
