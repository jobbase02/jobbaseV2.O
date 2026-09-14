/**
 * Homepage — Server Component
 *
 * Data is fetched server-side at request time.
 * We use searchParams to drive the initial state and data fetching,
 * making the architecture URL-driven and shareable.
 */

import { getJobs, JobFilters } from '@/lib/sanity/client';
import { HomeClient } from '@/components/HomeClient';
import { Job } from '@/types';

// Force dynamic so URL query parameters are always read freshly
export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  
  const filters: JobFilters = {
    opportunityType: typeof params.opportunityType === 'string' ? params.opportunityType : 'All',
    batch: typeof params.batch === 'string' ? params.batch : 'All',
    experience: typeof params.experience === 'string' ? params.experience : 'All',
    domain: typeof params.domain === 'string' ? params.domain : 'All',
    workMode: typeof params.workMode === 'string' ? params.workMode : 'All',
    location: typeof params.location === 'string' ? params.location : 'All',
    qualification: typeof params.qualification === 'string' ? params.qualification : 'All',
    keywords: typeof params.q === 'string' && params.q.trim() !== '' ? params.q.split(' ') : undefined,
  };

  let initialJobs: Job[] = [];
  try {
    initialJobs = await getJobs(filters);
  } catch (err) {
    console.error('[HomePage] Failed to fetch initial jobs:', err);
  }

  const clientFilters = {
    opportunityType: filters.opportunityType || 'All',
    qualification: filters.qualification || 'All',
    location: filters.location || 'All',
    batch: filters.batch || 'All',
    experience: filters.experience || 'All',
    domain: filters.domain || 'All',
    workMode: filters.workMode || 'All',
    searchQuery: typeof params.q === 'string' ? params.q : '',
  };

  return <HomeClient initialJobs={initialJobs} initialFilters={clientFilters} />;
}
