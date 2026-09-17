'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Search, Sparkles } from 'lucide-react';
import { Job, SearchIntent } from '@/types';
import { JobCard } from './JobCard';

interface SearchResultsClientProps {
  query: string;
  mode: string;
  intentParam: string;
  location: string;
}

function getIntent(value: string): SearchIntent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as SearchIntent;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function intentTokens(intent: SearchIntent) {
  return Array.from(new Set([
    ...(intent.company || []),
    ...(intent.location || []),
    ...(intent.qualification || []),
    ...(intent.batch || []),
    ...(intent.keywords || []),
  ])).filter((token) => token.length > 1);
}

export function SearchResultsClient({ query, mode, intentParam, location }: SearchResultsClientProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const intent = getIntent(intentParam);
  const isAiSearch = mode === 'ai_search';

  const fetchResults = async (offset: number, append: boolean) => {
    const params = new URLSearchParams({ limit: '12', offset: String(offset) });
    if (isAiSearch && intent) {
      params.set('keywords', intentTokens(intent).join(','));
    } else if (query.trim()) {
      params.set('keywords', query.trim().split(/\s+/).join(','));
    }
    if (location && location !== 'All') params.set('location', location);

    const response = await fetch(`/api/jobs?${params}`);
    const data = await response.json();
    setJobs((current) => append ? [...current, ...(data.jobs || [])] : (data.jobs || []));
    setHasMore(Boolean(data.hasMore));
  };

  useEffect(() => {
    setLoading(true);
    fetchResults(0, false).finally(() => setLoading(false));
  }, [query, mode, intentParam, location]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      await fetchResults(jobs.length, true);
    } finally {
      setLoadingMore(false);
    }
  };

  const hasSearchInput = Boolean(query.trim() || (isAiSearch && intent));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
          {isAiSearch ? <Sparkles className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          {isAiSearch ? 'AI search' : 'Search results'}
        </div>
        <h1 className="mt-3 text-3xl sm:text-5xl font-bold text-[#050316] font-subheading">
          {isAiSearch ? 'Roles matched to your intent' : `Results for “${query}”`}
        </h1>
        {intent && (
          <div className="mt-4 flex flex-wrap gap-2">
            {intent.company?.map((item) => <span key={`company-${item}`} className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-700">Company: {item}</span>)}
            {intent.location?.map((item) => <span key={`location-${item}`} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">Location: {item}</span>)}
            {intent.batch?.map((item) => <span key={`batch-${item}`} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">Batch: {item}</span>)}
          </div>
        )}
      </div>

      {!hasSearchInput ? (
        <div className="mt-10 py-16 text-center bg-white border border-slate-200 rounded-xl">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Enter a search query to find matching jobs.</p>
          <Link href="/jobs" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">Browse all jobs <ArrowRight className="w-4 h-4" /></Link>
        </div>
      ) : loading ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5" aria-busy="true">
          {[1, 2, 3, 4].map((item) => <div key={item} className="h-44 rounded-xl bg-slate-100 animate-pulse" />)}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <p className="mt-8 mb-4 text-sm text-slate-500"><strong className="text-slate-900">{jobs.length}</strong> jobs loaded</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
          {hasMore && <button onClick={loadMore} disabled={loadingMore} className="mt-8 mx-auto flex items-center gap-2 min-h-11 px-5 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 disabled:opacity-60">
            {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
            {loadingMore ? 'Loading jobs...' : 'Load more results'}
          </button>}
        </>
      ) : (
        <div className="mt-8 py-16 text-center bg-white border border-slate-200 rounded-xl">
          <p className="text-sm text-slate-500">No matching jobs found. Try a broader search.</p>
        </div>
      )}
    </div>
  );
}
