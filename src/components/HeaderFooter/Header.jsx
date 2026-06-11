"use client";
import React, { useEffect, useRef, useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div
            ref={menuRef}
            className="absolute right-4 top-12 font-normal text-sm shadow-2xl px-2 py-1.5 rounded-xl text-sky-700 bg-[#FFFFFF] cursor-help border border-zinc-200/50"
          >
            􀅴 LinkSharer User Guide
          </div>
        )}
      </div>
    </>
  );
};
