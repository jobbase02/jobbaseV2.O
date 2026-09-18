import React from 'react';
import Link from 'next/link';
import { CGPAConverter } from '@/components/CGPAConverter';
import { ArrowLeft, BookOpen, CheckCircle2, Info } from 'lucide-react';

export const metadata = {
  title: 'CGPA to Percentage Converter — VTU, KTU, Anna Univ, CBSE & 10-Point Scale',
  description: 'Convert CGPA score to percentage for VTU, KTU, Anna University, CBSE, and GATE forms. Official conversion formulas and calculation guide.',
};

export default function CGPAConverterToolPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] font-subheading">CGPA Converter</h1>
          <p className="mt-3 text-sm text-slate-500">
            Convert your CGPA score to an exact percentage using official university formulas. Ideal for IT company registration forms and GATE exams.
          </p>
        </div>
      </div>

      {/* TOP: Interactive Tool Component */}
      <CGPAConverter />

      {/* BELOW: Comprehensive Guide */}
      <div className="mt-16 pt-10 border-t border-slate-200">
        <div className="max-w-3xl space-y-8">
          
          <header className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F7FE] border border-[#d0e5f7] text-xs font-bold text-[#1D74C1]">
              <BookOpen className="w-3.5 h-3.5" /> Conversion Guide
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-subheading">
              How to Convert CGPA to Percentage
            </h2>
            <p className="text-sm text-slate-600">
              Understanding official academic scoring equations for different university boards.
            </p>
          </header>

          <div className="space-y-6">
            {/* Section 1 */}
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D74C1]" />
                Standard 10-Point Scale (CBSE / AICTE)
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Most Indian universities and technical boards following AICTE guidelines use the multiplier of <strong>9.5</strong>.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-800 font-bold mb-2">
                Percentage (%) = CGPA × 9.5
              </div>
              <p className="text-xs text-slate-500">
                <em>Example:</em> A CGPA of 8.0 translates to <code>8.0 × 9.5 = 76.0%</code>.
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D74C1]" />
                Visvesvaraya Technological University (VTU)
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                VTU (Karnataka) prescribes subtracting <strong>0.75</strong> from the final CGPA and multiplying the result by <strong>10</strong>.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-800 font-bold mb-2">
                Percentage (%) = [CGPA - 0.75] × 10
              </div>
              <p className="text-xs text-slate-500">
                <em>Example:</em> A CGPA of 8.25 translates to <code>[8.25 - 0.75] × 10 = 75.0%</code>.
              </p>
            </section>

            {/* Section 3 & 4 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2">APJ Abdul Kalam Tech Univ (KTU)</h3>
                <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 font-bold mb-2">
                  [CGPA - 0.5] × 10
                </div>
              </section>

              <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2">Anna University</h3>
                <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 font-bold mb-2">
                  CGPA × 10
                </div>
              </section>
            </div>

            {/* Section 5 */}
            <section className="bg-[#F3F7FE] rounded-2xl p-6 border border-[#d0e5f7]">
              <h3 className="text-sm font-bold text-[#353535] flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-[#1D74C1]" />
                Off-Campus Hiring Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-[#353535] font-medium">
                <li>• Most IT major off-campus drives require a minimum aggregate of 60% or 6.5 CGPA without active backlogs.</li>
                <li>• <strong>Never</strong> round up 59.9% to 60.0% unless specified by the company application portal.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

    </div>
  );
}
