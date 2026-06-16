import Link from "next/link";
import React from "react";

export const NavigationHeader = ({ text }) => {
  return (
    <div className="sticky top-0 py-2 text-center bg-[linear-gradient(to_bottom,#F1F2F6_0%,#F1F2F6_65%,transparent_105%)] z-10 -mb-10">
      <div className="py-7 text-center sticky top-0 font-semibold tracking-tight">
        {text}
        <Link
          href="/"
          className="absolute top-5 left-0 border border-zinc-50 rounded-[100px] shadow-[2px_0px_12px_rgba(0,0,0,0.04),0px_2px_12px_rgba(0,0,0,0.04)] bg-zinc-100/20 px-3 py-1.5 backdrop-blur-xs"
        >
          􀯶
        </Link>
      </div>
    </div>
  );
};
