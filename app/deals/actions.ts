"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
const stages=["prospecting","qualified","proposal","negotiation","won","lost"] as const;
export async function createDeal(formData:FormData){
 const supabase=createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect("/login");
 const title=String(formData.get("title")||"").trim(), customer_id=String(formData.get("customer_id")||""), raw=String(formData.get("stage")||"prospecting"), value=Number(formData.get("value")||0);
 if(!title||!customer_id||!Number.isFinite(value)||value<0) redirect("/deals?error="+encodeURIComponent("Complete the deal title, customer and a valid value."));
 const stage=stages.includes(raw as any)?raw:"prospecting";
 const {error}=await supabase.from("deals").insert({owner_id:user.id,customer_id,title,value,stage});
 if(error) redirect("/deals?error="+encodeURIComponent(error.message));
 revalidatePath("/deals"); revalidatePath("/dashboard"); redirect("/deals?created=1");
}
export async function updateDealStage(formData:FormData){
 const supabase=createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect("/login");
 const id=String(formData.get("id")||""), stage=String(formData.get("stage")||"");
 if(!id||!stages.includes(stage as any)) redirect("/deals");
 const {error}=await supabase.from("deals").update({stage}).eq("id",id);
 if(error) redirect("/deals?error="+encodeURIComponent(error.message));
 revalidatePath("/deals"); revalidatePath("/dashboard");
}