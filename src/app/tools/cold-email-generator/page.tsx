import React from 'react';
import Link from 'next/link';
import { ColdEmailGenerator } from '@/components/ColdEmailGenerator';
import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'Cold Email & LinkedIn Referral Message Generator — JobBase',
  description: 'Generate concise, high-conversion referral outreach templates for LinkedIn DMs and recruiter emails tailored to software engineer and product roles.',
};

export default function ColdEmailGeneratorToolPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10 fade-in-up">
      
      {/* Back Button & Header */}
      <div className="max-w-2xl space-y-4">
        <Link 
          href="/tools" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1D74C1] hover:text-[#175fa3] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tools
        </Link>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] font-subheading">Outreach Email Generator</h1>
          <p className="mt-3 text-sm text-slate-500">
            Generate crisp, high-conversion referral templates tailored for LinkedIn messages or recruiter emails. Stand out in their inbox.
          </p>
        </div>
      </div>

      {/* TOP: Interactive Tool Component */}
      <ColdEmailGenerator />

      {/* BELOW: Comprehensive Strategy Guide */}
      <div className="mt-16 pt-10 border-t border-slate-200">
        <div className="max-w-3xl space-y-8">
          
          <header className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F7FE] border border-[#d0e5f7] text-xs font-bold text-[#1D74C1]">
              <BookOpen className="w-3.5 h-3.5" /> Outreach Strategy Guide
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-subheading">
              How to Get Responses from Recruiters & Alumni
            </h2>
            <p className="text-sm text-slate-600">
              Proven strategies, subject lines, and etiquette for reaching out to engineering managers and peers.
            </p>
          </header>

          <div className="space-y-6">
            {/* Section 1 */}
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#1D74C1]" />
                The Golden Rules of Referral Requests
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Employees receive dozens of generic "Please give me a referral" messages every week. To stand out, your message must follow three key principles:
              </p>
              <ul className="space-y-2 text-sm text-slate-800 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#1D74C1] font-black">•</span>
                  <span><strong>Be Hyper-Concise:</strong> Keep your message under 150 words. Respect their time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1D74C1] font-black">•</span>
                  <span><strong>Provide Job ID / Link:</strong> Always include the exact role name or link so they can paste your resume with 1-click.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1D74C1] font-black">•</span>
                  <span><strong>Highlight 2 Core Skills:</strong> Mention your primary stack (e.g. React, Go) matching the job description.</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#1D74C1]" />
                High-Conversion LinkedIn Connection Template
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                When connecting with alumni or senior developers on LinkedIn:
              </p>
              <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-sm">
{`Hi [Name], hope you're having a great week! 

I noticed the [Target Role] opening at [Company] and wanted to reach out. I'm a [Batch Year] graduate skilled in [Core Skill 1 & Skill 2].

I've reviewed the job details and feel my background aligns well with your team's mission. Would you be open to sharing a referral or passing my resume to the hiring team?

I'd be glad to share my resume for quick review. Thanks for your time!`}
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-[#F3F7FE] rounded-2xl p-6 border border-[#d0e5f7]">
              <h3 className="text-base font-bold text-[#353535] flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-[#1D74C1]" />
                High Open-Rate Subject Lines
              </h3>
              <div className="space-y-3 text-sm text-[#353535]">
                <div className="p-3 rounded-lg bg-white border border-[#d0e5f7] font-mono font-medium shadow-sm">
                  Subject: Referral Inquiry: [Role Name] - [Batch Year] Graduate ([Your Key Skill])
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#d0e5f7] font-mono font-medium shadow-sm">
                  Subject: Application for [Role Name] - [Your Name] ([Alumni Institution])
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

    </div>
  );
}
