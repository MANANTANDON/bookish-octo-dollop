import { supabase } from "./supabase";

export const getPageBySlug = async (username, slug) => {
  // Find the page matching this slug
  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (pageError || !page) return null;

  // Get the user's profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", page.user_id)
    .single();

  // Get the links attached to this page
  const { data: pageLinks } = await supabase
    .from("page_links")
    .select("*")
    .eq("page_id", page.id);

  // Get the actual link URLs from the links table
  const { data: allLinks } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", page.user_id);

  const resolvedLinks = (pageLinks || [])
    .map((pl) => {
      const match = allLinks.find(
        (l) => l.name === pl.link_name && l.category === pl.category,
      );
      return match
        ? { name: match.name, url: match.url, category: match.category }
        : null;
    })
    .filter(Boolean);

  return { page, profile, links: resolvedLinks };
};
