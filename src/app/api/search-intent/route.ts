import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { SearchIntent } from '@/types';
import { enforceRateLimit } from '@/lib/rate-limit';
import { isSameOriginRequest, readJsonBody } from '@/lib/request-security';

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.2-3b-preview',
  'llama-3.2-1b-preview',
  'llama-3.1-8b-instant',
  'llama3-70b-8192',
  'llama-3.1-70b-versatile',
  'gemma-7b-it',
  'llama3-groq-70b-8192-tool-use-preview',
  'mixtral-8x7b-32768'
];

const SYSTEM_PROMPT = `You are a search intent extractor for a job search platform. 
Extract parameters from the user's natural language query and return ONLY valid JSON (no markdown, no explanation).

JSON format:
{
  "batch": string[],
  "domain": string[],
  "location": string[],
  "company": string[],
  "qualification": string[],
  "experience": string,
  "keywords": string[]
}

domain values: "IT/Software", "Non-IT", "Core", "Design", "Product"
experience values: "Fresher", "1-3 YOE", "3+ YOE", "Any"`;

export async function POST(req: NextRequest) {
  if (!isSameOriginRequest(req)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  // ─── Rate Limiting ──────────────────────────────────────────────────────────
  const rl = await enforceRateLimit(req, 'search', { limit: 20, windowSeconds: 60 });

  if (!rl.success) {
    return NextResponse.json(
      { error: rl.unavailable ? 'Service temporarily unavailable.' : 'Too many search requests. Please wait.' },
      { status: rl.unavailable ? 503 : 429, headers: rl.unavailable ? undefined : { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    let body: unknown;
    try {
      body = await readJsonBody(req, 16 * 1024);
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { query } = (body as Record<string, unknown>) ?? {};

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'A search query string is required.' }, { status: 400 });
    }

    // ─── Input Validation ──────────────────────────────────────────────────────
    const cleanQuery = query
      .replace(/<[^>]*>/g, '')   // Strip HTML
      .trim()
      .slice(0, 300);            // Max 300 chars

    if (cleanQuery.length < 2) {
      return NextResponse.json({ error: 'Query too short.' }, { status: 400 });
    }

    // ─── AI Intent Extraction ─────────────────────────────────────────────────
    if (groq) {
      for (const modelId of MODELS) {
        try {
          const result = await groq.chat.completions.create({
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: cleanQuery },
            ],
            model: modelId,
            temperature: 0.1,
            max_tokens: 200,
            response_format: { type: 'json_object' },
          });

          const content = result.choices[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content) as SearchIntent;
            return NextResponse.json({ intent: parsed, source: `ai` });
          }
        } catch (err: unknown) {
          const errObj = err as Record<string, unknown>;
          if (
            errObj?.status === 404 ||
            errObj?.status === 400 ||
            errObj?.code === 'model_not_found'
          ) continue;
          console.warn(`[search-intent] Groq error on ${modelId}:`, errObj?.message);
        }
      }
    }

    // ─── High-quality Pattern Fallback ───────────────────────────────────────
    const lower = cleanQuery.toLowerCase();

    const batchMatches = lower.match(/\b(202[1-7])\b/g) || [];
    const batch = [...new Set(batchMatches)];

    let experience = 'Any';
    if (/fresher|entry.?level|intern|0.?yoe/.test(lower)) experience = 'Fresher';
    else if (/1[-–]3|junior/.test(lower)) experience = '1-3 YOE';
    else if (/3\+|senior|lead/.test(lower)) experience = '3+ YOE';

    const domain: string[] = [];
    if (/software|frontend|backend|fullstack|sde|dev|developer|code|engineer/.test(lower)) domain.push('IT/Software');
    if (/design|ui|ux|figma/.test(lower)) domain.push('Design');
    if (/product|apm|\bpm\b/.test(lower)) domain.push('Product');

    const knownCompanies = ['wipro','tcs','cred','stripe','swiggy','razorpay','zomato','bosch','infosys','accenture','cognizant','google','amazon','microsoft','flipkart','meesho','phonepe'];
    const company = knownCompanies.filter((c) => lower.includes(c)).map((c) => c.charAt(0).toUpperCase() + c.slice(1));

    const qualification: string[] = [];
    if (/btech|b\.tech|\bbe\b|b\.e/.test(lower)) qualification.push('B.Tech / B.E');
    if (/mtech|m\.tech|\bme\b|m\.e/.test(lower)) qualification.push('M.Tech / M.E');
    if (/\bbca\b|\bmca\b/.test(lower)) qualification.push('BCA / MCA');
    if (/\bbsc\b|\bmsc\b/.test(lower)) qualification.push('B.Sc / M.Sc');

    const knownLocations = ['delhi','noida','gurugram','gurgaon','bangalore','bengaluru','hyderabad','mumbai','pune','coimbatore','remote'];
    const location = knownLocations
      .filter((l) => lower.includes(l))
      .map((l) => l.charAt(0).toUpperCase() + l.slice(1));

    const stopWords = new Set(['i','am','a','an','looking','for','job','jobs','role','in','with','and','the','to','of','want','grad','batch','find','me','my','some']);
    const keywords = lower.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 2 && !stopWords.has(w));

    const intent: SearchIntent = { batch, domain, location, company, qualification, experience, keywords };
    return NextResponse.json({ intent, source: 'pattern' });
  } catch (_error) {
    console.error('[search-intent] Unhandled error:', _error);
    return NextResponse.json({ error: 'Search processing failed.' }, { status: 500 });
  }
}
