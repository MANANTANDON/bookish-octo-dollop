"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/zustand/store";
import Link from "next/link";

export default function Developer() {
  const { linksCache, setLinksCache } = useUserData();
  const [links, setLinks] = useState({
    github: "",
    gitlab: "",
    leetcode: "",
    hackerrank: "",
    codechef: "",
    stackoverflow: "",
    codepen: "",
    replit: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      if (linksCache["developer"]) {
        const cached = linksCache["developer"];
        setLinks({
          github: cached.github || "",
          gitlab: cached.gitlab || "",
          leetcode: cached.leetcode || "",
          hackerrank: cached.hackerrank || "",
          codechef: cached.codechef || "",
          stackoverflow: cached.stackoverflow || "",
          codepen: cached.codepen || "",
          replit: cached.replit || "",
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
        .eq("category", "developer");

      if (data) {
        const obj = {};
        data.forEach((link) => {
          obj[link.name] = link.url;
        });
        setLinks({
          github: obj.github || "",
          gitlab: obj.gitlab || "",
          leetcode: obj.leetcode || "",
          hackerrank: obj.hackerrank || "",
          codechef: obj.codechef || "",
          stackoverflow: obj.stackoverflow || "",
          codepen: obj.codepen || "",
          replit: obj.replit || "",
        });
        setLinksCache("developer", obj);
      }
    };
    fetchLinks();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const linksToSave = Object.entries(links).map(([name, url]) => ({
      user_id: user.id,
      category: "developer",
      name,
      url,
    }));

    await supabase
      .from("links")
      .upsert(linksToSave, { onConflict: "user_id, name" });

    setLinksCache("developer", links);
    setSaving(false);
  };

  const fields = [
    {
      key: "github",
      label: "GitHub",
      placeholder: "https://github.com/yourusername",
    },
    {
      key: "gitlab",
      label: "GitLab",
      placeholder: "https://gitlab.com/yourusername",
    },
    {
      key: "leetcode",
      label: "LeetCode",
      placeholder: "https://leetcode.com/yourusername",
    },
    {
      key: "hackerrank",
      label: "HackerRank",
      placeholder: "https://hackerrank.com/yourusername",
    },
    {
      key: "codechef",
      label: "CodeChef",
      placeholder: "https://codechef.com/users/yourusername",
    },
    {
      key: "stackoverflow",
      label: "Stack Overflow",
      placeholder: "https://stackoverflow.com/users/yourid",
    },
    {
      key: "codepen",
      label: "CodePen",
      placeholder: "https://codepen.io/yourusername",
    },
    {
      key: "replit",
      label: "Replit",
      placeholder: "https://replit.com/@yourusername",
    },
  ];

  return (
    <div className="p-5 h-full w-full max-w-5xl flex flex-col gap-10 pt-20 relative">
      <Link
        href="/"
        className="absolute top-5 left-5 border border-zinc-50 rounded-[100px] shadow-[2px_0px_12px_rgba(0,0,0,0.04),0px_2px_12px_rgba(0,0,0,0.04)] bg-zinc-100/20 px-3 py-1.5 "
      >
        􀯶
      </Link>
      <div className="bg-zinc-50 rounded-[20px] py-5.5 px-6.25 flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight">Developer Links</h2>
        <h4 className="text-zinc-500">
          Manage all your developer profiles in one place for instance GitHub,
          LeetCode, Stack Overflow etc.
        </h4>
      </div>

      <div className="flex flex-col gap-7">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-500">
              {field.label}
            </h3>
            <input
              className="w-full bg-zinc-50 px-4 py-3 rounded-[100px] outline-0 text-[15px]"
              type="text"
              placeholder={field.placeholder}
              value={links[field.key]}
              onChange={(e) =>
                setLinks({ ...links, [field.key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <div className="flex flex-row-reverse pb-10">
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
