"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/zustand/store";
import Link from "next/link";

export default function SocialMedia() {
  const { linksCache, setLinksCache } = useUserData();
  const [links, setLinks] = useState({
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
    snapchat: "",
    threads: "",
    discord: "",
    whatsapp: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      // Return cached data if available
      if (linksCache["social_media"]) {
        const cached = linksCache["social_media"];
        setLinks({
          instagram: cached.instagram || "",
          twitter: cached.twitter || "",
          facebook: cached.facebook || "",
          youtube: cached.youtube || "",
          snapchat: cached.snapchat || "",
          threads: cached.threads || "",
          discord: cached.discord || "",
          whatsapp: cached.whatsapp || "",
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
        .eq("category", "social_media");

      if (data) {
        const obj = {};
        data.forEach((link) => {
          obj[link.name] = link.url;
        });
        setLinks({
          instagram: obj.instagram || "",
          twitter: obj.twitter || "",
          facebook: obj.facebook || "",
          youtube: obj.youtube || "",
          snapchat: obj.snapchat || "",
          threads: obj.threads || "",
          discord: obj.discord || "",
          whatsapp: obj.whatsapp || "",
        });
        setLinksCache("social_media", obj);
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
      category: "social_media",
      name,
      url,
    }));

    await supabase
      .from("links")
      .upsert(linksToSave, { onConflict: "user_id, name" });

    setLinksCache("social_media", links);
    setSaving(false);
  };

  const fields = [
    {
      key: "instagram",
      label: "Instagram",
      placeholder: "https://instagram.com/yourprofile",
    },
    {
      key: "twitter",
      label: "Twitter / X",
      placeholder: "https://x.com/yourhandle",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      placeholder: "https://wa.me/yourphonenumber",
    },
    {
      key: "facebook",
      label: "Facebook",
      placeholder: "https://facebook.com/yourprofile",
    },
    {
      key: "threads",
      label: "Threads",
      placeholder: "https://threads.net/@yourprofile",
    },
    {
      key: "youtube",
      label: "YouTube",
      placeholder: "https://youtube.com/@yourchannel",
    },
    {
      key: "snapchat",
      label: "Snapchat",
      placeholder: "https://snapchat.com/add/yourusername",
    },
    {
      key: "discord",
      label: "Discord",
      placeholder: "https://discord.gg/yourserver",
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
        <h2 className="text-xl font-bold tracking-tight">Social Media Links</h2>
        <h4 className="text-zinc-500">
          Manage all your social media links in one place for instance
          Instagram, X, Reddit etc.
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
