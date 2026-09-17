const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;

export function getSafeResourceUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !supabaseOrigin) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.origin !== supabaseOrigin) return null;
    if (!url.pathname.startsWith('/storage/v1/object/public/')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getSafeExternalUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}
