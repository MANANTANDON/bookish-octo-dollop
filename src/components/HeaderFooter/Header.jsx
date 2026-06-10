"use client";
import React from "react";

export const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between py-2 px-4 ">
        <a href="/" className="font-bold text-xl tracking-tighter">
          <span className="text-lg font-extrabold">􀉣</span>LinkSharer
        </a>
        <button
          className="cursor-pointer hover:bg-zinc-200 active:bg-zinc-200 px-2 py-1 rounded-md text-xl"
          onClick={() => alert("Manan Tandon")}
        >
          􀍠
        </button>
      </div>
    </>
  );
};
