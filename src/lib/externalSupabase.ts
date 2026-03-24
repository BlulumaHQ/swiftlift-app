import { createClient } from "@supabase/supabase-js";

export const EXTERNAL_SUPABASE_URL = "https://czdbnlewbbwbtgjjwute.supabase.co";
export const EXTERNAL_SUPABASE_ANON_KEY = "sb_publishable_kcpYpK49_gQxhocNbK-dmw_Ixc1dsyb";

export const externalSupabase = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_ANON_KEY);
