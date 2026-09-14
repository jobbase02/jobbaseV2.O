import React from 'react';
import Link from 'next/link';
import { ColdEmailGenerator } from '@/components/ColdEmailGenerator';
import { ArrowLeft, BookOpen, CheckCircle2, MessageSquare, Sparkles, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'Cold Email & LinkedIn Referral Message Generator — JobBase',
  description: 'Generate concise, high-conversion referral outreach templates for LinkedIn DMs and recruiter emails tailored to software engineer and product roles.',
};

export default function ColdEmailGeneratorToolPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Back Button */}
      <Link 
        href="/tools" 
        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Tools Directory
      </Link>

      {/* TOP: Interactive Tool Component */}
      <ColdEmailGenerator />

      {/* BELOW: Comprehensive SEO-Optimized Guide & Strategy Explanation */}
      <article className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 space-y-6 shadow-subtle">
        
        <header className="border-b border-neutral-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 text-xs font-bold text-purple-700 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" /> Outreach Strategy & SEO Guide
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            How to Write Cold Outreach & LinkedIn Referral Messages That Get Responses
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
            Proven strategies, subject lines, and etiquette for reaching out to engineering managers, recruiters, and alumni.
          </p>
        </header>

        {/* Section 1: The Golden Rules of Referral Requests */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            1. The Golden Rules of Referral Messages
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed">
            <p>
              Employees receive dozens of generic "Please give me a referral" messages every week. To stand out, your message must follow three key principles:
            </p>
            <ul className="list-disc list-inside space-y-1.5 font-medium text-neutral-800">
              <li><strong>Be Hyper-Concise:</strong> Keep your message under 150 words. Respect their time.</li>
              <li><strong>Provide Job ID / Requisition Link:</strong> Always include the exact role name or job link so the employee can paste your resume with 1-click.</li>
              <li><strong>Highlight 2 Core Technical Skills:</strong> Mention your primary stack (e.g. React, Go, System Design) matching the job description.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: LinkedIn DM Structure */}
        <section className="space-y-3 pt-4 border-t border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            2. High-Conversion LinkedIn Connection Message Template
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            When connecting with alumni or senior developers on LinkedIn:
          </p>
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-800 whitespace-pre-line font-medium">
{`Hi [Name], hope you're having a great week! 

I noticed the [Target Role] opening at [Company] and wanted to reach out. I'm a [Batch Year] graduate skilled in [Core Skill 1 & Skill 2].

I've reviewed the job details and feel my background aligns well with your team's mission. Would you be open to sharing a referral or passing my resume to the hiring team?

I'd be glad to share my resume for quick review. Thanks for your time!`}
          </div>
        </section>

        {/* Section 3: Subject Lines */}
        <section className="space-y-3 pt-4 border-t border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            3. High Open-Rate Cold Email Subject Lines
          </h2>
          <div className="space-y-1.5 text-xs text-neutral-700 font-medium">
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 font-mono">
              Subject: Referral Inquiry: [Role Name] - [Batch Year] Graduate ([Your Key Skill])
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 font-mono">
              Subject: Application for [Role Name] - [Your Name] ([Alumni Institution])
            </div>
          </div>
        </section>

      </article>

    </div>
  );
}
