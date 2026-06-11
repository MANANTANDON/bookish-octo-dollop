"use client";
import { supabase } from "@/lib/supabase";
import React from "react";

export const Signup = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.log(error);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 max-w-80 flex flex-col items-center gap-3">
        <h1>Log in or signup</h1>
        <button
          onClick={handleGoogleLogin}
          className="border border-zinc-400 px-6 py-2 rounded-[100px] text-zinc-600 w-full text-center cursor-pointer"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};
