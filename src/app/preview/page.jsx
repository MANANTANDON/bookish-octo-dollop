"use client";
import { useUserData } from "@/zustand/store";
import React from "react";

export default function Page() {
  const { formData } = useUserData();
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1>This is your preview screen !</h1>
          <div className="flex flex-col mt-10">
            <div>{formData.name}</div>
            <div>{formData.email}</div>
            <div>{formData.bio}</div>
          </div>
        </div>
      </div>
    </>
  );
}
