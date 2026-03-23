import { createClient } from "@supabase/supabase-js";

const EXTERNAL_SUPABASE_URL = "https://bmndolpietxvafqnfmjx.supabase.co";
const EXTERNAL_SUPABASE_ANON_KEY = "sb_publishable_yCPiBoxbvCaXJEv0PJNQMA_Yca7F2qg";

export const externalSupabase = createClient(
  EXTERNAL_SUPABASE_URL,
  EXTERNAL_SUPABASE_ANON_KEY
);

/**
 * Generate a client ID in format: CL-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number.
 */
export function generateClientId(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `CL-${yyyy}${mm}${dd}-${rand}`;
}
