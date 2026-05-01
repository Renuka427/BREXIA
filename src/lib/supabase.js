import { createClient } from "@supabase/supabase-js";

// Client-safe Supabase Instance (uses Anon Key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
