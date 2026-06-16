"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserData } from "@/zustand/store";
import { QRCodeSVG } from "qrcode.react";
import { MobileSideMenu } from "@/components/Dashboard/MobileSideMenu";

export default function Dashboard() {
  const router = useRouter();
  const { formData, setFormData } = useUserData();
  const [preview, setPreview] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const handlePreview = () => {
    preview ? setPreview(false) : setPreview(true);
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
      <div className="p-5 h-full w-full max-w-5xl hidden lg:flex flex-col items-center gap-10">
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
            <div className="flex items-center gap-4">
              <button
                className="bg-[#0088FF] hover:bg-[#006FD6] text-zinc-50 px-5 py-1.5 rounded-[100px] cursor-pointer mt-10 text-sm font-medium tracking-tight transition-colors duration-200"
                onClick={handleLogout}
              >
                logout
              </button>

              {/* <div className="relative">
                <button
                  className="border border-[#0088FF] text-[#0088FF] px-5 py-1.5  rounded-[100px] cursor-pointer mt-10 text-sm font-medium tracking-tight"
                  onClick={handlePreview}
                >
                  preview
                </button>
                {preview && (
                  <div className="absolute top-20 left-1 bg-[#FFFFFF] p-5 rounded-xl border border-slate-300">
                    <QRCodeSVG
                      value="https://bookish-octo-dollop-seven.vercel.app/preview"
                      size={180}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"H"}
                    />
                    <h1 className="text-sm mt-3 font-semibold">
                      {" "}
                      scan QR code for preview
                    </h1>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen lg:hidden">
        <MobileSideMenu />
      </div>
    </>
  );
}
