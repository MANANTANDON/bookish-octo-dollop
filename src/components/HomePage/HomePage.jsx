import React from "react";

export const HomePage = () => {
  const HeroText = `The Best Place for all your<br/> socials, personal, offical, creative links<br/> and many more in one place.`;
  return (
    <>
      <div className="flex flex-col items-center h-screen gap-7 pt-30">
        <h1 className="text-8xl font-semibold tracking-tight">LinkSharer</h1>
        <a
          href="/auth"
          className="bg-zinc-900 text-zinc-100 px-10 py-2 rounded-[100px] text-xl font-semibold"
        >
          Sigin In
        </a>
        <p
          dangerouslySetInnerHTML={{ __html: HeroText }}
          className="text-center text-3xl/9 font-medium mt-10"
        />
      </div>
    </>
  );
};
