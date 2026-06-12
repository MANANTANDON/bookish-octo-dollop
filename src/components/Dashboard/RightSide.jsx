import React from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const RightSide = ({ data }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <div className="p-5 h-full w-full max-w-5xl flex flex-col items-center gap-10">
        <h3 className="text-lg font-semibold tracking-tight">
          User Information
        </h3>
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-25 w-25 overflow-hidden rounded-[100px] shrink-0">
            {data?.profilePic && (
              <Image
                src={data?.profilePic}
                alt="user Image"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
              />
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl font-bold tracking-tighter">
              {data?.name}
            </h1>
            <h2 className="text-lg font-medium tracking-tight text-zinc-900/50 ">
              {data?.email}
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
