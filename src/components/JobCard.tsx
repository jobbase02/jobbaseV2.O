'use client';

import React from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { MapPin, ArrowUpRight, Clock, GraduationCap } from 'lucide-react';

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
    ? 'bg-[#F3F7FE] text-[#1D74C1]'
    : 'bg-[#e8f1fb] text-[#1D74C1]';

  const displayExperience = job.experienceLevel?.toLowerCase().includes('fresh') ? 'Entry Level' : job.experienceLevel;

  return (
    <article className={`group relative bg-[#F6F6FE] border rounded-xl p-5 transition-all duration-200 overflow-hidden flex flex-col justify-between ${featured
      ? 'border-[#1D74C1]/30 shadow-sm bg-[#F3F7FE]'
      : 'border-[#d0e5f7] hover:border-[#1D74C1]/40 hover:shadow-md'
      }`}>
      {/* Top accent bar for featured */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1D74C1]" />
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
            <h3 className="text-xl font-semibold text-[#000000] leading-snug group-hover:text-[#1D74C1] transition-colors line-clamp-2 font-subheading tracking-normal">
              {job.title}
            </h3>
          </Link>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5 font-subheading ">
          {job.salary && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-[#e8f1fb] text-[#1D74C1]">
              {job.salary}
            </span>
          )}
          {job.eligibleBatches && job.eligibleBatches.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-[#F3F7FE] text-[#353535]">
              <GraduationCap className="w-3 h-3 text-[#1D74C1]" />
              Batch {job.eligibleBatches.join(', ')}
            </span>
          )}
          {displayExperience && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-[#F3F7FE] text-[#353535]">
              {displayExperience}
            </span>
          )}
          {job.workMode && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-[#F3F7FE] text-[#353535]">
              {job.workMode}
            </span>
          )}
        </div>

      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
        <Link
          href={`/${slug}`}
          className="text-xs font-semibold text-[#353535]/60 hover:text-[#1D74C1] transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/${slug}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1D74C1] hover:bg-[#175fa3] text-white text-xs font-bold shadow-sm transition-colors btn-press"
        >
          Apply
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </article>
  );
};
