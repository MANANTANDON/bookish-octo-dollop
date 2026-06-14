import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const saveUserToDB = async (user) => {
  const { data, error } = await supabase.from("users").upsert(
    {
      id: user.id,
      name: user.user_metadata.full_name,
      email: user.email,
    },
    { onConflict: "id" },
  );

  if (error) console.log("DB error:", error);
  return data;
};

export const getUserFromDB = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) console.log("DB error:", error);
  return data;
};
