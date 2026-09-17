import React from 'react';
import { getResources } from '@/lib/supabase/client';
import ResourceList from '@/components/ResourceList';

export const metadata = {
  title: 'Knowledge Base & Interview Materials | JobBase',
  description: 'Access ATS resume templates, systems design roadmaps, and technical interview guides.',
};

import { AdSpot } from '@/components/AdSpot';

export default async function ResourcesPage() {
  // Server-side fetch — instantly available, no loading spinner
  const resources = await getResources('All');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 space-y-8 fade-in-up">
      <ResourceList resources={resources} />
      <div className="py-4 border-t border-slate-100">
        <AdSpot type="banner" spotName="Resources Bottom Banner" pageName="Resources" />
      </div>
    </div>
  );
}
