/**
 * Homepage — Server Component
 *
 * Data is fetched server-side at request time.
 * We use searchParams to drive the initial state and data fetching,
 * making the architecture URL-driven and shareable.
 */

import { getJobs } from '@/lib/sanity/client';
import { HomeClient } from '@/components/HomeClient';
import { Job } from '@/types';

// Force dynamic so URL query parameters are always read freshly
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let initialJobs: Job[] = [];
  try {
    initialJobs = await getJobs({ limit: 6 });
  } catch (err) {
    console.error('[HomePage] Failed to fetch initial jobs:', err);
  }

  return <HomeClient initialJobs={initialJobs} />;
}
