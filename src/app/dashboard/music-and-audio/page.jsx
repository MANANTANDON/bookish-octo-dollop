"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/zustand/store";
import Link from "next/link";
import { NavigationHeader } from "@/components/Dashboard/NavigationHeader";

export default function MusicAndAudio() {
  const { linksCache, setLinksCache } = useUserData();
  const [links, setLinks] = useState({
    spotify: "",
    soundcloud: "",
    applemusic: "",
    youtube: "",
    bandcamp: "",
    audiomack: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      if (linksCache["music_and_audio"]) {
        const cached = linksCache["music_and_audio"];
        setLinks({
          spotify: cached.spotify || "",
          soundcloud: cached.soundcloud || "",
          applemusic: cached.applemusic || "",
          youtube: cached.youtube || "",
          bandcamp: cached.bandcamp || "",
          audiomack: cached.audiomack || "",
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
        .eq("category", "music_and_audio");

      if (data) {
        const obj = {};
        data.forEach((link) => {
          obj[link.name] = link.url;
        });
        setLinks({
          spotify: obj.spotify || "",
          soundcloud: obj.soundcloud || "",
          applemusic: obj.applemusic || "",
          youtube: obj.youtube || "",
          bandcamp: obj.bandcamp || "",
          audiomack: obj.audiomack || "",
        });
        setLinksCache("music_and_audio", obj);
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
      category: "music_and_audio",
      name,
      url,
    }));

    await supabase
      .from("links")
      .upsert(linksToSave, { onConflict: "user_id, name" });

    setLinksCache("music_and_audio", links);
    setSaving(false);
  };

  const fields = [
    {
      key: "spotify",
      label: "Spotify",
      placeholder: "https://open.spotify.com/user/yourusername",
    },
    {
      key: "soundcloud",
      label: "SoundCloud",
      placeholder: "https://soundcloud.com/yourusername",
    },
    {
      key: "applemusic",
      label: "Apple Music",
      placeholder: "https://music.apple.com/profile/yourusername",
    },
    {
      key: "youtube",
      label: "YouTube Music",
      placeholder: "https://youtube.com/@yourchannel",
    },
    {
      key: "bandcamp",
      label: "Bandcamp",
      placeholder: "https://yourusername.bandcamp.com",
    },
    {
      key: "audiomack",
      label: "Audiomack",
      placeholder: "https://audiomack.com/yourusername",
    },
  ];

  return (
    <div className="px-5 pb-20  h-full w-full max-w-5xl flex flex-col gap-10">
      <NavigationHeader text="Music & Audio" />
      <div className="bg-zinc-50 rounded-[20px] py-5.5 px-6.25 flex flex-col gap-3">
        <div
          style={{
            background: `linear-gradient(145deg, rgba(255,255,255,0.15) -20%, #008BFF 30%)`,
          }}
          className="text-zinc-50 h-15 md:h-18 w-15 md:w-18 rounded-xl flex items-center justify-center text-2xl md:text-3xl"
        >
          􃁮
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          Music & Audio Links
        </h2>
        <h4 className="text-zinc-500">
          Manage all your music and audio profiles in one place for instance
          Spotify, SoundCloud, Bandcamp etc.
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

      <div className="flex pb-10">
        <button
          onClick={handleSave}
          className="bg-[#0088FF] text-zinc-50 px-5 py-1.5 rounded-[100px] text-sm tracking-tight font-semibold cursor-pointer"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
