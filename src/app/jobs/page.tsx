import { getJobs } from '@/lib/sanity/client';
import { JobsClient } from '@/components/JobsClient';
import { FilterState, Job } from '@/types';

export const dynamic = 'force-dynamic';

function valueOf(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : 'All';
}

export default async function JobsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filters: FilterState = {
    opportunityType: valueOf(params.opportunityType),
    batch: valueOf(params.batch),
    experience: valueOf(params.experience),
    domain: valueOf(params.domain),
    workMode: valueOf(params.workMode),
    location: valueOf(params.location),
    qualification: valueOf(params.qualification),
    searchQuery: '',
  };

  let fetchedJobs: Job[] = [];
  try {
    fetchedJobs = await getJobs({ ...filters, limit: 13 });
  } catch (error) {
    console.error('[JobsPage] Failed to fetch jobs:', error);
  }

  return (
    <JobsClient
      initialJobs={fetchedJobs.slice(0, 12)}
      initialHasMore={fetchedJobs.length > 12}
      initialFilters={filters}
    />
  );
}
