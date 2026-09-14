import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

// Current active Groq models (decommissioned models removed)
const MODELS = [
  'llama-3.1-8b-instant',
  'llama3-8b-8192',
  'gemma2-9b-it',
];

/** Strip any HTML/script tags and limit string length */
function sanitizeInput(value: unknown, maxLen = 150): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')         // Strip HTML tags
    .replace(/[`${}\\]/g, '')        // Strip template literal / injection chars
    .trim()
    .slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  // ─── Rate Limiting (strict — Groq has per-day quotas) ─────────────────────
  const ip = getClientIp(req);
  const rl = rateLimit(`email:${ip}`, { limit: 10, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before generating again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const { role, company, skills, batch, channel } = body as Record<string, unknown>;

    // ─── Input Validation & Sanitization ──────────────────────────────────────
    const cleanRole = sanitizeInput(role, 100);
    const cleanCompany = sanitizeInput(company, 100);
    const cleanSkills = sanitizeInput(skills, 200);
    const cleanBatch = sanitizeInput(batch, 10);
    const cleanChannel = ['LinkedIn', 'Email'].includes(String(channel)) ? String(channel) : 'LinkedIn';

    if (!cleanRole || !cleanCompany) {
      return NextResponse.json({ error: 'Role and Company are required.' }, { status: 400 });
    }

    // ─── AI Generation ────────────────────────────────────────────────────────
    if (groq) {
      const prompt = `Write a concise, professional referral outreach message for a job seeker applying to ${cleanCompany} for a ${cleanRole} position.
Details: Skills: ${cleanSkills || 'Software Development'}, Batch: ${cleanBatch || '2024'}, Channel: ${cleanChannel}.
Rules: Max 130 words. Professional tone. No buzzwords. Return ONLY the final message text, nothing else.`;

      for (const modelId of MODELS) {
        try {
          const response = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: modelId,
            temperature: 0.3,
            max_tokens: 300,
          });

          const text = response.choices[0]?.message?.content?.trim();
          if (text) {
            return NextResponse.json({ message: text });
          }
        } catch (err: unknown) {
          const errObj = err as Record<string, unknown>;
          if (errObj?.status === 404 || errObj?.code === 'model_not_found') continue;
          console.warn(`[generate-email] Groq error on ${modelId}:`, errObj?.message || err);
        }
      }
    }

    // ─── Fallback Template ────────────────────────────────────────────────────
    const template =
      cleanChannel === 'Email'
        ? `Subject: Application — ${cleanRole} | ${cleanBatch || '2024'} Graduate

Hi [Name],

I hope this message finds you well. I'm a ${cleanBatch || '2024'} graduate with experience in ${cleanSkills || 'software development'} and I came across the ${cleanRole} opening at ${cleanCompany}.

I'd love to discuss how my background aligns with this role. I've attached my resume and would appreciate any guidance or a referral if you're open to it.

Thank you for your time!

Best regards,
[Your Name] | [LinkedIn / Portfolio]`
        : `Hi [Name], hope you're doing well!

I noticed the ${cleanRole} opening at ${cleanCompany} and wanted to reach out. I'm a ${cleanBatch || '2024'} grad skilled in ${cleanSkills || 'full-stack development'}.

Would you be open to referring me or sharing my resume with the team? I'd really appreciate it!

Thanks a lot 🙏
[Your Name]`;

    return NextResponse.json({ message: template });
  } catch (_error) {
    console.error('[generate-email] Unhandled error:', _error);
    return NextResponse.json(
      { error: 'Failed to generate message. Please try again.' },
      { status: 500 }
    );
  }
}
