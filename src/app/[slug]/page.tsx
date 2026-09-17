import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobBySlug, getRecentJobs } from '@/lib/sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { AdSpot } from '@/components/AdSpot';
import { ShareButton } from '@/components/ShareButton';
import { getSafeExternalUrl } from '@/lib/url-security';
import {
  MapPin,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
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

function RelatedOpportunity({ job }: { job: NonNullable<Awaited<ReturnType<typeof getRecentJobs>>>[number] }) {
  const jobSlug = typeof job.slug === 'string' ? job.slug : job.slug?.current || job._id;
  const batches = job.eligibleBatches?.join(', ') || 'Any batch';

  return (
    <Link
      href={`/${jobSlug}`}
      className="group flex items-center gap-3 border-b border-slate-200 py-4 last:border-b-0"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
        {job.companyLogo ? (
          <img src={job.companyLogo} alt="" className="h-full w-full object-contain p-1.5" />
        ) : (
          <span className="text-xs font-bold text-slate-500">{job.company.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
          {job.title}
        </h3>
        <p className="mt-1 truncate text-xs text-slate-500">
          {job.location} <span className="px-1 text-slate-300">·</span> Batch {batches}
        </p>
      </div>
    </Link>
  );
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
    link: ({ value, children }) => {
      const href = getSafeExternalUrl(value?.href);
      return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange-600 underline underline-offset-2 hover:text-orange-800 font-medium">
          {children}
        </a>
      ) : <span>{children}</span>;
    },
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
    <div className="font-article w-full max-w-7xl mx-auto space-y-6 px-4 sm:px-8 lg:px-12 pb-24 sm:pb-10 pt-4 fade-in-up">

      {/* Desktop 2-Column Layout / Mobile 1-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Main Job Article */}
        <div className="lg:col-span-8 space-y-8">

          {/* Breadcrumb & Actions (Left section only) */}
          <div className="flex w-full items-center justify-between border-b border-slate-200 pb-4 lg:pt-[17px]">
            <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Link>
            <ShareButton title={`${job.title} at ${job.company}`} />
          </div>

          <article className="space-y-10">

            <div className="space-y-8">

              {/* Header */}
              <header className="space-y-5 border-b border-slate-200 pb-8">

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
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                    {job.title}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Posted: {formattedDate}
                  </p>
                </div>

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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-b border-slate-200 pb-7">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97415] uppercase tracking-wide mb-1.5 font-subheading">
                    <Briefcase className="w-3.5 h-3.5 text-[#f97415]" /> Role Type
                  </div>
                  <div className="text-sm sm:text-[15px] font-bold text-[#050316] font-subheading">{job.opportunityType || 'Full-Time'}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97415] uppercase tracking-wide mb-1.5 font-subheading">
                    <GraduationCap className="w-3.5 h-3.5 text-[#f97415]" /> Batch
                  </div>
                  <div className="text-sm sm:text-[15px] font-bold text-[#050316] font-subheading">{job.eligibleBatches?.join(', ') || 'Any'}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97415] uppercase tracking-wide mb-1.5 font-subheading">
                    <Clock className="w-3.5 h-3.5 text-[#f97415]" /> Experience
                  </div>
                  <div className="text-sm sm:text-[15px] font-bold text-[#050316] font-subheading">{displayExperience || 'Entry Level'}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97415] uppercase tracking-wide mb-1.5 font-subheading">
                    <Monitor className="w-3.5 h-3.5 text-[#f97415]" /> Work Mode
                  </div>
                  <div className="text-sm sm:text-[15px] font-bold text-[#050316] font-subheading">{job.workMode || 'Onsite'}</div>
                </div>
              </div>

              {/* Qualification row */}
              {job.qualification && job.qualification.length > 0 && (
                <div className="border-b border-slate-200 pb-7">
                  <div className="text-xs font-bold text-[#f97415] uppercase tracking-wide mb-3 flex items-center gap-1.5 font-subheading">
                    <GraduationCap className="w-4 h-4 text-[#f97415]" /> Required Education
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.qualification.map((q: string, i: number) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 font-subheading">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Requirements */}
              {job.keyDetails && job.keyDetails.length > 0 && (
                <div className="border-b border-slate-200 pb-7 space-y-3">
                  <h2 className="text-sm font-semibold font-body text-[#f97415]">
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
                <h2 className="text-base font-semibold text-[#f97415] mb-4 pb-2 border-b border-slate-200 font-body">
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-y border-slate-200 py-6">
                <div>
                  <div className="text-base font-semibold text-slate-900">Ready to apply?</div>
                  <div className="text-sm text-slate-500 mt-1">You will continue to {job.company}'s official application portal.</div>
                  <Link href="/contact?reason=job_listing_report" className="mt-2 inline-block text-xs font-medium text-slate-400 underline underline-offset-2 transition-colors hover:text-blue-600">
                    Report a misleading job posting
                  </Link>
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

          {/* Ad Spot Banner */}
          <div className="my-6">
            <AdSpot type="banner" spotName="Job Details Banner" pageName="Job Details" />
          </div>

          {/* Related Jobs on Mobile ONLY */}
          {suggestedJobs && suggestedJobs.length > 0 && (
            <section className="space-y-4 lg:hidden">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">
                  Similar Opportunities
                </h2>
                <Link href="/" className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div>
                {suggestedJobs.map((sJob) => (
                  <RelatedOpportunity key={sJob._id} job={sJob} />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column: Desktop Sidebar with Related Jobs */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-20">
          {suggestedJobs && suggestedJobs.length > 0 && (
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Similar Opportunities
                </h2>
                <Link href="/" className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div>
                {suggestedJobs.map((sJob) => (
                  <RelatedOpportunity key={sJob._id} job={sJob} />
                ))}
              </div>
            </div>
          )}

          {/* Sidebar Ad Spot */}
          <AdSpot type="sidebar" spotName="Job Details Sidebar" pageName="Job Details" />
        </aside>

      </div>

    </div>
  );
}
