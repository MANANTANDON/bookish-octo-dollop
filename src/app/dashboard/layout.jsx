"use client";
import { SideMenu } from "@/components/Dashboard/SideMenu";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-[#F1F2F6]">
        <div className="grid grid-cols-[350px_1fr] min-h-screen">
          <SideMenu />
          <div className="flex justify-center">{children}</div>
        </div>
      </div>
    </>
  );
}
