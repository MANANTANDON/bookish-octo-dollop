"use client";
import { NavigationHeader } from "@/components/Dashboard/NavigationHeader";
import Link from "next/link";
import React, { useState } from "react";

export default function Links() {
  const [links, setLinks] = useState({});

  const LinksCreateButton = () => {
    return (
      <button className="flex bg-[#0088FF] text-zinc-50 px-5 py-1.5 rounded-[100px] text-sm items-center gap-1 cursor-pointer font-semibold tracking-tight ">
        <span className="text-xs font-normal">􀣘</span> Create
      </button>
    );
  };
  return (
    <div className="px-5 pb-20 h-full w-full max-w-5xl flex flex-col gap-10 ">
      <NavigationHeader text="Links Tab" />
      <div className="bg-zinc-50 rounded-[20px] py-5.5 px-6.25 flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight">Links Tab</h2>
        <h4 className="text-zinc-500">
          Manange and Create custom sharable links for professions, music, etc
          upto 5 links...
        </h4>
      </div>
      <div className="flex flex-row-reverse">
        <LinksCreateButton />
      </div>
      <div>
        {Object.keys(links).length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 bg-zinc-50 rounded-[20px] py-5.5 px-6.25 h-100">
            <h2 className="text-2xl font-semibold tracking-tight">
              Create your first link
            </h2>
            <LinksCreateButton />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
