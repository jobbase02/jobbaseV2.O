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
    <div className="space-y-6">
      <AdSpot type="banner" spotName="Resources Top Banner" pageName="Resources" />
      <ResourceList resources={resources} />
    </div>
  );
}
