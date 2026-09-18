'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Job, FilterState } from '@/types';
import { JobCard } from './JobCard';
import { JobFilter } from './JobFilter';
import { Loader2, BriefcaseBusiness, RefreshCw } from 'lucide-react';

interface JobsClientProps {
  initialJobs: Job[];
  initialFilters: FilterState;
  initialHasMore: boolean;
}

export function JobsClient({ initialJobs, initialFilters, initialHasMore }: JobsClientProps) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setJobs(initialJobs);
    setHasMore(initialHasMore);
  }, [initialJobs, initialHasMore]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const params = new URLSearchParams();
    const queryKey = key === 'searchQuery' ? 'q' : key;
    if (value && value !== 'All' && key !== 'searchQuery') params.set(queryKey, value);
    startTransition(() => router.push(`/jobs${params.toString() ? `?${params}` : ''}`));
  };

  const resetFilters = () => startTransition(() => router.push('/jobs'));

  const loadMore = async () => {
    setLoadingMore(true);
    const params = new URLSearchParams({ limit: '12', offset: String(jobs.length) });
    Object.entries(initialFilters).forEach(([key, value]) => {
      if (key !== 'searchQuery' && value && value !== 'All') params.set(key, value);
    });

    try {
      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();
      setJobs((current) => [...current, ...(data.jobs || [])]);
      setHasMore(Boolean(data.hasMore));
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1D74C1]">Job board</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-bold text-[#000000] font-subheading">Find your next opportunity</h1>
        <p className="mt-3 text-sm text-slate-500">Browse every verified role and narrow the list with filters.</p>
      </div>

      <JobFilter filters={initialFilters} onFilterChange={handleFilterChange} onReset={resetFilters} />

      <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-3 text-sm text-slate-500">
        <span><strong className="text-slate-900">{jobs.length}</strong> jobs loaded</span>
        <button onClick={() => router.refresh()} className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-[#1D74C1]" aria-label="Refresh jobs">
          <RefreshCw className={`w-3.5 h-3.5 ${isPending ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {isPending ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5" aria-busy="true">
          {[1, 2, 3, 4].map((item) => <div key={item} className="h-44 rounded-xl bg-slate-100 animate-pulse" />)}
        </div>
      ) : jobs.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>
      ) : (
        <div className="mt-5 py-16 text-center bg-[#F3F7FE] border border-[#d0e5f7] rounded-xl">
          <BriefcaseBusiness className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">No jobs match these filters.</p>
        </div>
      )}

      {hasMore && (
        <button onClick={loadMore} disabled={loadingMore} className="mt-8 mx-auto flex items-center justify-center gap-2 min-h-11 px-5 rounded-lg bg-[#1D74C1] text-white text-sm font-semibold hover:bg-[#175fa3] disabled:opacity-60">
          {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
          {loadingMore ? 'Loading jobs...' : 'Load more jobs'}
        </button>
      )}
    </div>
  );
}
