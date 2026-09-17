import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { ResumeAnalyzerClient } from '@/components/ResumeAnalyzerClient';

export const metadata = {
  title: 'AI Resume Analyzer — JobBase',
  description: 'Upload your PDF resume for an instant AI-powered audit. Get actionable feedback and find missing keywords.',
};

export default function ResumeAnalyzerPage() {
  redirect('/tools'); // Tool temporarily disabled
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10 fade-in-up">
      
      {/* Back Button & Header */}
      <div className="max-w-2xl space-y-4">
        <Link 
          href="/tools" 
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tools
        </Link>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#050316] font-subheading">Resume Analyzer</h1>
          <p className="mt-3 text-sm text-slate-500">
            Upload your PDF resume to get an instant, detailed audit using AI. We extract the text locally in your browser so your PDF is never saved on our servers.
          </p>
        </div>
      </div>

      <ResumeAnalyzerClient />

      {/* BELOW: Comprehensive Guide */}
      <div className="mt-16 pt-10 border-t border-slate-200">
        <div className="max-w-3xl space-y-8">
          
          <header className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 font-subheading">
              How Our AI Resume Analyzer Works
            </h2>
            <p className="text-sm text-slate-600">
              Understanding the process and what we look for when auditing your resume.
            </p>
          </header>

          <div className="space-y-6">
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">1. Local Extraction for Privacy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your PDF never leaves your browser. We extract all text locally using a secure PDF extraction engine on your device. Only the extracted text content (without formatting or personal metadata) is sent to our AI API for analysis.
              </p>
            </section>

            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">2. ATS Keyword Scanning</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Applicant Tracking Systems (ATS) automatically filter out resumes that don't match core job requirements. We scan your resume against standard industry keywords (like React, Node.js, Agile) to ensure you aren't missing critical terms.
              </p>
            </section>

            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">3. Actionable Feedback</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We analyze your bullet points to ensure they are outcome-oriented (e.g., using the STAR method). You'll receive step-by-step suggestions on how to rephrase weak points to stand out to recruiters and hiring managers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
