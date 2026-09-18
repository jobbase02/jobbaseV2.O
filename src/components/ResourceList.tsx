'use client';

import React, { useState, useEffect } from 'react';
import { ResourceItem } from '@/types';
import {
  BookOpen, Download, FileText, FileArchive,
  File, Search, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';
import { getSafeResourceUrl } from '@/lib/url-security';

function FormatIcon({ format }: { format: string }) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D74C1]" />;
  if (f === 'ZIP') return <FileArchive className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D74C1]" />;
  if (f === 'DOCX' || f === 'DOC') return <File className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D74C1]" />;
  return <File className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D74C1]" />;
}

function getMaskedUrl(url: string) {
  const safeUrl = getSafeResourceUrl(url);
  if (!safeUrl) return '#';
  try {
    const urlObj = new URL(safeUrl);
    if (urlObj.pathname.startsWith('/storage/v1/object/public/')) {
      const pathParts = urlObj.pathname.split('/storage/v1/object/public/');
      if (pathParts.length > 1) {
        return `/files/${pathParts[1]}`;
      }
    }
    return '#';
  } catch {
    return '#';
  }
}

function getViewerUrl(item: ResourceItem) {
  const f = item.format?.toUpperCase();
  const safeUrl = getSafeResourceUrl(item.file_url);
  if (!safeUrl) return '#';
  const maskedUrl = getMaskedUrl(item.file_url);

  if (f === 'DOCX' || f === 'DOC') {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(safeUrl)}&embedded=true`;
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
    <div className="w-full space-y-8 fade-in-up">

      {/* Header Section (Simple & SEO Friendly) */}
      <div className="max-w-3xl space-y-3 pb-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] font-poppins tracking-tight">
          Free Career Resources &amp; Guides
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-body leading-relaxed">
          Download our curated collection of free resources, including ATS-friendly resume templates, system design roadmaps, and technical interview cheatsheets to accelerate your job search.
        </p>
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
            className="w-full text-xs sm:text-sm bg-[#fcfafe] text-[#000000] placeholder-slate-400 border border-[#d0e5f7] focus:border-[#1D74C1] rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all shadow-2xs font-body"
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
                ? 'bg-[#1D74C1] text-white shadow-xs'
                : 'bg-white text-[#353535] border border-[#d0e5f7] hover:border-[#1D74C1]/50 hover:text-[#1D74C1]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((item) => {
            const visibleTags = item.tags?.slice(0, 2) || [];
            const remainingCount = (item.tags?.length || 0) - visibleTags.length;

            return (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-[26px] p-5 sm:p-6 flex flex-col justify-between bg-[#F6F6FE] border border-[#c4ddf7] shadow-[0_3px_14px_-2px_rgba(28,73,128,0.07),inset_0_1px_0_rgba(255,255,255,0.7)] hover:shadow-[0_16px_34px_-6px_rgba(28,73,128,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-1 hover:border-[#1D74C1]/40 transition-all duration-300 group min-h-[265px]"
              >
                {/* Ambient corner highlights */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/60 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#1D74C1]/8 rounded-full blur-xl pointer-events-none" />

                {/* Top Section: Category & File Spec */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#b8d6f5] text-[11px] font-semibold text-[#1C4980] shadow-2xs font-poppins">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D74C1]" />
                      <span>{item.category}</span>
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#b8d6f5] text-[11px] font-bold text-[#1D74C1] shadow-2xs font-subheading">
                      <FormatIcon format={item.format} />
                      <span>{item.format}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-semibold text-[#0D273C]/70">{item.file_size}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h2 className="text-[17px] sm:text-[18px] font-bold font-poppins text-[#000000] group-hover:text-[#1D74C1] transition-colors tracking-tight leading-snug line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#0D273C]/75 font-poppins line-clamp-2 leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Topic / Skill Pills (Refined reference tags with +N count) */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4">
                    {visibleTags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium font-poppins text-[#1C4980] bg-white/85 px-3 py-1 rounded-full border border-[#c4ddf7] shadow-2xs hover:bg-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span
                        className="text-xs font-semibold font-poppins text-[#1C4980] bg-white/85 px-2.5 py-1 rounded-full border border-[#c4ddf7] shadow-2xs"
                        title={item.tags?.slice(2).join(', ')}
                      >
                        +{remainingCount}
                      </span>
                    )}
                    {visibleTags.length === 0 && (
                      <span className="text-xs font-medium font-poppins text-[#1C4980] bg-white/85 px-3 py-1 rounded-full border border-[#c4ddf7] shadow-2xs">
                        Free Material
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Dock: Action Row */}
                <div className="mt-6 pt-4 border-t border-[#c4ddf7]/70 relative z-10 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#1C4980] font-poppins">
                    Free Guide
                  </span>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={getMaskedUrl(item.file_url)}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#1C4980] hover:text-[#1D74C1] hover:bg-white/90 border border-[#b8d6f5] flex items-center justify-center shadow-2xs transition-all active:scale-95"
                      title="Direct Download"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                    <a
                      href={getViewerUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-4.5 sm:py-2 rounded-full bg-[#1D74C1] hover:bg-[#175fa3] text-white text-xs sm:text-sm font-semibold font-subheading shadow-xs hover:shadow transition-all active:scale-95"
                    >
                      <span>Start</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#F3F7FE] border border-[#d0e5f7] rounded-2xl space-y-3 shadow-xs">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#000000] font-poppins">
            {searchQuery ? `No resources matching "${searchQuery}"` : 'No resources available'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-body">
            {searchQuery ? 'Try adjusting your search keyword or selecting a different category.' : 'Check back soon for new interview guides & roadmaps.'}
          </p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="mt-2 text-xs sm:text-sm font-semibold text-[#1D74C1] hover:underline font-subheading">
              Clear Search Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
