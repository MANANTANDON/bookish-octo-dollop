import React, { useEffect } from "react";
import Image from "next/image";
import { SIDEMENU } from "@/constant";
import { supabase } from "@/lib/supabase";
import { useUserData } from "@/zustand/store";
import Link from "next/link";

export const SideMenu = () => {
  const { formData, setFormData } = useUserData();

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
      <div className="p-2">
        <div className="p-5 flex flex-col gap-3.5 border border-zinc-50 rounded-3xl shadow-[2px_0px_12px_rgba(0,0,0,0.04),0px_2px_12px_rgba(0,0,0,0.04)] bg-zinc-100/20 h-full">
          <h1 className="text-3xl font-bold tracking-tighter">LinkSharer</h1>
          <Link href="/dashboard" className="flex items-center justify-between">
            {/* User First Card */}
            <div className="flex items-center gap-3.5 bg-[#FFFFFF] w-full p-4 rounded-[30px]">
              <div className="relative h-17.5 w-17.5 overflow-hidden rounded-[100px] shrink-0">
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
              <div className="w-full">
                <h1 className="text-2xl font-bold tracking-tighter">
                  {formData?.name}
                </h1>
                <h2 className="text-sm font-medium tracking-tight text-zinc-900/50 -mt-1 ">
                  {formData?.email}
                </h2>
              </div>
            </div>
          </Link>
          {/* Side Menu */}
          <div className="flex flex-col bg-[#FFFFFF] w-full rounded-[20px] py-1">
            {SIDEMENU.map((item, key) => (
              <Link
                href={item.route}
                key={key}
                className="pt-2 px-4 flex items-center gap-3 w-full "
              >
                <div
                  style={{
                    background: `linear-gradient(145deg, rgba(255,255,255,0.15) -20%, ${item.color} 30%)`,
                  }}
                  className={`w-9 h-8 text-sm flex items-center justify-center mb-1.5 rounded-md text-zinc-100`}
                >
                  {item.icon}
                </div>
                <div
                  className={`${key !== SIDEMENU.length - 1 && "border-b border-[#E7E7E8]"} w-full pb-1.5 font-medium tracking-tight`}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
