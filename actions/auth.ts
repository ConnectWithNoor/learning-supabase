"use server";

import { registerWithEmailMagicLinkService } from "@/services/auth";

export async function registerWithEmailMagicLinkAction({
  email,
}: {
  email: string;
}) {
  const response = await registerWithEmailMagicLinkService(email);
  return response;
}
