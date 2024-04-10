"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function registerWithEmailMagicLink({ email }: { email: string }) {
  const supabase = await supabaseServer();

  const authResponse = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  });

  return authResponse;
}
