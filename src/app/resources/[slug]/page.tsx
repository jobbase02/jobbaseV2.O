'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ResourceItem } from '@/types';
import {
  ArrowLeft, Download, ExternalLink, FileText, FileArchive, File,
  CheckCircle, AlertTriangle, Loader2, ZoomIn, ZoomOut, RotateCw,
  BookOpen, Tag,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getSafeResourceUrl } from '@/lib/url-security';

type ViewerMode = 'pdf-native' | 'gdocs' | 'download-only' | 'loading' | 'error';

function getFormatIcon(format: string) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return <FileText className="w-5 h-5 text-red-500" />;
  if (f === 'ZIP') return <FileArchive className="w-5 h-5 text-amber-500" />;
  if (f === 'DOCX' || f === 'DOC') return <File className="w-5 h-5 text-blue-500" />;
  return <File className="w-5 h-5 text-slate-500" />;
}

function getFormatBadgeClass(format: string) {
  const f = format?.toUpperCase();
  if (f === 'PDF') return 'bg-red-50 text-red-700 border-red-200';
  if (f === 'ZIP') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (f === 'DOCX' || f === 'DOC') return 'bg-blue-50 text-blue-700 border-blue-200';
  return 'bg-slate-50 text-slate-700 border-slate-200';
}

export default function ResourceViewerPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [resource, setResource] = useState<ResourceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewerMode, setViewerMode] = useState<ViewerMode>('loading');
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fetch resource data
  useEffect(() => {
    if (!slug) return;

    async function load() {
      try {
        const res = await fetch(`/api/resources/by-slug?slug=${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        if (data.resource) {
          setResource(data.resource);
          detectViewerMode(data.resource);
        } else {
          setViewerMode('error');
        }
      } catch {
        setViewerMode('error');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  function detectViewerMode(r: ResourceItem) {
    const fmt = r.format?.toUpperCase();
    if (fmt === 'PDF') {
      setViewerMode('pdf-native');
    } else if (fmt === 'DOCX' || fmt === 'DOC') {
      // Google Docs Viewer for Word documents
      setViewerMode('gdocs');
    } else if (fmt === 'ZIP' || fmt === 'RAR') {
      // Archives can't be previewed — offer download only
      setViewerMode('download-only');
    } else {
      // Try Google Docs Viewer for anything else
      setViewerMode('gdocs');
    }
  }

  const getViewerSrc = (r: ResourceItem): string => {
    const safeUrl = getSafeResourceUrl(r.file_url);
    if (!safeUrl) return '';
    if (viewerMode === 'pdf-native') {
      return safeUrl;
    }
    if (viewerMode === 'gdocs') {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(safeUrl)}&embedded=true`;
    }
    return safeUrl;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Loading resource...</p>
      </div>
    );
  }

  if (!resource || viewerMode === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-400" />
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Resource not found
        </h2>
        <p className="text-sm text-slate-500 max-w-sm">
          This resource may have been moved or is unavailable.
        </p>
        <Link href="/resources" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-sm btn-press">
          <ArrowLeft className="w-4 h-4" /> Back to Resources
        </Link>
      </div>
    );
  }

  const safeResourceUrl = getSafeResourceUrl(resource.file_url);
  if (!safeResourceUrl) {
    return <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">This resource URL is unavailable.</div>;
  }

  return (
    <div className="space-y-5 fade-in-up">

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Resources
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={safeResourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Original
          </a>
          <a
            href={safeResourceUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all btn-press"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>

      {/* Resource Info Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
            {getFormatIcon(resource.format)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border font-mono ${getFormatBadgeClass(resource.format)}`}>
                {resource.format}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">{resource.file_size}</span>
              <span className="text-[11px] text-slate-300">•</span>
              <span className="text-[11px] text-indigo-600 font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {resource.category}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {resource.title}
            </h1>
            {resource.description && (
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                {resource.description}
              </p>
            )}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <Tag className="w-3 h-3 text-slate-400" />
                {resource.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0 self-start">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Free Access
          </div>
        </div>
      </div>

      {/* File Viewer */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">

        {/* Viewer Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            {viewerMode === 'pdf-native' && (
              <>
                <FileText className="w-4 h-4 text-red-500" />
                PDF Viewer
              </>
            )}
            {viewerMode === 'gdocs' && (
              <>
                <File className="w-4 h-4 text-blue-500" />
                Document Viewer
              </>
            )}
            {viewerMode === 'download-only' && (
              <>
                <FileArchive className="w-4 h-4 text-amber-500" />
                Archive File
              </>
            )}
          </div>
          {(viewerMode === 'pdf-native' || viewerMode === 'gdocs') && (
            <a
              href={safeResourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open full screen
            </a>
          )}
        </div>

        {/* Viewer Body */}
        {viewerMode === 'download-only' ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
              <FileArchive className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Preview not available for {resource.format} files
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                Archive files need to be downloaded to view their contents. Click below to download.
              </p>
            </div>
            <a
              href={safeResourceUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm shadow-sm hover:opacity-90 transition-all btn-press"
            >
              <Download className="w-4 h-4" />
              Download {resource.format} File
            </a>
          </div>
        ) : (
          <div className="relative" style={{ height: '75vh', minHeight: '500px' }}>
            {/* Loading overlay */}
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 space-y-3">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <p className="text-sm text-slate-500 font-medium">
                  {viewerMode === 'gdocs' ? 'Loading document viewer...' : 'Loading PDF...'}
                </p>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={getViewerSrc(resource)}
              className="w-full h-full border-0"
              onLoad={() => setIframeLoading(false)}
              onError={() => {
                setIframeLoading(false);
                // If gdocs viewer fails, fallback to download-only
                if (viewerMode === 'gdocs') setViewerMode('download-only');
              }}
              title={resource.title}
              allow="fullscreen"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
            />
          </div>
        )}
      </div>

      {/* Bottom note */}
      <p className="text-xs text-slate-400 text-center">
        Having trouble viewing? <a href={safeResourceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Open directly</a> or <a href={safeResourceUrl} download className="text-indigo-600 hover:underline font-medium">download the file</a>.
      </p>

    </div>
  );
}
