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


export async function convertLeadToCustomer(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") || "");
  if (!id) redirect("/dashboard?lead_error=Missing%20lead.");

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("id,name,email,phone,company,status")
    .eq("id", id)
    .single();

  if (leadError || !lead) redirect("/dashboard?lead_error=Lead%20not%20found.");
  if (lead.status !== "qualified") redirect("/dashboard?lead_error=Only%20qualified%20leads%20can%20be%20converted.");

  const { error: customerError } = await supabase.from("customers").insert({
    owner_id: user.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
  });
  if (customerError) redirect("/dashboard?lead_error=" + encodeURIComponent(customerError.message));

  await supabase.from("leads").update({ status: "converted" }).eq("id", id);
  revalidatePath("/dashboard");
  revalidatePath("/customers");
  redirect("/customers?converted=1");
}
