"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const Signup = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-80 max-w-80 flex flex-col items-center gap-3">
          <h1>Log in or signup </h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="border border-zinc-400 px-6 py-2 rounded-[100px] text-zinc-600 w-full text-center cursor-pointer"
          >
            Continue with Google
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="border border-zinc-400 px-6 py-2 rounded-[100px] text-zinc-600 w-full text-center cursor-pointer"
          >
            Continue with Apple
          </button>
          <h2>or</h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <input
              type="text"
              placeholder="Email Address"
              className="px-4 py-2 border border-zinc-400 text-zinc-900 rounded-[100px] outline-0"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-zinc-100 bg-zinc-900 rounded-[100px] cursor-pointer"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
