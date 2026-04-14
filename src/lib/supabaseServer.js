import { createClient } from "@supabase/supabase-js";

// Server-only Supabase Instance (uses Service Role Key)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
