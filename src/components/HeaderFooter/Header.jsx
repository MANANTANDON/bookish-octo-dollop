"use client";
import React, { useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };
  return (
    <>
      <div className="flex items-center justify-between py-2 px-4 ">
        <a href="/" className="font-bold text-xl tracking-tighter">
          <span className="text-lg font-extrabold">􀉣</span>LinkSharer
        </a>
        <button
          className="cursor-pointer hover:bg-zinc-200 active:bg-zinc-200 px-2 py-1 rounded-md text-xl"
          onClick={handleClick}
        >
          􀍠
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-12 font-light text-sm shadow-2xl px-2 py-1.5 rounded-xl text-sky-700 bg-[#FFFFFF] cursor-help border border-zinc-200/50">
            􀅴 Link share userguide
          </div>
        )}
      </div>
    </>
  );
};
