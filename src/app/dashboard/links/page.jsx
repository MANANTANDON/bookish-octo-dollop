"use client";
import { NavigationHeader } from "@/components/Dashboard/NavigationHeader";
import { supabase } from "@/lib/supabase";
import { useUserData } from "@/zustand/store";
import React, { useEffect, useState } from "react";

const MAX_PAGES = 5;

export default function Links() {
  const { linksCache, setLinksCache } = useUserData();
  const [pages, setPages] = useState(linksCache["pages"] || []);
  const [loading, setLoading] = useState(!linksCache["pages"]);
  const [showModal, setShowModal] = useState(false);
  const [allLinks, setAllLinks] = useState([]);
  const [pageName, setPageName] = useState("");
  const [selectedLinks, setSelectedLinks] = useState({});
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState("");
  const [editingPage, setEditingPage] = useState(null);

  const openEditModal = async (page) => {
    fetchAllLinks();
    setPageName(page.name);
    setEditingPage(page);

    // Fetch links already attached to this page
    const { data: existingPageLinks } = await supabase
      .from("page_links")
      .select("*")
      .eq("page_id", page.id);

    const selected = {};
    (existingPageLinks || []).forEach((pl) => {
      selected[`${pl.category}-${pl.link_name}`] = true;
    });
    setSelectedLinks(selected);
    setShowModal(true);
  };

  const handleDeletePage = async (pageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this page?",
    );
    if (!confirmed) return;

    await supabase.from("page_links").delete().eq("page_id", pageId);
    await supabase.from("pages").delete().eq("id", pageId);

    fetchPages();
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(data?.username || "");
    };
    fetchUsername();
  }, []);

  const handleCopyLink = (slug) => {
    const url = `${window.location.origin}/${username}/${slug}`;
    navigator.clipboard.writeText(url);
  };

  // Fetch all links the user has actually filled in
  const fetchAllLinks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .neq("url", "");

    setAllLinks(data || []);
  };

  const fetchPages = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("user_id", user.id);

    setPages(data || []);
    setLinksCache("pages", data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (linksCache["pages"]) {
      setPages(linksCache["pages"]);
      setLoading(false);
    }
    fetchPages();
  }, []);

  const openModal = () => {
    if (pages.length >= MAX_PAGES && !editingPage) {
      alert("You can only create up to 5 pages.");
      return;
    }
    fetchAllLinks();
    setPageName("");
    setSelectedLinks({});
    setEditingPage(null);
    setShowModal(true);
  };

  const toggleLink = (linkKey) => {
    setSelectedLinks((prev) => ({
      ...prev,
      [linkKey]: !prev[linkKey],
    }));
  };

  const handleCreatePage = async () => {
    if (!pageName.trim()) return;
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const slug = pageName.toLowerCase().replace(/\s+/g, "-");

    let pageId;

    if (editingPage) {
      // Update existing page
      const { error } = await supabase
        .from("pages")
        .update({ name: pageName, slug })
        .eq("id", editingPage.id);

      if (error) {
        console.log("Error updating page:", error);
        setSaving(false);
        return;
      }
      pageId = editingPage.id;

      // Clear old page links before re-inserting
      await supabase.from("page_links").delete().eq("page_id", pageId);
    } else {
      // Create new page
      const { data: newPage, error } = await supabase
        .from("pages")
        .insert({ user_id: user.id, name: pageName, slug })
        .select()
        .single();

      if (error) {
        console.log("Error creating page:", error);
        setSaving(false);
        return;
      }
      pageId = newPage.id;
    }

    const linksToInsert = allLinks
      .filter((link) => selectedLinks[`${link.category}-${link.name}`])
      .map((link) => ({
        page_id: pageId,
        link_name: link.name,
        category: link.category,
      }));

    if (linksToInsert.length > 0) {
      await supabase.from("page_links").insert(linksToInsert);
    }

    setSaving(false);
    setShowModal(false);
    setEditingPage(null);
    fetchPages();
  };

  const LinksCreateButton = ({ onClick, disabled }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex px-5 py-1.5 rounded-[100px] text-sm items-center gap-1 cursor-pointer font-semibold tracking-tight ${
          disabled
            ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            : "bg-[#0088FF] text-zinc-50"
        }`}
      >
        <span className="text-xs font-normal">􀣘</span> Create
      </button>
    );
  };

  return (
    <div className="px-5 h-full w-full max-w-5xl flex flex-col gap-10 mb-20">
      <NavigationHeader text="Links Tabs" />
      <div className="bg-zinc-50 rounded-[20px] py-5.5 px-6.25 flex flex-col gap-3">
        <div
          style={{
            background: `linear-gradient(145deg, rgba(255,255,255,0.15) -20%, #FA0B41 30%)`,
          }}
          className="text-zinc-50 h-15 md:h-18 w-15 md:w-18 rounded-xl flex items-center justify-center text-2xl md:text-3xl"
        >
          􀒟
        </div>
        <h2 className="text-xl font-bold tracking-tight">Links Tab</h2>
        <h4 className="text-zinc-500">
          Manage and create custom sharable links for professions, music, etc.
        </h4>
        <p className="text-sm font-medium text-zinc-400">
          {pages.length} / {MAX_PAGES} pages created
        </p>
      </div>

      <div className="flex flex-row-reverse">
        <LinksCreateButton
          onClick={openModal}
          disabled={pages.length >= MAX_PAGES || loading}
        />
      </div>

      <div>
        {loading ? (
          <div className="bg-zinc-50 rounded-[20px] py-5.5 px-6.25 h-100 text-zinc-900 flex items-center justify-center tracking-tight">
            Loading...
          </div>
        ) : pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 bg-zinc-50 rounded-[20px] py-5.5 px-6.25 h-100">
            <h2 className="text-2xl font-semibold tracking-tight">
              Create your first link
            </h2>
            <LinksCreateButton
              onClick={openModal}
              disabled={pages.length >= MAX_PAGES || loading}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-zinc-50 rounded-[20px] py-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0"
              >
                <div>
                  <h3 className="font-semibold">{page.name}</h3>
                  <p className="text-sm text-zinc-500">
                    /{username}/{page.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(page.slug)}
                    className="text-sm bg-zinc-200 hover:bg-zinc-300 px-4 py-1.5 rounded-[100px] font-medium transition-colors cursor-pointer"
                  >
                    Copy link
                  </button>
                  <a
                    href={`/${username}/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-[#0088FF] text-white px-4 py-1.5 rounded-[100px] font-medium hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => openEditModal(page)}
                    className="text-sm bg-zinc-200 hover:bg-zinc-300 px-4 py-1.5 rounded-[100px] font-medium transition-colors cursor-pointer"
                  >
                    􀈊
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-4 py-1.5 rounded-[100px] font-medium transition-colors cursor-pointer"
                  >
                    􀈑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="font-semibold text-lg mb-1">
              {editingPage ? "Edit link page" : "Create a new link page"}
            </h3>
            <p className="text-zinc-400 text-sm mb-5">
              Choose which links to show on this page
            </p>

            <input
              type="text"
              placeholder="Page name, e.g. Professional"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              className="w-full bg-zinc-50 px-4 py-3 rounded-[100px] outline-0 text-[15px] mb-5"
            />

            <div className="flex flex-col gap-2">
              {allLinks.length === 0 ? (
                <p className="text-sm text-zinc-400">
                  You haven't added any links yet. Go fill some in first.
                </p>
              ) : (
                allLinks.map((link) => {
                  const key = `${link.category}-${link.name}`;
                  return (
                    <div
                      key={key}
                      onClick={() => toggleLink(key)}
                      className={`flex items-center justify-between px-4 py-3 rounded-4 cursor-pointer border ${
                        selectedLinks[key]
                          ? "border-[#0088FF] bg-blue-50"
                          : "border-zinc-200"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {link.name}
                        </p>
                        <p className="text-xs text-zinc-400 truncate">
                          {link.url}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-all ${
                          selectedLinks[key]
                            ? "bg-[#0088FF] justify-end"
                            : "bg-zinc-300 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-zinc-300 rounded-[100px] py-2.5 text-sm text-zinc-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePage}
                disabled={saving}
                className="flex-1 bg-[#0088FF] text-white rounded-[100px] py-2.5 text-sm font-semibold"
              >
                {saving ? "Saving..." : editingPage ? "Save changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
