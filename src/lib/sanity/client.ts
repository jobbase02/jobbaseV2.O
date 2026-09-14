import { createClient } from 'next-sanity';
import { Job } from '@/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-09-11';

/**
 * CDN-backed client for read operations (fast global reads via Sanity CDN).
 * Use this for all public data fetching on the site.
 */
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // ✅ CDN-cached reads — sub-100ms globally
      perspective: 'published', // Only published documents
    })
  : null;

/** Minimal fields for job list cards — excludes heavy `description` field */
const JOB_LIST_FIELDS = `
  _id,
  title,
  slug,
  company,
  "companyLogo": companyLogo.asset->url,
  location,
  opportunityType,
  experienceLevel,
  eligibleBatches,
  qualification,
  domain,
  workMode,
  applyUrl,
  verifiedAt,
  salary,
  keyDetails
`;

/** Full fields for the job detail page — includes description */
const JOB_DETAIL_FIELDS = `
  ${JOB_LIST_FIELDS},
  description
`;

export interface JobFilters {
  opportunityType?: string;
  batch?: string;
  experience?: string;
  domain?: string;
  workMode?: string;
  location?: string;
  qualification?: string;
  keywords?: string[];
}

/**
 * Fetch jobs with GROQ-level filtering (server-side, not in JavaScript).
 * This is the primary performance improvement — only matching documents are
 * transferred from Sanity, not the entire dataset.
 */
export async function getJobs(filters?: JobFilters): Promise<Job[]> {
  if (!sanityClient) {
    console.warn('[Sanity] Project ID not configured.');
    return [];
  }

  try {
    // Build GROQ filter conditions — pushed to Sanity, not done in JS
    const conditions: string[] = [`_type == "job"`];
    const params: Record<string, string> = {};

    if (filters?.opportunityType && filters.opportunityType !== 'All') {
      conditions.push(`opportunityType == $opportunityType`);
      params.opportunityType = filters.opportunityType;
    }

    if (filters?.experience && filters.experience !== 'All') {
      conditions.push(`experienceLevel == $experience`);
      params.experience = filters.experience;
    }

    if (filters?.domain && filters.domain !== 'All') {
      conditions.push(`domain == $domain`);
      params.domain = filters.domain;
    }

    if (filters?.workMode && filters.workMode !== 'All') {
      conditions.push(`workMode == $workMode`);
      params.workMode = filters.workMode;
    }

    if (filters?.location && filters.location !== 'All') {
      // Location can be partial match (e.g., "Remote" matches "Remote / Hybrid")
      conditions.push(`lower(location) match lower($location) + "*"`);
      params.location = filters.location;
    }

    if (filters?.batch && filters.batch !== 'All') {
      // eligibleBatches is an array — check if batch is in it
      conditions.push(`$batch in eligibleBatches`);
      params.batch = filters.batch;
    }

    if (filters?.qualification && filters.qualification !== 'All') {
      conditions.push(`$qualification in qualification`);
      params.qualification = filters.qualification;
    }

    const filter = conditions.join(' && ');
    const query = `*[${filter}] | order(verifiedAt desc) { ${JOB_LIST_FIELDS} }`;

    const jobs = await sanityClient.fetch<Job[]>(query, params, {
      next: { revalidate: 60 }, // ISR: Serve instantly from cache, revalidate in background every 60s
    });

    if (!jobs || jobs.length === 0) return [];

    // Keyword search — done in JS only when keywords present (not possible in GROQ easily)
    if (filters?.keywords && filters.keywords.length > 0) {
      const tokens = filters.keywords
        .map((k) => k.toLowerCase().trim())
        .filter((k) => k.length > 1);

      return jobs.filter((j) => {
        const searchText = [
          j.title, j.company, j.location, j.domain,
          ...(j.qualification || []), ...(j.eligibleBatches || []),
        ].join(' ').toLowerCase();
        return tokens.some((t) => searchText.includes(t));
      });
    }

    return jobs;
  } catch (error) {
    console.error('[Sanity] getJobs failed:', error);
    return [];
  }
}

/**
 * Fetch a single job by slug for the detail page.
 * Includes full description field.
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  if (!sanityClient) return null;

  // Validate slug format to prevent GROQ injection
  if (!/^[a-z0-9-_]+$/i.test(slug)) return null;

  try {
    const query = `*[_type == "job" && slug.current == $slug][0] { ${JOB_DETAIL_FIELDS} }`;
    const job = await sanityClient.fetch<Job>(query, { slug }, {
      next: { revalidate: 60 },
    });
    return job || null;
  } catch (error) {
    console.error('[Sanity] getJobBySlug failed:', error);
    return null;
  }
}

/**
 * Fetch recent jobs for "More Opportunities" sidebar.
 * Uses CDN cache — these can be slightly stale.
 */
export async function getRecentJobs(
  excludeSlug?: string,
  limit: number = 3
): Promise<Job[]> {
  if (!sanityClient) return [];

  // Clamp limit to prevent abuse
  const safeLimit = Math.min(Math.max(1, limit), 10);

  try {
    const filter = excludeSlug
      ? `_type == "job" && slug.current != $excludeSlug`
      : `_type == "job"`;

    const query = `*[${filter}] | order(verifiedAt desc)[0...$limit] { ${JOB_LIST_FIELDS} }`;
    const jobs = await sanityClient.fetch<Job[]>(
      query,
      { excludeSlug: excludeSlug || '', limit: safeLimit },
      { cache: 'force-cache', next: { revalidate: 300 } } // Cache for 5 min
    );
    return jobs || [];
  } catch (error) {
    console.error('[Sanity] getRecentJobs failed:', error);
    return [];
  }
}
