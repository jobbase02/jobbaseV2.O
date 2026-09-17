'use client';

import React, { useState, useEffect } from 'react';
import { ResourceItem } from '@/types';
import {
  BookOpen, Download, Eye, FileText, FileArchive,
  File, Search, SlidersHorizontal, ShieldCheck, Sparkles
} from 'lucide-react';

function FormatIcon({ format }: { format: string }) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return <FileText className="w-5 h-5 text-red-500" />;
  if (f === 'ZIP') return <FileArchive className="w-5 h-5 text-amber-500" />;
  if (f === 'DOCX' || f === 'DOC') return <File className="w-5 h-5 text-sky-500" />;
  return <File className="w-5 h-5 text-slate-400" />;
}

function formatBadgeClass(format: string) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return 'bg-red-50 text-red-700 border-red-200';
  if (f === 'ZIP') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (f === 'DOCX' || f === 'DOC') return 'bg-sky-50 text-sky-700 border-sky-200';
  return 'bg-slate-50 text-slate-600 border-slate-200';
}

function getMaskedUrl(url: string) {
  if (!url) return '#';
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('supabase.co')) {
      const pathParts = urlObj.pathname.split('/storage/v1/object/public/');
      if (pathParts.length > 1) {
        return `/files/${pathParts[1]}`;
      }
    }
    return url;
  } catch (e) {
    return url;
  }
}

function getViewerUrl(item: ResourceItem) {
  const f = item.format?.toUpperCase();
  const maskedUrl = getMaskedUrl(item.file_url);

  if (f === 'DOCX' || f === 'DOC') {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(item.file_url)}&embedded=true`;
  }
  return maskedUrl;
}

export default function ResourceList({ resources }: { resources: ResourceItem[] }) {
  const [filtered, setFiltered] = useState<ResourceItem[]>(resources);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Interview Roadmaps', 'PDF Cheatsheets', 'Resume Templates'];

  useEffect(() => {
    let result = resources;
    if (selectedCategory !== 'All') {
      result = result.filter(r => r.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    setFiltered(result);
  }, [searchQuery, selectedCategory, resources]);

  return (
    <div className="w-full max-w-[90%] mx-auto py-6 sm:py-10 space-y-8 fade-in-up">

      {/* Header Card */}
      <div className="bg-[#fbfbfe] border border-[#dddbff] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#f97415]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f97415] font-avenue">
              <BookOpen className="w-4 h-4 text-[#f97415]" />
              <span>Candidate Knowledge Base</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#050316] bg-white border border-[#dddbff] px-3 py-1.5 rounded-full shadow-2xs font-subheading">
              <ShieldCheck className="w-4 h-4 text-[#f97415]" />
              Direct Download &amp; Open Access
            </div>
          </div>

          <h1 className="text-[1.8rem] sm:text-4xl lg:text-5xl font-medium text-[#050316] font-body tracking-tight leading-tight max-w-full sm:max-w-3xl">
            Free <span className="text-[#f97415] font-avenue font-semibold">career roadmaps,</span> ATS templates &amp; interview guides
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-body max-w-2xl leading-relaxed">
            Curated ATS resume templates, systems design roadmaps, and technical interview cheatsheets. Free to view or download instantly.
          </p>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roadmaps, ATS templates, tags..."
            className="w-full text-xs sm:text-sm bg-white text-[#050316] placeholder-slate-400 border border-[#dddbff] focus:border-[#f97415] rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all shadow-2xs font-body"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 md:pb-0 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400  shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all font-subheading ${selectedCategory === cat
                ? 'bg-[#050316] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-[#dddbff] hover:border-[#f97415]/50 hover:text-[#f97415]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-[#f97415]/50 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xs hover:shadow-md transition-all duration-300 group card-hover"
            >
              {/* Top */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#fbfbfe] border border-[#dddbff] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <FormatIcon format={item.format} />
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    <span className={`text-[11px] font-bold font-subheading px-2.5 py-0.5 rounded-md border ${formatBadgeClass(item.format)}`}>
                      {item.format}
                    </span>
                    <span className="text-xs text-slate-400 font-subheading font-medium">{item.file_size}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-base sm:text-lg font-bold text-[#050316] font-subheading group-hover:text-[#f97415] transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-body line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-slate-600 bg-[#fbfbfe] px-2.5 py-0.5 rounded-md border border-[#dddbff] font-subheading">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                {/* View button */}
                <a
                  href={getViewerUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f97415] hover:bg-[#ea6305] text-white text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all btn-press font-subheading"
                  title={`View ${item.format}`}
                >
                  <Eye className="w-4 h-4" />
                  View File
                </a>

                {/* Download button */}
                <a
                  href={getMaskedUrl(item.file_url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#dddbff] bg-[#fbfbfe] text-[#050316] text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors shadow-2xs font-subheading"
                  title="Download file"
                >
                  <Download className="w-4 h-4 text-[#f97415]" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#fbfbfe] border border-[#dddbff] rounded-2xl space-y-3 shadow-xs">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#050316] font-subheading">
            {searchQuery ? `No resources matching "${searchQuery}"` : 'No resources available'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-body">
            {searchQuery ? 'Try adjusting your search keyword or selecting a different category.' : 'Check back soon for new interview guides & roadmaps.'}
          </p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="mt-2 text-xs sm:text-sm font-semibold text-[#f97415] hover:underline font-subheading">
              Clear Search Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
