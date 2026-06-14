"use client";
import { supabase } from "@/lib/supabase";
import { useUserData } from "@/zustand/store";
import React, { useEffect, useState } from "react";

export default function Professional() {
  const { linksCache, setLinksCache } = useUserData();
  const [links, setLinks] = useState({
    portfolio: "",
    linkedin: "",
    resume: "",
  });
  const [saving, setSaving] = useState(false);

  // fetch data from Supabase
  useEffect(() => {
    const fetchLinks = async () => {
      // check for cache memory
      if (linksCache["professional"]) {
        const cached = linksCache["professional"];
        setLinks({
          portfolio: cached.portfolio || "",
          linkedin: cached.linkedin || "",
          resume: cached.resume || "",
        });
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", "professional");

      if (data) {
        const obj = {};
        data.forEach((link) => {
          obj[link.name] = link.url;
        });
        setLinks({
          portfolio: obj.portfolio || "",
          linkedin: obj.linkedin || "",
          resume: obj.resume || "",
        });
        setLinksCache("professional", obj);
      }
    };
    fetchLinks();
  }, []);

  // save data in DB
  const handleSave = async () => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const linksToSave = [
      {
        user_id: user.id,
        category: "professional",
        name: "portfolio",
        url: links.portfolio,
      },
      {
        user_id: user.id,
        category: "professional",
        name: "linkedin",
        url: links.linkedin,
      },
      {
        user_id: user.id,
        category: "professional",
        name: "resume",
        url: links.resume,
      },
    ];

    await supabase
      .from("links")
      .upsert(linksToSave, { onConflict: "user_id, name" });

    setSaving(false);
  };

  return (
    <div className="p-5 h-full w-full max-w-5xl flex flex-col gap-15 mt-10">
      <div className="bg-zinc-50 rounded-[20px] py-5.5 px-6.25 flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight">Professional Links</h2>
        <h4 className="text-zinc-500">
          Manage all your professional links in one place for instance LinkedIn,
          Naukri, Glassdoor etc.
        </h4>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-500">
            Portfolio
          </h3>
          <input
            className="w-full bg-zinc-50 px-4 py-3 rounded-[100px] outline-0 text-[15px]"
            type="text"
            placeholder="https://www.manantandon.com for instance..."
            value={links.portfolio}
            onChange={(e) => setLinks({ ...links, portfolio: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-500">
            LinkedIn
          </h3>
          <input
            className="w-full bg-zinc-50 px-4 py-3 rounded-[100px] outline-0 text-[15px]"
            type="text"
            placeholder="https://www.linkedin.com/in/manan-t-663472146/ for instance..."
            value={links.linkedin}
            onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-500">
            Resume Link
          </h3>
          <input
            className="w-full bg-zinc-50 px-4 py-3 rounded-[100px] outline-0 text-[15px]"
            type="text"
            placeholder="https://drive.google.com/your-resume for instance..."
            value={links.resume}
            onChange={(e) => setLinks({ ...links, resume: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <button
          onClick={handleSave}
          className="border border-zinc-300 bg-zinc-50 py-0.5 px-4 rounded-[100px] text-sm tracking-tight font-semibold cursor-pointer"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
