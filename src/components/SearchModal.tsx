'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SearchIntent, Job } from '@/types';
import { Search, Sparkles, X, ArrowRight, Loader2, Command } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJob?: (job: Job) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [intent, setIntent] = useState<SearchIntent | null>(null);
  const [results, setResults] = useState<Job[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setIntent(null);
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      // 1. Extract search intent via API
      const intentRes = await fetch('/api/search-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const intentData = await intentRes.json();
      const extractedIntent: SearchIntent = intentData.intent || {
        batch: [],
        domain: [],
        location: [],
        company: [],
        qualification: [],
        experience: 'Any',
        keywords: [],
      };

      setIntent(extractedIntent);

      // 2. Build flexible search tokens combining company, location, batch, qualification & keywords
      const allTokens = Array.from(new Set([
        ...(extractedIntent.company || []),
        ...(extractedIntent.location || []),
        ...(extractedIntent.qualification || []),
        ...(extractedIntent.batch || []),
        ...(extractedIntent.keywords || []),
        ...query.toLowerCase().split(/\s+/)
      ])).filter(t => t.length > 1);

      const params = new URLSearchParams();
      if (allTokens.length > 0) {
        params.set('keywords', allTokens.join(','));
      }

      const jobsRes = await fetch(`/api/jobs?${params.toString()}`);
      const jobsData = await jobsRes.json();
      setResults(jobsData.jobs || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    'wipro 2025 class hiring update',
    'btech 2022 class software developer in delhi or wipro',
    'CRED or Stripe 2025 entry level remote internship',
    'product designer jobs in bangalore for 2024 class',
  ];

  const seeAllHref = intent
    ? `/search?mode=ai_search&intent=${encodeURIComponent(JSON.stringify(intent))}`
    : '/search';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 bg-neutral-950/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Command Modal Card */}
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88vh]">
        
        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="ai-search-input relative border-b border-neutral-200 p-3.5 sm:p-4 flex items-center gap-2.5">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type prompt (e.g. 'wipro 2025 batch' or 'btech in delhi')..."
            className="w-full text-sm sm:text-base font-semibold bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-3.5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-xs font-bold disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            Smart Search
          </button>
        </form>

        {/* Results / Intent area */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* AI Extracted Intent Badges */}
          {intent && (
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-neutral-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Extracted Intent:
              </span>
              {intent.company && intent.company.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-bold border border-orange-200">
                  Company: {intent.company.join(', ')}
                </span>
              )}
              {intent.batch && intent.batch.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono font-bold border border-neutral-200">
                  Batch: {intent.batch.join(', ')}
                </span>
              )}
              {intent.location && intent.location.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-medium border border-neutral-200">
                  Location: {intent.location.join(', ')}
                </span>
              )}
              {intent.qualification && intent.qualification.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-medium border border-neutral-200">
                  Degree: {intent.qualification.join(', ')}
                </span>
              )}
            </div>
          )}

          {/* Results List */}
          {loading ? (
            <div className="py-10 text-center text-xs sm:text-sm text-neutral-500 flex flex-col items-center gap-2 font-medium">
              <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              <span>Matching job updates across company, class & title...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Matching Hiring Updates ({results.length})
              </div>
              {results.map((j) => {
                const slugStr = typeof j.slug === 'string' ? j.slug : j.slug?.current || j._id;
                return (
                  <Link
                    key={j._id}
                    href={`/${slugStr}`}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 transition-all shadow-subtle"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-950 text-sm group-hover:text-orange-600 transition-colors">
                          {j.title}
                        </span>
                        <span className="text-xs font-semibold text-neutral-500">at {j.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 font-medium">
                        <span className="font-bold text-orange-600">{j.opportunityType || 'Full-Time'}</span>
                        <span>•</span>
                        <span>{j.location}</span>
                        <span>•</span>
                        <span className="font-mono">Batch {j.eligibleBatches?.join(', ')}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </Link>
                );
              })}
              <Link
                href={seeAllHref}
                onClick={onClose}
                className="flex items-center justify-center gap-2 min-h-11 rounded-lg bg-orange-50 text-orange-700 text-sm font-semibold hover:bg-orange-100 transition-colors"
              >
                See all AI results <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : hasSearched ? (
            <div className="py-10 text-center text-neutral-500 text-xs sm:text-sm font-medium">
              No matching hiring updates found for this prompt. Try adjusting batch, company, or location keywords.
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Command className="w-3.5 h-3.5" /> Try Natural Language Prompts
              </div>
              <div className="flex flex-col gap-2">
                {sampleQueries.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuery(sample)}
                    className="text-left text-xs text-neutral-700 bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded-xl border border-neutral-200 font-medium transition-colors"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between font-medium">
          <span>Smart Intent Engine</span>
          <span className="font-mono">ESC to close</span>
        </div>

      </div>
    </div>
  );
};
