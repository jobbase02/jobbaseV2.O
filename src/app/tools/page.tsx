import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AdSpot } from '@/components/AdSpot';

export const metadata = {
  title: 'Career Utilities — Resume Analyzer, CGPA Converter & Outreach Builder | JobBase',
  description: 'Professional candidate utilities: AI Resume Analyzer, CGPA Converter, and Cold Email Generator.',
};

// 1. Academic Calculator & Grade Conversion Illustration
const CgpaIllustration: React.FC = () => (
  <div className="relative w-36 h-28 flex items-center justify-center">
    <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calculator Body */}
      <rect x="36" y="16" width="68" height="92" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      {/* Screen */}
      <rect x="44" y="24" width="52" height="24" rx="6" fill="#1E293B" />
      <text x="90" y="41" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="end">9.84</text>
      <text x="49" y="35" fill="#94A3B8" fontSize="8" fontWeight="bold">CGPA</text>
      {/* Keypad */}
      <circle cx="53" cy="58" r="5" fill="#334155" />
      <circle cx="70" cy="58" r="5" fill="#334155" />
      <circle cx="87" cy="58" r="5" fill="#1D74C1" />
      <circle cx="53" cy="72" r="5" fill="#334155" />
      <circle cx="70" cy="72" r="5" fill="#334155" />
      <circle cx="87" cy="72" r="5" fill="#334155" />
      <circle cx="53" cy="86" r="5" fill="#334155" />
      <circle cx="70" cy="86" r="5" fill="#334155" />
      <circle cx="87" cy="86" r="5" fill="#22C55E" />
      {/* Floating Percentage Badge */}
      <g className="drop-shadow-lg">
        <rect x="92" y="52" width="46" height="34" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <text x="115" y="70" fill="#0F172A" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">93.5%</text>
        <text x="115" y="80" fill="#16A34A" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CONVERTED</text>
      </g>
      {/* Floating Mini Graduation Cap Accent */}
      <path d="M46 12 L24 20 L46 28 L68 20 Z" fill="#FF5E1E" />
      <path d="M34 25 V33 C34 37 58 37 58 33 V25" fill="#EA580C" />
      <path d="M64 22 V34" stroke="#FF5E1E" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="64" cy="35" r="1.5" fill="#FF5E1E" />
    </svg>
  </div>
);

// 2. Outreach Email & Paper Plane Launch Illustration
const OutreachIllustration: React.FC = () => (
  <div className="relative w-36 h-28 flex items-center justify-center">
    <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Modern Mail Envelope Base */}
      <rect x="28" y="32" width="76" height="58" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      {/* Letter protruding */}
      <rect x="36" y="20" width="60" height="36" rx="6" fill="#FFFFFF" />
      <line x1="44" y1="28" x2="68" y2="28" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="36" x2="88" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="44" x2="78" y2="44" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      {/* Envelope Flap Fold Lines */}
      <path d="M29 34 L66 62 L103 34" stroke="#334155" strokeWidth="2" strokeLinejoin="round" fill="none" />
      {/* Dynamic Paper Plane Launching */}
      <g className="drop-shadow-lg">
        <path d="M78 18 L142 36 L106 76 L98 52 Z" fill="#38BDF8" />
        <path d="M142 36 L98 52 L114 42 Z" fill="#0284C7" />
        <path d="M106 76 L112 60 L98 52 Z" fill="#0369A1" />
      </g>
      {/* Motion Speed Trails */}
      <path d="M54 74 Q68 76 74 68" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
      <path d="M46 82 Q64 86 82 78" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 3" strokeLinecap="round" />
    </svg>
  </div>
);

// 3. AI Resume Analyzer & Scanner Illustration
const ResumeIllustration: React.FC = () => (
  <div className="relative w-36 h-28 flex items-center justify-center">
    <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Resume Document */}
      <rect x="32" y="16" width="68" height="88" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Candidate Avatar / Header */}
      <rect x="40" y="24" width="14" height="14" rx="4" fill="#7C3AED" />
      <line x1="60" y1="27" x2="90" y2="27" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="34" x2="80" y2="34" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      {/* Document Content Lines */}
      <line x1="40" y1="46" x2="92" y2="46" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="54" x2="84" y2="54" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="62" x2="88" y2="62" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="70" x2="72" y2="70" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      {/* AI Scanner / Magnifier with Score */}
      <g className="drop-shadow-xl">
        <circle cx="98" cy="62" r="22" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2.5" />
        <path d="M114 78 L128 92" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="98" cy="62" r="16" fill="#1E1B4B" />
        {/* Score pill inside magnifier */}
        <text x="98" y="62" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" dominantBaseline="central">94</text>
        <text x="98" y="71" fill="#A78BFA" fontSize="5.5" fontWeight="bold" textAnchor="middle">ATS</text>
        {/* AI Sparkle */}
        <path d="M120 32 L122 38 L128 40 L122 42 L120 48 L118 42 L112 40 L118 38 Z" fill="#FBBF24" />
      </g>
    </svg>
  </div>
);

export default function ToolsDirectoryPage() {
  const tools = [
    {
      id: 'cgpa-converter',
      title: 'CGPA to Percentage Converter',
      href: '/tools/cgpa-converter',
      badge: 'Academic Utility',
      sunColor: '#FF5E1E',
      Illustration: CgpaIllustration,
      ctaText: 'Calculate Now',
      isComingSoon: false,
      description: 'Convert your university CGPA to percentage using VTU, KTU, Anna University, CBSE, and AICTE standards.',
    },
    {
      id: 'cold-email-generator',
      title: 'Cold Email & DM Outreach',
      href: '/tools/cold-email-generator',
      badge: 'Networking Tool',
      sunColor: '#0284C7',
      Illustration: OutreachIllustration,
      ctaText: 'Create Template',
      isComingSoon: false,
      description: 'Generate high-converting cold outreach templates for LinkedIn referrals, hiring managers, and recruiter inquiries.',
    },
    {
      id: 'resume-analyzer',
      title: 'AI Resume Audit & ATS Score',
      href: '/tools/resume-analyzer',
      badge: 'AI Utility',
      sunColor: '#7C3AED',
      Illustration: ResumeIllustration,
      ctaText: 'Analyze Resume',
      isComingSoon: true,
      description: 'Upload your PDF resume for an instant AI-powered audit. Get actionable feedback and keyword optimization insights.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 space-y-10 fade-in-up">

      {/* Tools Cards Section Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#000000] font-body flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1D74C1]" /> Available Tools
          </h2>
          <span className="text-xs font-semibold text-slate-500 font-subheading">
            {tools.length} Tools Available
          </span>
        </div>

        {/* Tools Grid matching the Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group relative flex flex-col rounded-[30px] sm:rounded-[34px] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80"
            >
              {/* TOP ZONE (Crisp White Background + Circular Sun + Graphic) */}
              <div className="relative bg-white pt-9 pb-3 px-6 flex flex-col items-center justify-center min-h-[195px] sm:min-h-[220px]">
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100/90 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/80 font-subheading">
                    {tool.badge}
                  </span>
                </div>

                {/* Sun Disk Backdrop */}
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: tool.sunColor }}
                />

                {/* Focal Illustration floating over Sun */}
                <div className="absolute z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <tool.Illustration />
                </div>
              </div>

              {/* ORGANIC WAVE DIVIDER (Curved wave transition like the reference design) */}
              <div className="relative w-full overflow-hidden leading-none text-[#0d2d4d] -mb-[1px]">
                <svg
                  viewBox="0 0 500 56"
                  preserveAspectRatio="none"
                  className="w-full h-8 sm:h-10 block fill-current"
                >
                  <path d="M0,32 C120,54 220,12 340,32 C410,44 455,22 500,26 L500,56 L0,56 Z" />
                </svg>
              </div>

              {/* BOTTOM ZONE (Deep Navy Ocean Background + Typography + Action Button) */}
              <div className="bg-[#0d2d4d] px-6 sm:px-8 pb-8 pt-2 flex flex-col flex-grow justify-between text-white space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide leading-snug group-hover:text-sky-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-body leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* CTA Button matching 'Learn more' pill button */}
                <div className="pt-2">
                  {tool.isComingSoon ? (
                    <button
                      disabled
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white/10 text-white/50 text-sm font-bold font-subheading border border-white/10 cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <Link
                      href={tool.href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#DDEEFF] text-[#0d2d4d] text-sm font-bold font-subheading shadow-sm hover:bg-white hover:text-[#1D74C1] transition-all duration-200 active:scale-[0.98] group-hover:shadow-md"
                    >
                      <span>{tool.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Banner Ad Spot Moved Below Tools */}
      <div className="py-4">
        <AdSpot type="banner" spotName="Tools Top Banner" pageName="Career Tools" />
      </div>

    </div>
  );
}

