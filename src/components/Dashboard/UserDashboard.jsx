"use client";
import { supabase } from "@/lib/supabase";
import { useUserData } from "@/zustand/store";
import React, { useEffect } from "react";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const UserDashboard = () => {
  const { formData, updateField, setFormData } = useUserData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
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
      <div className="grid grid-cols-[350px_1fr] min-h-screen">
        <LeftSide data={formData} />
        <div className="flex justify-center">
          <RightSide data={formData} />
        </div>
      </div>
    </>
  );
};
