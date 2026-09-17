import React from 'react';
import Link from 'next/link';
import { Calculator, MessageSquare, ArrowRight, Wrench, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { AdSpot } from '@/components/AdSpot';

export const metadata = {
  title: 'Career Utilities — CGPA Converter & Referral Builder | JobBase',
  description: 'Professional candidate utilities: CGPA to Percentage Converter and Cold Email & LinkedIn Referral Message Generator.',
};

export default function ToolsDirectoryPage() {
  const tools = [
    {
      id: 'cgpa-converter',
      title: 'CGPA to Percentage Converter',
      href: '/tools/cgpa-converter',
      icon: Calculator,
      iconBg: 'bg-[#f97415]/10',
      iconColor: 'text-[#f97415]',
      badge: 'Academic Utility',
      description: 'Convert your CGPA score to percentage for VTU, KTU, Anna University, CBSE, and AICTE 10-point scale formulas instantly.',
    },
    {
      id: 'cold-email-generator',
      title: 'Referral & Outreach Builder',
      href: '/tools/cold-email-generator',
      icon: MessageSquare,
      iconBg: 'bg-indigo-500/10',
      iconColor: 'text-indigo-600',
      badge: 'Networking Tool',
      description: 'Generate high-converting cold email and LinkedIn DM outreach templates tailored for referrals and recruiter inquiries.',
    },
  ];

  return (
    <div className="w-full max-w-[90%] mx-auto py-6 sm:py-10 space-y-10 fade-in-up">

      {/* Page Header */}
      <div className="bg-[#fbfbfe] border border-[#dddbff] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#f97415]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f97415] font-avenue">
            <Wrench className="w-4 h-4 text-[#f97415]" />
            <span>Candidate Utilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#050316] font-body tracking-tight leading-tight">
            Tools to accelerate your <span className="text-[#f97415] font-avenue font-semibold">job search</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed">
            Free, browser-based tools built for students and job seekers. Calculate exact marks, craft recruiter cold emails, and land referrals faster.
          </p>
        </div>
      </div>

      {/* Top Banner Ad Spot */}
      <div className="my-4">
        <AdSpot type="banner" spotName="Tools Top Banner" pageName="Career Tools" />
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white border border-slate-200 hover:border-[#f97415]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-5">

                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${tool.iconBg} flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-6 h-6 ${tool.iconColor}`} />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#fbfbfe] text-[#050316] border border-[#dddbff] font-subheading">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#050316] font-subheading group-hover:text-[#f97415] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                </div>

                {/* Launch CTA */}
                <div className="mt-8 pt-5 border-t border-slate-100">
                  <Link
                    href={tool.href}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#f97415] hover:bg-[#ea6305] active:bg-[#d95e09] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all btn-press font-subheading"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="bg-[#fbfbfe] border border-[#dddbff] rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#f97415]/10 flex items-center justify-center text-[#f97415]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#050316] font-subheading">100% Free & Private</h4>
          <p className="text-xs text-slate-500 font-body leading-relaxed">
            All calculations and text generation happen directly in your browser. No signups or data collection.
          </p>
        </div>

        <div className="bg-[#fbfbfe] border border-[#dddbff] rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#f97415]/10 flex items-center justify-center text-[#f97415]">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#050316] font-subheading">Official Equations</h4>
          <p className="text-xs text-slate-500 font-body leading-relaxed">
            Verified formulas for VTU, KTU, Anna University, CBSE 10-point scale, and GATE application portals.
          </p>
        </div>

        <div className="bg-[#fbfbfe] border border-[#dddbff] rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#f97415]/10 flex items-center justify-center text-[#f97415]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#050316] font-subheading">Instant Copy & Export</h4>
          <p className="text-xs text-slate-500 font-body leading-relaxed">
            Copy outreach messages or export your percentage score directly for official company application forms.
          </p>
        </div>
      </div>

    </div>
  );
}
