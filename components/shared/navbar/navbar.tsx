"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import AuthModalContext from "@/context/auth-modal-context";
import CreateProfileContext from "@/context/create-profile-context";
import { supabaseClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";

const Navbar = () => {
  const { toggleAuthModal } = useContext(AuthModalContext);
  const { toggleCreateProfileModal } = useContext(CreateProfileContext);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleSignout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.error("Error logging out", error);
    else setUser(null);
  };

  useEffect(() => {
    // get the current session on client side ()
    // https://supabase.com/docs/reference/javascript/auth-getsession
    const getCurrentUser = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (session) {
        setUser(session.user);
      }
    };

    setIsMounted(true);
    getCurrentUser();
  }, []);

  if (!isMounted) return null;

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 bg-blue-50 p-2 rounded-sm"
        >
          Home
        </Link>

        <div className="flex items-center space-x-5 w-auto">
          {user && (
            <>
              <Link
                href="/profile"
                className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
              >
                Profile
              </Link>

              <p>{user?.user_metadata?.full_name}</p>

              <Button onClick={toggleCreateProfileModal} variant="outline">
                Update Profile
              </Button>
              <Button onClick={handleSignout} variant="destructive">
                Signout
              </Button>
            </>
          )}
          {!user && (
            <Button onClick={toggleAuthModal} variant="destructive">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
