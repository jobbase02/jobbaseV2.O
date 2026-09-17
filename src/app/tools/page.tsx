import React from 'react';
import Link from 'next/link';
import { Calculator, MessageSquare, ArrowRight, Wrench, Sparkles, FileSearch } from 'lucide-react';
import { AdSpot } from '@/components/AdSpot';

export const metadata = {
  title: 'Career Utilities — Resume Analyzer, CGPA Converter & Outreach Builder | JobBase',
  description: 'Professional candidate utilities: AI Resume Analyzer, CGPA Converter, and Cold Email Generator.',
};

export default function ToolsDirectoryPage() {
  const tools = [
    {
      id: 'cgpa-converter',
      title: 'CGPA Converter',
      href: '/tools/cgpa-converter',
      icon: Calculator,
      bgGradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
      badge: 'Academic Utility',
      description: 'Convert your CGPA score to percentage for VTU, KTU, Anna University, CBSE, and AICTE 10-point scale formulas instantly.',
    },
    {
      id: 'cold-email-generator',
      title: 'Outreach Email Generator',
      href: '/tools/cold-email-generator',
      icon: MessageSquare,
      bgGradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      badge: 'Networking Tool',
      description: 'Generate high-converting cold email and LinkedIn DM outreach templates tailored for referrals and recruiter inquiries.',
    },
    {
      id: 'resume-analyzer',
      title: 'Resume Analyzer',
      href: '/tools/resume-analyzer',
      icon: FileSearch,
      bgGradient: 'bg-gradient-to-br from-emerald-400 to-teal-600',
      badge: 'AI Utility',
      description: 'Upload your PDF resume for an instant AI-powered audit. Get actionable feedback and find missing keywords instantly.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 space-y-10 fade-in-up">

      {/* Tools Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#050316] font-subheading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#f97415]" /> Available Tools
          </h2>
          <span className="text-xs font-semibold text-slate-500 font-subheading">
            {tools.length} Tools Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${tool.bgGradient}`}
              >
                {/* Decorative background shapes */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/20 transition-colors" />
                <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-black/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-5 relative z-10 text-white">

                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/10 backdrop-blur-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-black/20 text-white border border-white/10 backdrop-blur-sm">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-subheading tracking-tight leading-tight">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-white/90 font-body leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                </div>

                {/* Launch CTA */}
                <div className="mt-8 pt-5 border-t border-white/20 relative z-10">
                  {tool.id === 'resume-analyzer' ? (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/50 text-slate-800 text-sm font-bold shadow-sm cursor-not-allowed opacity-80"
                    >
                      <span>Coming Soon</span>
                    </button>
                  ) : (
                    <Link
                      href={tool.href}
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                    >
                      <span>Launch Tool</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Banner Ad Spot Moved Below Tools */}
      <div className="py-4">
        <AdSpot type="banner" spotName="Tools Top Banner" pageName="Career Tools" />
      </div>

    </div>
  );
}
