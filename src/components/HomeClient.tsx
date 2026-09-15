'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Job, FilterState } from '@/types';
import { JobCard } from './JobCard';
import { AdSpot } from './AdSpot';
import { JobFilter } from '@/components/JobFilter';
import {
  Search, RefreshCw, TrendingUp, ArrowRight,
  BriefcaseBusiness, Calculator, MessageSquare, Mail, CheckCircle, Zap, Star
} from 'lucide-react';

interface HomeClientProps {
  initialJobs: Job[];
  initialFilters: FilterState;
}

export function HomeClient({ initialJobs, initialFilters }: HomeClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Keep local state strictly for the UI input fields so typing is fast
  const [localSearchQuery, setLocalSearchQuery] = useState(initialFilters.searchQuery);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'exists' | 'error'>('idle');
  const [emailInput, setEmailInput] = useState('');
  const [isLocallySubscribed, setIsLocallySubscribed] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    // Check if the user already subscribed in a previous session
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('jobbase_subscribed') === 'true') {
        setIsLocallySubscribed(true);
      }
    }
  }, []);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (value && value !== 'All') {
        params.set(key === 'searchQuery' ? 'q' : key, value);
      } else {
        params.delete(key === 'searchQuery' ? 'q' : key);
      }
      router.push(`/?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('searchQuery', localSearchQuery);
  };

  const handleResetFilters = () => {
    setLocalSearchQuery('');
    startTransition(() => {
      router.push('/');
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) return;

    setSubscribeStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setSubscribeStatus('exists');
        setToast({ message: data.message || 'You are already subscribed.', type: 'info' });
        localStorage.setItem('jobbase_subscribed', 'true');
        setIsLocallySubscribed(true);
      } else if (res.ok) {
        setSubscribeStatus('success');
        setToast({ message: 'Successfully subscribed to newsletters!', type: 'success' });
        setEmailInput('');
        localStorage.setItem('jobbase_subscribed', 'true');
        setIsLocallySubscribed(true);
      } else {
        setSubscribeStatus('error');
        setToast({ message: data.error || 'Something went wrong.', type: 'error' });
      }
    } catch (err) {
      setSubscribeStatus('error');
      setToast({ message: 'Network error. Try again.', type: 'error' });
    }
  };

  // The first job is strictly the "Featured Opportunity" if we don't have filters, 
  // but to match top-tier platforms, let's always show it if it exists and matches the query, 
  // or just pull it from the top of the initial list.
  const featuredJob = initialJobs.length > 0 ? initialJobs[0] : null;
  const regularJobs = initialJobs.length > 0 ? initialJobs.slice(1) : [];

  // We will always show the featured job as a sponsored slot at the top if there is one in the result set.

  return (
    <div className="space-y-8 fade-in-up">

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-2xl bg-[#fbfbfe] border border-[#dddbff] p-5 sm:p-8 lg:p-10 shadow-sm">
        {/* Background Wave Image Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0 overflow-hidden leading-none">
          <img
            src="/wave-haikei (6).png"
            alt=""
            className="w-full h-auto object-cover object-bottom"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Column: Headlines, Subtitle, Search Bar, Bullet features */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FAF4F2] border border-[#FAF4F2] text-xs font-normal font-subheading text-[#050316] shadow-2xs">
              India's Top Career Opportunity Platform.
            </div>

            <h1 className="font-heading text-6xl sm:text-6xl lg:text-7xl font-normal text-[#050316] leading-[1.15] sm:leading-[1.1] tracking-tight z-10">
              <span className="text-[#f97415]">
                Jobs move fast.
              </span> <br />
              So do we, every single morning.
            </h1>

            <p className="text-sm sm:text-lg text-[#050316] font-normal max-w-xl leading-relaxed">
              JobBase tracks fresh openings, off-campus drives and internships in real time &#x2192; so you apply before the crowd does.
            </p>

            {/* Search Input Bar (replaces the Browse jobs & For employers buttons) */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg pt-1">
              <div className="relative flex items-center shadow-sm rounded-xl">
                <Search className="w-4 sm:w-5 h-4 sm:h-5 text-[#050316]/40 absolute left-3.5 sm:left-4 pointer-events-none" />
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  placeholder="Search roles, skills, or companies..."
                  className="w-full text-sm sm:text-base bg-white text-[#050316] placeholder-[#050316]/40 border border-[#dddbff] rounded-xl pl-10 sm:pl-11 pr-24 sm:pr-28 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f97415]/20 focus:border-[#f97415] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 sm:right-2 px-3.5 sm:px-4 py-2 bg-[#f97415] hover:bg-[#e0630b] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Search
                </button>
              </div>
            </form>

            <p className="text-xs sm:text-sm text-[#050316]/80 font-medium flex flex-wrap items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2">
              <span className='font-subheading'>No signup needed</span>
              <span className="text-[#dddbff]">•</span>
              <span className='font-subheading'>Fresh listings daily</span>
              <span className="text-[#dddbff]">•</span>
              <span className='font-subheading'>Free forever</span>
            </p>
          </div>

          {/* Right Column: Floating Cards Mockup */}
          <div className="lg:col-span-5 relative min-h-[290px] sm:min-h-[290px] flex items-center justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-sm sm:max-w-md h-full min-h-[260px] sm:min-h-[260px]">

              {/* Floating Card 1 (Top Left) */}
              <div className="absolute top-[-10%] sm:top-[-7%] left-1 sm:left-10 z-10 bg-white rounded-2xl p-3 sm:p-3.5 pr-10 sm:pr-10 shadow-md border border-[#FAF4F2] max-w-[180px] sm:max-w-[210px]">
                <span className="text-sm sm:text-[16px] font-light text-[#050316]/50 block">Software engineer</span>
                <span className="text-sm sm:text-md font-medium text-[#050316] block mt-0.5">TCS · Bengaluru</span>
                <span className="inline-block mt-3 px-2.5 py-0.5 sm:py-1 mt-1.5 sm:mt-2 rounded-full bg-[#EAFBE7] text-[#397b21] text-xs sm:text-xs font-normal">
                  New
                </span>
              </div>

              {/* Floating Card 2 (Top Right / Alert Pill) */}
              <div className="absolute top-[18%] sm:top-[23%] right-[-2%] sm:right-[-3%] z-20 bg-white rounded-2xl p-3 sm:p-3 pr-3 sm:pr-10 shadow-md border border-[#FAF4F2] flex flex-col gap-0">
                <div className='flex items-center gap-2'>
                  <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-[#E5485D] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    P
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-sm font-normal text-[#050316] truncate pr-10">Priya shortlisted</div>
                  </div>
                </div>
                <div className="text-[11px] sm:text-xs text-[#050316]/80 font-light truncate pl-8">Infosys · 2 min ago</div>
              </div>

              {/* Floating Card 3 (Middle Right / Main Card) */}
              <div className="absolute bottom-6 sm:bottom-[-10%] left-1 sm:left-auto sm:right-[35%] z-30 bg-white rounded-2xl p-3 pr-16 sm:p-4 sm:pr-10 shadow-lg border border-[#FAF4F2] min-w-[170px] sm:min-w-[210px] transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-sm sm:text-md text-[#050316]/50 font-light block">Data analyst intern</span>
                <span className="text-sm sm:text-sm font-normal text-[#050316] block mt-0.5 mb-2 sm:mb-2.5">Wipro · Remote</span>
                <button
                  type="button"
                  onClick={() => handleFilterChange('searchQuery', 'Data analyst')}
                  className="px-3.5 py-1.5 bg-[#181818] text-white rounded-full text-xs font-medium hover:bg-[#050316]/90 transition-colors shadow-2xs"
                >
                  Apply now
                </button>
              </div>

              {/* Floating Card 4 (Bottom Left / Rating badge) */}
              <div className="absolute bottom-[3%] sm:bottom-[-25%] right-[0%] sm:right-[13%] z-40 bg-white rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-md border border-[#FAF4F2] flex items-center gap-1.5 text-xs font-medium text-[#050316]">
                <div className="flex text-[#f97415]">
                  <Star className="w-3.5 h-3.5 fill-[#f97415]" />
                  <Star className="w-3.5 h-3.5 fill-[#f97415]" />
                  <Star className="w-3.5 h-3.5 fill-[#f97415]" />
                  <Star className="w-3.5 h-3.5 fill-[#f97415]" />
                  <Star className="w-3.5 h-3.5 fill-[#f97415]" />
                </div>
                <span className='font-subheading'>4.9 rated</span>
              </div>

            </div>
          </div>

        </div>

        {/* Company Logotypes Ticker Row at bottom of Hero */}
        <div className="relative z-10 mt-14 sm:mt-12 pt-4 sm:pt-5 border-t border-[#dddbff] flex items-center justify-between sm:justify-between flex-wrap gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-bold text-[#050316]/40 tracking-wider uppercase px-1 sm:px-2">
          <span>TCS</span>
          <span>Infosys</span>
          <span>Wipro</span>
          <span>Zoho</span>
          <span>Capgemini</span>
        </div>
      </section>

      {/* Featured Job Banner (Always visible if a job is returned, acts like a sponsored slot) */}
      {!isPending && featuredJob && (
        <section className="relative rounded-xl overflow-hidden bg-slate-900 p-6 sm:p-8 shadow-sm">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start md:items-center gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-slate-800">
                {featuredJob.companyLogo ? (
                  <img src={featuredJob.companyLogo} alt={featuredJob.company} className="w-full h-full object-contain p-1.5" loading="lazy" />
                ) : (
                  <span className="font-bold text-slate-800 text-lg">
                    {featuredJob.company.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-orange-400 border border-orange-400/30 bg-orange-400/10 text-[11px] font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Featured Opportunity
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {featuredJob.title}
                  <span className="text-slate-400 font-medium text-lg ml-2">at {featuredJob.company}</span>
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-slate-300 text-sm">
                  <span className="flex items-center gap-1">{featuredJob.location}</span>
                  {featuredJob.salary && (
                    <>
                      <span className="text-slate-600">|</span>
                      <span className="text-emerald-400 font-medium">{featuredJob.salary}</span>
                    </>
                  )}
                  {featuredJob.eligibleBatches?.length > 0 && (
                    <>
                      <span className="text-slate-600">|</span>
                      <span>Batch {featuredJob.eligibleBatches.join(', ')}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Link
              href={`/${typeof featuredJob.slug === 'string' ? featuredJob.slug : featuredJob.slug?.current || featuredJob._id}`}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold text-sm shadow-sm hover:bg-orange-600 transition-colors shrink-0"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <JobFilter filters={initialFilters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />

      {/* Main Feed + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-500 px-1 border-b border-slate-100 pb-3">
            <span>
              <strong className="text-slate-900 font-semibold">{initialJobs.length}</strong> opportunities matching criteria
            </span>
            <button
              onClick={() => router.refresh()}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-orange-600 transition-colors"
              aria-label="Refresh job listings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPending ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {isPending ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading jobs">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-36 rounded-xl bg-slate-100 animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : initialJobs.length > 0 ? (
            <div className="space-y-4">
              {regularJobs.map((job, idx) => (
                <React.Fragment key={job._id}>
                  <JobCard job={job} />
                  {/* Insert native ad early in the feed so it's always visible even with few jobs */}
                  {idx === 0 && <AdSpot type="native" spotName="Home Feed Native" pageName="Homepage" />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
              <BriefcaseBusiness className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-semibold text-slate-900">
                No opportunities match your criteria
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">Please try adjusting your filters or search query to find more roles.</p>
              <button onClick={handleResetFilters} className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-50 text-orange-700 text-sm font-semibold hover:bg-orange-100 transition-colors">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Trending */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-md bg-sky-50 flex items-center justify-center border border-sky-100">
                <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Trending Roles</h3>
            </div>
            <div className="space-y-2">
              {initialJobs.slice(0, 4).map((tJob, idx) => (
                <Link key={tJob._id} href={`/${typeof tJob.slug === 'string' ? tJob.slug : tJob.slug?.current || tJob._id}`}
                  className="flex items-start gap-3 p-2.5 rounded-lg border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all group">
                  <span className="text-xs font-bold text-slate-300 w-4 shrink-0 mt-0.5">{idx + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-slate-800 group-hover:text-orange-600 transition-colors truncate">{tJob.title}</div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{tJob.company} · {tJob.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Career Tools */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Candidate Tools</h3>
            <div className="space-y-3">
              <Link href="/tools/cgpa-converter" className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all group">
                <div className="w-9 h-9 rounded-md bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Calculator className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">CGPA Converter</div>
                  <div className="text-[11px] text-slate-500">Standardized GPA calculation</div>
                </div>
              </Link>
              <Link href="/tools/cold-email-generator" className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all group">
                <div className="w-9 h-9 rounded-md bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 transition-colors">Referral Generator</div>
                  <div className="text-[11px] text-slate-500">Draft professional outreach</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900 p-6 shadow-sm border border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-semibold text-white">Career Notifications</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive curated updates on newly posted roles matching your profile. Unsubscribe at any time.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3 mt-2">
                <input type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={subscribeStatus === 'loading'}
                  className="w-full text-sm bg-slate-800/80 text-white placeholder-slate-400 border border-slate-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:opacity-50" />

                <button type="submit" disabled={subscribeStatus === 'loading'} className="w-full py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors shadow-sm disabled:opacity-50">
                  {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>

                {isLocallySubscribed ? (
                  <p className="text-[11px] text-emerald-400 font-medium text-center flex items-center justify-center gap-1.5 mt-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    You are already subscribed to JobBase
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400 text-center leading-tight">
                    By subscribing, you opt-in to receive career updates and newsletters.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar Ad Spot */}
          <div className="mt-6">
            <AdSpot type="sidebar" spotName="Home Sidebar" pageName="Homepage" />
          </div>

        </aside>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 fade-in-up">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
            toast.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
              'bg-sky-50 text-sky-800 border-sky-200'
            }`}>
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Zap className="w-4 h-4" />}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
