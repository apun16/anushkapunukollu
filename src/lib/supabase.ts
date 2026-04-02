import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel project settings.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
