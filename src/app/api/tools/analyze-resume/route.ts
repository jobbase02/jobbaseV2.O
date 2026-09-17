import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { enforceRateLimit } from '@/lib/rate-limit';
import { isSameOriginRequest, readJsonBody } from '@/lib/request-security';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    // 1. Security Check: Same Origin
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
    }

    // 2. Security Check: Rate Limiting
    // Strict limit: 5 requests per hour to prevent AI credit abuse
    const rl = await enforceRateLimit(request, 'resume_analyzer_ai', {
      limit: 5,
      windowSeconds: 3600,
    });

    if (!rl.success) {
      if (rl.unavailable) {
        return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
      }
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. Body Parsing with custom max size (256KB) for resume texts
    const body = (await readJsonBody(request, 256 * 1024)) as { text?: string };
    
    if (!body || typeof body.text !== 'string' || body.text.trim().length === 0) {
      return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
    }
    
    if (body.text.length > 50000) {
      return NextResponse.json({ error: 'Resume text is too long (max 50,000 characters)' }, { status: 400 });
    }

    // 4. Send to Groq AI
    const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) and senior technical recruiter. 
Analyze the provided resume text. Return a detailed, constructive JSON audit.
Your output MUST be a valid JSON object matching this schema:
{
  "score": <number between 1-100 based on quality, impact, and ATS readability>,
  "summary": "<2-3 sentences summarizing the resume's strength>",
  "missingKeywords": ["<keyword 1>", "<keyword 2>"],
  "improvements": [
    {
      "section": "<e.g., Experience, Skills, Summary>",
      "feedback": "<detailed constructive feedback on what to fix>"
    }
  ]
}`;

    let resultText = '';
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

    const safeText = String(body.text).substring(0, 12000); // Prevent token limit 400 errors

    for (const modelId of MODELS) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT
            },
            {
              role: "user",
              content: safeText
            }
          ],
          model: modelId,
          temperature: 0.2,
          response_format: { type: "json_object" },
        });

        if (completion.choices[0]?.message?.content) {
          resultText = completion.choices[0].message.content;
          break; // Success, exit loop
        }
      } catch (err: any) {
        if (err?.status === 404 || err?.status === 400 || err?.code === 'model_not_found' || err?.code === 'invalid_api_key') {
          console.warn(`[analyze-resume] Groq model ${modelId} failed:`, err?.message);
          continue;
        }
        throw err;
      }
    }

    if (!resultText) {
      throw new Error("AI Models failed to respond. Please check your Groq API key permissions or model access.");
    }

    const result = JSON.parse(resultText);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[ResumeAnalyzerAPI] Error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
