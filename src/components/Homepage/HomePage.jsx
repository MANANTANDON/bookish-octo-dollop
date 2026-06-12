import Image from "next/image";
import React from "react";

export const HomePage = () => {
  const HeroText = `The Best Place for all your<br/> socials, offical, creative links<br/> and many more in one place.`;
  return (
    <>
      <div className="flex flex-col items-center gap-7 mt-10 ">
        <Image
          src={"/images/logoImage.png"}
          alt="Logo Images"
          width={1306}
          height={832}
          className="w-70 md:w-110 h-auto aspect-1306/832"
        />
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tight">
          LinkSharer
        </h1>
        <a
          href="/auth"
          className="bg-zinc-900 text-zinc-100 px-10 py-2 rounded-[100px] text-base md:text-xl font-semibold"
        >
          Sigin In
        </a>
        <p
          dangerouslySetInnerHTML={{ __html: HeroText }}
          className="text-center text-xl/6 md:text-3xl/9 font-bold tracking-tight mt-5 md:mt-10"
        />
      </div>
    </>
  );
};
