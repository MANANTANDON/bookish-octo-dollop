"use client";
import { getPageBySlug } from "@/lib/db";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PublicPage() {
  const { username, slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPageBySlug(username, slug);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [username, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">This page does not exist.</p>
      </div>
    );
  }

  const { page, profile, links } = data;

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 px-5 gap-8">
      <div className="flex flex-col items-center gap-3">
        {profile?.profilePic && (
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <h1 className="text-2xl font-bold">{profile?.name}</h1>
        <p className="text-zinc-500">{page.name}</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {links.map((link) => (
          <a
            key={`${link.category}-${link.name}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-50 px-5 py-4 rounded-[20px] flex items-center justify-between hover:bg-zinc-100 transition-colors"
          >
            <span className="capitalize font-medium">{link.name}</span>
            <span className="text-zinc-400">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
