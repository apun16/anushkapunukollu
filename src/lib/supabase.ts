import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function getClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set — using placeholder client (no data will be returned)');
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getClient();

export interface BookRow {
  id: number;
  title: string;
  author: string | null;
  genres: string[];
  topics: string[];
  rating: number;
  last_read: string;
  tldr: string;
  annotations: string;
  image_src: string | null;
  pages: number | null;
  spine_color: string | null;
}
