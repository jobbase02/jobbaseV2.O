'use client';

import React, { useState, useEffect } from 'react';
import { ResourceItem } from '@/types';
import {
  BookOpen, Download, Eye, FileText, FileArchive,
  File, Search, SlidersHorizontal, ShieldCheck
} from 'lucide-react';

function FormatIcon({ format }: { format: string }) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return <FileText className="w-4 h-4 text-red-500" />;
  if (f === 'ZIP') return <FileArchive className="w-4 h-4 text-amber-500" />;
  if (f === 'DOCX' || f === 'DOC') return <File className="w-4 h-4 text-sky-500" />;
  return <File className="w-4 h-4 text-slate-400" />;
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
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600">
          <BookOpen className="w-3.5 h-3.5" />
          Candidate Resources
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Knowledge Base
          </h1>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            Open Access
          </div>
        </div>
        <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
          Curated ATS resume templates, systems design roadmaps, and technical interview guides. Available for direct download.
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, tags..."
            className="w-full text-sm bg-white text-slate-900 placeholder-slate-400 border border-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-200 hover:text-orange-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-5 shadow-sm card-hover"
            >
              {/* Top */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <FormatIcon format={item.format} />
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md border ${formatBadgeClass(item.format)}`}>
                      {item.format}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{item.file_size}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {/* View button */}
                <a
                  href={getViewerUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 transition-colors btn-press"
                  title={`View ${item.format}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </a>

                {/* Download button */}
                <a
                  href={getMaskedUrl(item.file_url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
                  title="Download file"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-900">
            {searchQuery ? `No results for "${searchQuery}"` : 'No resources available'}
          </h3>
          <p className="text-sm text-slate-500">
            {searchQuery ? 'Please try adjusting your search term.' : 'Check back later for new materials.'}
          </p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="mt-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};
