'use client';

import React, { useState, useEffect } from 'react';
import { ResourceItem } from '@/types';
import {
  BookOpen, Download, Eye, FileText, FileArchive,
  File, Search, SlidersHorizontal, ShieldCheck, Sparkles
} from 'lucide-react';
import { getSafeResourceUrl } from '@/lib/url-security';

function FormatIcon({ format }: { format: string }) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return <FileText className="w-6 h-6 text-white" />;
  if (f === 'ZIP') return <FileArchive className="w-6 h-6 text-white" />;
  if (f === 'DOCX' || f === 'DOC') return <File className="w-6 h-6 text-white" />;
  return <File className="w-6 h-6 text-white" />;
}

function getCardGradient(idx: number) {
  const gradients = [
    'bg-gradient-to-br from-indigo-500 to-purple-600',
    'bg-gradient-to-br from-emerald-400 to-teal-600',
    'bg-gradient-to-br from-rose-400 to-red-600',
    'bg-gradient-to-br from-amber-400 to-orange-500',
    'bg-gradient-to-br from-sky-400 to-blue-600',
    'bg-gradient-to-br from-fuchsia-500 to-pink-600',
  ];
  return gradients[idx % gradients.length];
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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#050316] font-subheading tracking-tight">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${getCardGradient(idx)}`}
            >
              {/* Decorative background shapes */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/20 transition-colors" />
              <div className="absolute -left-8 -bottom-8 w-20 h-20 bg-black/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top */}
              <div className="space-y-4 relative z-10 text-white">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/10 backdrop-blur-md group-hover:scale-105 transition-transform">
                    <FormatIcon format={item.format} />
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-auto">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/20 text-white border border-white/10 backdrop-blur-sm">
                      {item.format}
                    </span>
                    <span className="text-[10px] text-white/80 font-subheading font-medium">{item.file_size}</span>
                  </div>
                </div>

                <div className="space-y-1.5 mt-2">
                  <h2 className="text-lg sm:text-xl font-bold font-subheading tracking-tight leading-tight line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-xs text-white/90 font-body line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] text-white/90 bg-white/10 px-2 py-0.5 rounded-md border border-white/10 font-subheading">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-white/20 relative z-10 flex flex-col gap-2.5">
                <a
                  href={getViewerUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  <Eye className="w-4 h-4" /> View File
                </a>
                <a
                  href={getMaskedUrl(item.file_url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/20 text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-black/30 transition-all border border-white/10 active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" /> Download
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
