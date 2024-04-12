import { supabaseServer } from "@/lib/supabase/server";

export async function getUserLogoImageAction({
  userLogoName,
}: {
  userLogoName: string;
}) {
  const supabase = await supabaseServer();

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(userLogoName);

  return publicUrl;
}
