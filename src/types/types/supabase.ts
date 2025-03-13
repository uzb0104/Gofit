import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL yoki API kalit topilmadi! `.env` faylini tekshiring."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
