"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { User } from "@/types/app-types";

type Error = {
  error: string;
};

const getUserData = async (): Promise<User | Error | null> => {
  const supabase = await supabaseServer();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { error: "Please sign in" } as Error;
  }

  // get DbUser from authUser
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id);

  if (error) {
    return { error: error.message } as Error;
  }

  return data ? data[0] : null;
};

export default getUserData;
