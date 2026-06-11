"use client";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
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
    <div className="flex items-center justify-center mt-60">
      <div className="w-80 max-w-80 flex flex-col items-center gap-10">
        <h1 className="text-3xl font-medium tracking-tight">
          Log in or signup
        </h1>
        <button
          onClick={handleGoogleLogin}
          className=" bg-[#FFFFFF] pl-4 pr-6 py-3 rounded-[100px] w-full text-center cursor-pointer flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-zinc-200/40"
        >
          <Image
            src={"/images/google.png"}
            height={20}
            width={20}
            alt="google login button image"
          />
          <h3 className="w-full font-semibold text-zinc-900">
            Continue with Google
          </h3>
        </button>
      </div>
    </div>
  );
};
