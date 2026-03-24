import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bmndolpietxvafqfmjxx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_yCPiBoxbvCaXJEv0PJNQMA_Yca7F2qg";

export const externalSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
