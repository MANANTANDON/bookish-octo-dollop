import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const generateUsername = (name) => {
  const slug = name.toLowerCase().trim().replace(/\s+/g, "-");
  const hex = Math.random().toString(16).slice(2, 8); // 6 char hex
  return `${slug}-${hex}`;
};

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (user) {
      // Check if user already exists and already has a username
      const { data: existingUser } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();

      const username =
        existingUser?.username ||
        generateUsername(user.user_metadata.full_name);

      await supabase.from("users").upsert(
        {
          id: user.id,
          name: user.user_metadata.full_name,
          email: user.email,
          username,
        },
        { onConflict: "id" },
      );
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
