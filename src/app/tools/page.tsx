import React from 'react';
import Link from 'next/link';
import { Calculator, MessageSquare, ArrowRight, Wrench } from 'lucide-react';
import { AdSpot } from '@/components/AdSpot';

export const metadata = {
  title: 'Career Utilities — CGPA Converter & Referral Builder | JobBase',
  description: 'Professional career utilities: CGPA to Percentage Converter and Cold Email & LinkedIn Referral Message Generator.',
};

export default function ToolsDirectoryPage() {
  const tools = [
    {
      id: 'cgpa-converter',
      title: 'CGPA to Percentage Converter',
      href: '/tools/cgpa-converter',
      icon: Calculator,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      badge: 'Academic Tool',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
      description: 'Quickly convert your CGPA to percentage using standard university formulas.',
    },
    {
      id: 'cold-email-generator',
      title: 'Referral Message Builder',
      href: '/tools/cold-email-generator',
      icon: MessageSquare,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      badge: 'Networking Tool',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      description: 'Generate professional referral and cold outreach messages for LinkedIn DMs and emails.',
    },
  ];

  return (
    <div className="space-y-8 fade-in-up">

      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600">
          <Wrench className="w-3.5 h-3.5" />
          Career Utilities
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Tools to streamline your job search
        </h1>
        <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
          Browser-based utilities built for candidates and job seekers. No registration required.
        </p>
      </div>

      <div className="mb-6">
        <AdSpot type="banner" spotName="Tools Top Banner" pageName="Career Tools" />
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm card-hover"
            >
              <div className="space-y-5">

                {/* Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${tool.iconBg} border border-slate-100 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${tool.badgeClass}`}>
                    {tool.badge}
                  </span>
                </div>

                {/* Title + Description */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

              </div>

              {/* CTA */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <Link
                  href={tool.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold shadow-sm hover:bg-orange-600 transition-colors btn-press"
                >
                  Launch Tool
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
