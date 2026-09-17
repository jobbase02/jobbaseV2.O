import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { ResourceItem } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabaseAdmin = (supabaseUrl && supabaseServiceRoleKey)
  ? createClient(supabaseUrl, supabaseServiceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
  : null;

const RESOURCE_FIELDS = 'id,title,slug,category,description,file_url,file_size,format,download_count,tags';

export async function getResources(category?: string): Promise<ResourceItem[]> {
  if (!supabase) {
    console.warn('Supabase URL / Anon Key not set in environment variables.');
    return [];
  }

  try {
    let query = supabase.from('resources').select(RESOURCE_FIELDS).order('created_at', { ascending: false });
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Supabase resources fetch error:', error);
      return [];
    }
    return (data as ResourceItem[]) || [];
  } catch (error) {
    console.error('Supabase query failed:', error);
    return [];
  }
}

export async function getResourceBySlug(slug: string): Promise<ResourceItem | null> {
  if (!supabase) return null;

  // Basic slug validation
  if (!/^[a-z0-9-_]+$/i.test(slug)) return null;

  try {
    const { data, error } = await supabase
      .from('resources')
      .select(RESOURCE_FIELDS)
      .eq('slug', slug)
      .single();

    if (error || !data) return null;
    return data as ResourceItem;
  } catch (error) {
    console.error('Supabase getResourceBySlug failed:', error);
    return null;
  }
}
