"use client";
import { supabase } from "@/lib/supabase";
import { useUserData } from "@/zustand/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const UserDashboard = () => {
  const router = useRouter();
  const { formData, updateField, setFormData } = useUserData();
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name !== "" && formData.email !== "") {
      setPreview(true);
    } else {
      return;
    }
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
      <div className="flex items-center justify-between py-1.5 px-2 bg-zinc-100/10 backdrop-blur-md sticky top-0 z-10">
        <a
          href="/"
          className="font-bold text-xl tracking-tighter text-zinc-100"
        >
          <span className="text-lg font-extrabold">􀉣</span>LinkSharer
        </a>
        <div
          className="hover:bg-zinc-100/20 w-fit px-2 py-1.5 rounded-lg cursor-pointer text-zinc-50"
          onClick={handleLogout}
        >
          􀻵
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <div className="flex justify-center mb-10">
          <form onSubmit={handleSubmit}>
            <div className=" w-90  md:w-125 max-w-125 flex flex-col gap-5 px-4">
              <div className="bg-zinc-50/60 backdrop-blur-2xl w-full max-w-125 p-7 rounded-xl">
                {formData.profilePic && (
                  <div className="relative h-30 w-30 rounded-full overflow-hidden">
                    <Image
                      src={formData.profilePic}
                      fill
                      alt="Profile Picture"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 mt-8 mb-4">
                  {formData?.name}
                </h1>
                <h4 className="text-lg text-zinc-900/60 mb-2">
                  {formData?.email}
                </h4>
                <h5 className="text-xl font-medium tracking-tight">
                  LinkSharer<sup>+</sup>
                </h5>
              </div>
              <div>
                <button
                  className="bg-zinc-900 text-zinc-100 w-full py-2.5 rounded-[100px] cursor-pointer font-semibold text-lg"
                  type="submit"
                >
                  Save
                </button>
              </div>
              {preview && (
                <button
                  className="bg-zinc-50 backdrop-blur-xl text-zinc-900  w-full py-2.5 rounded-[100px] cursor-pointer font-semibold text-lg"
                  type="button"
                  onClick={() => router.push("/preview")}
                >
                  Preview
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
