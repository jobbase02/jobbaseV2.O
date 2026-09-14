'use client';

import React from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { MapPin, ArrowUpRight, Clock, GraduationCap, BadgeCheck, Zap } from 'lucide-react';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const slug = typeof job.slug === 'string' ? job.slug : job.slug?.current || job._id;

  const timeAgo = (dateStr?: string) => {
    if (!dateStr) return 'Recently';
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return '1d ago';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const typeColor = job.opportunityType === 'Internship'
    ? 'bg-sky-50 text-sky-700'
    : 'bg-orange-50 text-orange-700';
    
  const displayExperience = job.experienceLevel?.toLowerCase().includes('fresh') ? 'Entry Level' : job.experienceLevel;

  return (
    <article className={`group relative bg-white border rounded-xl p-5 transition-all duration-200 overflow-hidden flex flex-col justify-between ${
      featured
        ? 'border-orange-200 shadow-sm bg-orange-50/20'
        : 'border-slate-200/70 hover:border-orange-200 hover:shadow-md'
    }`}>
      {/* Top accent bar for featured */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
      )}

      <div className="flex flex-col gap-4">

        {/* Header: Logo + Company + Meta */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Company Logo */}
            <div className="w-12 h-12 rounded-lg border border-slate-100 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain p-1.5" />
              ) : (
                <span className="font-bold text-slate-800 text-lg">
                  {job.company.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-sm text-slate-900 truncate">{job.company}</span>
                <BadgeCheck className="w-4 h-4 text-sky-500 shrink-0" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{job.location}</span>
                <span className="text-slate-300">|</span>
                <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>{timeAgo(job.verifiedAt)}</span>
              </div>
            </div>
          </div>

          {/* Type badge */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 ${typeColor}`}>
            {job.opportunityType || 'Full-Time'}
          </span>
        </div>

        {/* Job Title */}
        <div>
          <Link href={`/${slug}`}>
            <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
              {job.title}
            </h3>
          </Link>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5">
          {job.salary && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700">
              {job.salary}
            </span>
          )}
          {job.eligibleBatches && job.eligibleBatches.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600">
              <GraduationCap className="w-3 h-3 text-slate-400" />
              Batch {job.eligibleBatches.join(', ')}
            </span>
          )}
          {displayExperience && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600">
              {displayExperience}
            </span>
          )}
          {job.workMode && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600">
              {job.workMode}
            </span>
          )}
        </div>

      </div>
      
      {/* Footer CTA */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
        <Link
          href={`/${slug}`}
          className="text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/${slug}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-sm transition-colors btn-press"
        >
          Apply
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </article>
  );
};
