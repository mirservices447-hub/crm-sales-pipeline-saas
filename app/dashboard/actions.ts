"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

const allowedStatuses = ["new", "contacted", "qualified", "lost", "converted"] as const;

export async function createLead(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim() || null;
  const phone = String(formData.get("phone") || "").trim() || null;
  const company = String(formData.get("company") || "").trim() || null;
  const rawStatus = String(formData.get("status") || "new");
  const status = allowedStatuses.includes(rawStatus as typeof allowedStatuses[number]) ? rawStatus : "new";

  if (!name) redirect("/dashboard?lead_error=Lead%20name%20is%20required.");

  const { error } = await supabase.from("leads").insert({
    owner_id: user.id, name, email, phone, company, status,
  });

  if (error) redirect("/dashboard?lead_error=" + encodeURIComponent(error.message));
  revalidatePath("/dashboard");
  redirect("/dashboard?lead_added=1");
}

export async function updateLeadStatus(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") || "");
  const rawStatus = String(formData.get("status") || "new");
  if (!id || !allowedStatuses.includes(rawStatus as typeof allowedStatuses[number])) redirect("/dashboard");

  await supabase.from("leads").update({ status: rawStatus }).eq("id", id);
  revalidatePath("/dashboard");
}

export async function deleteLead(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") || "");
  if (id) await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/dashboard");
}
