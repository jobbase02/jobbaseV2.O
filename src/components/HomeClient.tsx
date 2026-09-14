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
  BriefcaseBusiness, Calculator, MessageSquare, Mail, CheckCircle, Zap
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

      {/* Hero */}
      <section className="pt-4 pb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Active Postings — Updated Daily
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Early-Career Roles & <span className="text-orange-500">Technology Opportunities</span>
            </h1>
            <p className="text-base text-slate-500 mt-4 max-w-xl leading-relaxed">
              Discover verified entry-level roles and internships at leading technology companies. Apply directly through official employer portals.
            </p>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search roles or companies..."
              className="w-full text-sm bg-white text-slate-900 placeholder-slate-400 border border-slate-200 rounded-lg pl-10 pr-20 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors">
              Search
            </button>
          </form>
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
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
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
