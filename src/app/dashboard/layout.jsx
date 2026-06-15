"use client";
import { SideMenu } from "@/components/Dashboard/SideMenu";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-[#F1F2F6] h-screen">
        <div className="grid grid-cols-[350px_1fr] h-full">
          <SideMenu />

          <div className="overflow-y-auto flex justify-center">{children}</div>
        </div>
      </div>
    </>
  );
}
