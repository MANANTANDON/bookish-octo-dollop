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
    if (formData.name !== "" && formData.email !== "" && formData.bio !== "") {
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
      <div className="flex flex-row-reverse p-1">
        <div
          className="hover:bg-zinc-500/20 w-fit px-2 py-1.5 rounded-lg cursor-pointer"
          onClick={handleLogout}
        >
          􀻵
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen my-5">
        <form onSubmit={handleSubmit}>
          <div className=" w-90  md:w-125 max-w-125 flex flex-col gap-5 px-4">
            {formData.profilePic && (
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src={formData.profilePic}
                  fill
                  alt="Profile Picture"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div>
              <h2>Name</h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Write your name here..."
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <h2>Username</h2>
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="e.g. manan"
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Write your email here..."
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <h2>Bio</h2>
              <textarea
                name="bio"
                placeholder="Write your bio..."
                rows={3}
                value={formData.bio}
                className="border border-zinc-500 p-4 rounded-[20px] w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <h2>Location</h2>
              <input
                type="text"
                name="location"
                value={formData.location}
                placeholder="e.g. New Delhi, India"
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <h2>Website</h2>
              <input
                type="url"
                name="website"
                value={formData.website}
                placeholder="https://yourwebsite.com"
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={handleChange}
              />
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
                className="bg-zinc-50 text-zinc-900 border border-zinc-900 w-full py-2.5 rounded-[100px] cursor-pointer font-semibold text-lg"
                type="button"
                onClick={() => router.push("/preview")}
              >
                Preview
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
