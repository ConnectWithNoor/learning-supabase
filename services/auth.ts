import { supabaseServer } from "@/lib/supabase/server";

const registerWithEmailMagicLinkService = async (email: string) => {
  try {
    const supabaseClient = await supabaseServer();

    const response = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_MAGICLINK_REDIRECT_URL}`,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      success: response.data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export { registerWithEmailMagicLinkService };
