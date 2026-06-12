import Image from "next/image";
import React from "react";

export const LeftSide = ({ data }) => {
  return (
    <>
      <div className="p-2">
        <div className="p-5 flex flex-col gap-3.5 border border-zinc-50 rounded-3xl shadow-[2px_0px_12px_rgba(0,0,0,0.04),0px_2px_12px_rgba(0,0,0,0.04)] bg-zinc-100/20 h-full">
          <h1 className="text-3xl font-bold tracking-tighter">LinkSharer</h1>
          <div className="flex items-center justify-between">
            {/* User First Card */}
            <div className="flex items-center gap-3.5 bg-[#FFFFFF] w-full p-4 rounded-[30px]">
              <div className="relative h-17.5 w-17.5 overflow-hidden rounded-[100px] shrink-0">
                {data?.profilePic && (
                  <Image
                    src={data?.profilePic}
                    alt="user Image"
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                  />
                )}
              </div>
              <div className="w-full">
                <h1 className="text-2xl font-bold tracking-tighter">
                  {data?.name}
                </h1>
                <h2 className="text-sm font-medium tracking-tight text-zinc-900/50 -mt-1 ">
                  {data?.email}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
