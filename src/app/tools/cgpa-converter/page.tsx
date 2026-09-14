import React from 'react';
import Link from 'next/link';
import { CGPAConverter } from '@/components/CGPAConverter';
import { ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

export const metadata = {
  title: 'CGPA to Percentage Converter — VTU, KTU, Anna Univ, CBSE & 10-Point Scale',
  description: 'Convert CGPA score to percentage for VTU, KTU, Anna University, CBSE, and GATE forms. Official conversion formulas and calculation guide.',
};

export default function CGPAConverterToolPage() {
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
      <CGPAConverter />

      {/* BELOW: Comprehensive SEO-Optimized Guide & Text Explanation */}
      <article className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 space-y-6 shadow-subtle">
        
        <header className="border-b border-neutral-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Comprehensive Conversion Guide
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            How to Convert CGPA to Percentage (University Formulas & Rules)
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
            Understanding official academic scoring equations for IT company registration forms, GATE exams, and government job portals.
          </p>
        </header>

        {/* Section 1: Standard 10-Point Scale Formula */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            1. Standard 10-Point Scale (CBSE / AICTE Formula)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            Most Indian universities and technical boards following AICTE guidelines use the multiplier of <strong>9.5</strong> to convert a 10-point Cumulative Grade Point Average (CGPA) into percentage marks.
          </p>
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-900 font-bold">
            Percentage (%) = CGPA × 9.5
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            <em>Example:</em> A CGPA of 8.0 translates to <code>8.0 × 9.5 = 76.0%</code>.
          </p>
        </section>

        {/* Section 2: VTU Formula */}
        <section className="space-y-3 pt-4 border-t border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            2. Visvesvaraya Technological University (VTU) Formula
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            VTU (Karnataka) prescribes subtracting <strong>0.75</strong> from the final CGPA and multiplying the result by <strong>10</strong>.
          </p>
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-900 font-bold">
            Percentage (%) = [CGPA - 0.75] × 10
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            <em>Example:</em> A CGPA of 8.25 translates to <code>[8.25 - 0.75] × 10 = 75.0%</code>.
          </p>
        </section>

        {/* Section 3: KTU Formula */}
        <section className="space-y-3 pt-4 border-t border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            3. APJ Abdul Kalam Technological University (KTU) Formula
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            KTU (Kerala) prescribes subtracting <strong>0.5</strong> from the CGPA and multiplying by <strong>10</strong>.
          </p>
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-900 font-bold">
            Percentage (%) = [CGPA - 0.5] × 10
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            <em>Example:</em> A CGPA of 8.0 translates to <code>[8.0 - 0.5] × 10 = 75.0%</code>.
          </p>
        </section>

        {/* Section 4: Anna University Formula */}
        <section className="space-y-3 pt-4 border-t border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            4. Anna University Formula
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            Anna University (Tamil Nadu) uses a direct multiplier of <strong>10</strong>.
          </p>
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-900 font-bold">
            Percentage (%) = CGPA × 10
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            <em>Example:</em> A CGPA of 7.8 translates to <code>7.8 × 10 = 78.0%</code>.
          </p>
        </section>

        {/* Section 5: IT Eligibility Guidelines */}
        <section className="space-y-3 pt-4 border-t border-neutral-100 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600" />
            Off-Campus Hiring Cutoff Guidelines (TCS, Wipro, Infosys, CRED)
          </h2>
          <ul className="space-y-1.5 text-xs text-neutral-700 font-medium">
            <li>• <strong>60% Criterion:</strong> Most IT major off-campus drives require a minimum aggregate of 60% or 6.5 CGPA without active backlogs.</li>
            <li>• <strong>Rounding Rules:</strong> Never round up 59.9% to 60.0% unless specified by the company application portal.</li>
          </ul>
        </section>

      </article>

    </div>
  );
}
