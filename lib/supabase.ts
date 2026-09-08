import { createClient, SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

export function db(): SupabaseClient {
  if (!serverClient) {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jhpklnpdctehrglirpxk.supabase.co";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    serverClient = createClient(url, key, { auth: { persistSession: false } });
  }
  return serverClient;
}

let browserClient: SupabaseClient | null = null;

export function getBrowserSupabase(): SupabaseClient {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://jhpklnpdctehrglirpxk.supabase.co";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_GCS_l5SZbmOfGZubF6oRyw_1iv6IodU";
    browserClient = createClient(url, key);
  }
  return browserClient;
}
