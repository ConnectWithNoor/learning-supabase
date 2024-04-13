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

const updateUsersSkills = async (userId: string, skill: string) => {
  const supabase = await supabaseServer();

  // update the user skills in db using RPC named add_skill
  const { data: formResponse, error: formError } = await supabase.rpc(
    "add_skill",
    {
      user_id: userId,
      new_skill: skill,
    }
  );

  return { formResponse, formError };
};

export { getUserData, updateUsersSkills };
