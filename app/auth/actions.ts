"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

function messageUrl(path: string, message: string) {
  return `${path}?message=${encodeURIComponent(message)}`;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect(messageUrl("/login", "Email and password are required."));
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(messageUrl("/login", error.message));
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const fullName = String(formData.get("full_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!fullName || !email || password.length < 8) {
    redirect(messageUrl("/signup", "Enter your name, email, and a password of at least 8 characters."));
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: "https://crm.smashre.com/auth/callback",
    },
  });

  if (error) {
    redirect(messageUrl("/signup", error.message));
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect(messageUrl("/login", "Account created. Check your email to confirm your account, then sign in."));
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
