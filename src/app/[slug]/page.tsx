import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobBySlug, getRecentJobs } from '@/lib/sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { JobCard } from '@/components/JobCard';
import { AdSpot } from '@/components/AdSpot';
import {
  MapPin,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Clock,
  Monitor,
  ChevronRight,
  Calendar,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-slate-900 mt-6 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-4 py-1 text-slate-600 italic my-5 bg-orange-50/50 rounded-r-xl text-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 text-slate-600 text-sm mb-5 pl-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm mb-5">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2 text-sm text-slate-600">
        <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-slate-600 text-sm">{children}</li>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-orange-600 underline underline-offset-2 hover:text-orange-800 font-medium">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
  },
};

export async function generateMetadata({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: 'Role Not Found — JobBase' };
  return {
    title: `${job.title} at ${job.company} — JobBase`,
    description: `Apply for ${job.title} at ${job.company}. Location: ${job.location}. Batch: ${job.eligibleBatches?.join(', ')}. Apply directly from the official portal.`,
  };
}

export default async function JobDetailsPage({ params }: JobPageProps) {
  const { slug } = await params;
  const [job, suggestedJobs] = await Promise.all([
    getJobBySlug(slug),
    getRecentJobs(slug, 3),
  ]);

  if (!job) notFound();

  const formattedDate = job.verifiedAt
    ? new Date(job.verifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  const displayExperience = job.experienceLevel?.toLowerCase().includes('fresh') ? 'Entry Level' : job.experienceLevel;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 sm:pb-10 fade-in-up">

      {/* Breadcrumb */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Listings
      </Link>

      {/* Main Article Card */}
      <article className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

        {/* Top accent */}
        <div className="h-1 bg-orange-500 w-full" />

        <div className="p-6 sm:p-8 space-y-8">

          {/* Header */}
          <header className="space-y-5">

            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                {job.opportunityType || 'Full-Time'}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <BadgeCheck className="w-3.5 h-3.5" /> Verified Role
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200 ml-auto">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>

            {/* Company + Logo */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-bold text-2xl text-slate-800">
                    {job.company.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{job.company}</div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                  {job.location}
                  {job.salary && (
                    <>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-600 font-medium">{job.salary}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {job.title}
            </h1>

            {/* Desktop Apply CTA */}
            <div className="hidden sm:block">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-sm transition-colors btn-press"
              >
                Apply on Official Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </header>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Role Type
              </div>
              <div className="text-sm font-semibold text-slate-900">{job.opportunityType || 'Full-Time'}</div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Batch
              </div>
              <div className="text-sm font-semibold text-slate-900">{job.eligibleBatches?.join(', ') || 'Any'}</div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <Clock className="w-3.5 h-3.5" /> Experience
              </div>
              <div className="text-sm font-semibold text-slate-900">{displayExperience || 'Entry Level'}</div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <Monitor className="w-3.5 h-3.5" /> Work Mode
              </div>
              <div className="text-sm font-semibold text-slate-900">{job.workMode || 'Onsite'}</div>
            </div>
          </div>

          {/* Qualification row */}
          {job.qualification && job.qualification.length > 0 && (
            <div className="p-5 bg-sky-50 border border-sky-100 rounded-lg">
              <div className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-3">Required Education</div>
              <div className="flex flex-wrap gap-2">
                {job.qualification.map((q: string, i: number) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white text-sky-800 border border-sky-200 shadow-sm">{q}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key Requirements */}
          {job.keyDetails && job.keyDetails.length > 0 && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <h2 className="text-sm font-bold text-slate-900">
                Key Requirements
              </h2>
              <ul className="space-y-2.5">
                {job.keyDetails.map((detail: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Job Description */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Role Description
            </h2>
            <div className="text-slate-700 leading-relaxed">
              {Array.isArray(job.description) && job.description.length > 0 ? (
                <PortableText value={job.description} components={portableTextComponents} />
              ) : typeof job.description === 'string' && job.description.trim().length > 0 ? (
                <p className="whitespace-pre-line text-sm text-slate-700">{job.description}</p>
              ) : (
                <div className="text-sm text-slate-700 space-y-3">
                  <p>
                    <strong className="font-semibold text-slate-900">{job.company}</strong> is hiring for the role of{' '}
                    <strong className="font-semibold text-slate-900">{job.title}</strong> ({displayExperience}).
                  </p>
                  <p>
                    Candidates from <strong>{job.eligibleBatches?.join(', ') || 'applicable'}</strong> classes with{' '}
                    <strong>{job.qualification?.join(', ') || 'relevant'}</strong> degrees are encouraged to apply
                    directly via the official portal below.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Apply CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
            <div>
              <div className="text-base font-semibold text-white">Ready to apply?</div>
              <div className="text-sm text-slate-400 mt-1">Clicking below redirects you to {job.company}'s official application portal.</div>
            </div>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold text-sm shadow-sm hover:bg-orange-600 transition-colors btn-press shrink-0"
            >
              Apply Now <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </article>

      <div className="my-8">
        <AdSpot type="banner" spotName="Job Details Banner" pageName="Job Details" />
      </div>

      {/* Related Jobs */}
      {suggestedJobs && suggestedJobs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Similar Opportunities
            </h2>
            <Link href="/" className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {suggestedJobs.map((sJob) => (
              <JobCard key={sJob._id} job={sJob} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Apply Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-slate-200 z-40 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-slate-900 truncate">{job.company}</div>
          <div className="text-xs text-slate-500 truncate">{job.title}</div>
        </div>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm shadow-sm hover:bg-orange-600 btn-press shrink-0 transition-colors"
        >
          Apply <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
