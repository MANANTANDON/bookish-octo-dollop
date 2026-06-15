"use client";
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
    <div className="p-5 h-full w-full max-w-5xl flex flex-col gap-10 pt-20 relative">
      <Link
        href="/"
        className="absolute top-5 left-5 border border-zinc-50 rounded-[100px] shadow-[2px_0px_12px_rgba(0,0,0,0.04),0px_2px_12px_rgba(0,0,0,0.04)] bg-zinc-100/20 px-3 py-1.5 "
      >
        􀯶
      </Link>
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
