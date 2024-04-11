"use server";

import { registerWithEmailMagicLinkService } from "@/services/auth";

// import { supabaseServer } from "@/lib/supabase/server";

export async function registerWithEmailMagicLinkAction({
  email,
}: {
  email: string;
}) {
  const response = await registerWithEmailMagicLinkService(email);
  return response;
}
