'use client';

import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { Job } from '@/types';
import { JobCard } from './JobCard';
import { HeroSection } from './HeroSection';
import { MoreAboutSection } from './MoreAboutSection';
import { FAQSection } from './FAQSection';

interface HomeClientProps {
  initialJobs: Job[];
}

export function HomeClient({ initialJobs }: HomeClientProps) {
  return (
    <div className="min-h-screen fade-in-up">
      <HeroSection onSearch={(query, location) => {
        const params = new URLSearchParams();
        if (query.trim()) params.set('q', query.trim());
        if (location && location !== 'All') params.set('location', location);
        window.location.href = `/search?${params.toString()}`;
      }} />

      <MoreAboutSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1D74C1]">Fresh opportunities</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#000000] font-subheading">Latest jobs</h2>
            <p className="mt-2 text-sm text-slate-700">The newest roles verified by JobBase.</p>
          </div>
          <Link href="/jobs" className="inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-lg border border-[#d0e5f7] bg-[#F3F7FE] text-sm font-semibold text-[#353535] hover:border-[#1D74C1]/50 hover:text-[#1D74C1] transition-colors">
            See more jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {initialJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialJobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#F3F7FE] border border-[#d0e5f7] rounded-xl">
            <BriefcaseBusiness className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="mt-3 text-sm text-slate-500">No jobs are available right now.</p>
          </div>
        )}
      </section>

      {/* FAQ Section right above the footer */}
      <FAQSection />
    </div>
  );
}
