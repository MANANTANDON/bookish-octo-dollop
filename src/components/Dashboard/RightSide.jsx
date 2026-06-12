"use client";
import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserData } from "@/zustand/store";

export const RightSide = () => {
  const router = useRouter();
  const { formData, setFormData } = useUserData();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const getGoogleUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && formData.name === "") {
        setFormData({
          ...formData,
          name: user.user_metadata.full_name || "",
          email: user.email || "",
          profilePic: user.user_metadata.avatar_url || "",
        });
      }
    };
    getGoogleUser();
  }, []);

  return (
    <>
      <div className="p-5 h-full w-full max-w-5xl flex flex-col items-center gap-10">
        <h3 className="text-lg font-semibold tracking-tight">
          User Information
        </h3>
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-25 w-25 overflow-hidden rounded-[100px] shrink-0">
            {formData?.profilePic && (
              <Image
                src={formData?.profilePic}
                alt="user Image"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
              />
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl font-bold tracking-tighter">
              {formData?.name}
            </h1>
            <h2 className="text-lg font-medium tracking-tight text-zinc-900/50 ">
              {formData?.email}
            </h2>
            <button
              className="border border-zinc-200 px-3 py-0.5 rounded-lg cursor-pointer bg-zinc-50 mt-10 text-sm font-medium tracking-tight"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
