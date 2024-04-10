import { createBrowserClient } from "@supabase/ssr";

const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
export { supabaseClient };
