import { SearchResultsClient } from '@/components/SearchResultsClient';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === 'string' ? params[key] as string : '';

  return (
    <SearchResultsClient
      query={value('q')}
      mode={value('mode')}
      intentParam={value('intent')}
      location={value('location')}
    />
  );
}
