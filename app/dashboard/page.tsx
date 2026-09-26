import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { logout } from "../auth/actions";

const modules = [
  ["Leads", "Capture and qualify prospects"],
  ["Customers", "Keep customer records organized"],
  ["Deals", "Move opportunities through the pipeline"],
  ["Tasks", "Plan follow-ups and ownership"],
];

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const [leads, customers, deals, tasks] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("customers").select("*", { count: "exact", head: true }),
    supabase.from("deals").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("completed", false),
  ]);

  const counts = [leads.count ?? 0, customers.count ?? 0, deals.count ?? 0, tasks.count ?? 0];

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">CRM Sales Pipeline</span>
          <h1>Good to see you, {profile?.full_name || user.email?.split("@")[0]}.</h1>
          <p className="muted">Your workspace is connected to Supabase with owner-scoped RLS.</p>
        </div>
        <form action={logout}><button className="secondary-button" type="submit">Sign out</button></form>
      </header>

      <section className="stat-grid">
        {modules.map(([title, description], index) => (
          <article className="stat-card" key={title}>
            <span>{title}</span>
            <strong>{counts[index]}</strong>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="workspace-card">
        <div>
          <span className="eyebrow">Authenticated workspace</span>
          <h2>Foundation is ready for real CRM workflows.</h2>
          <p className="muted">Next we will add lead CRUD, customer records, deal stages and follow-up tasks.</p>
        </div>
        <div className="role-pill">{profile?.role || "sales"}</div>
      </section>
    </main>
  );
}
