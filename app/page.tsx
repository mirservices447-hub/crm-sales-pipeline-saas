import Link from "next/link";

const modules = ["Leads","Customers","Deals Pipeline","Tasks","Activity","Roles & Settings"];

export default function Home() {
 return <main className="shell"><section className="hero"><span className="badge">CRM SaaS • MVP</span><h1>Turn leads into customers with a clear sales pipeline.</h1><p>A production-style CRM built with Next.js, TypeScript, Supabase and PostgreSQL.</p><div className="actions"><Link href="/signup">Create account</Link><Link className="ghost-link" href="/login">Sign in</Link><span>Auth + RLS enabled</span></div></section><section id="modules" className="grid">{modules.map((m,i)=><article key={m}><small>0{i+1}</small><h2>{m}</h2><p>{i===0?"Capture, qualify and track prospects.":i===1?"Keep customer records organized.":i===2?"Move opportunities through deal stages.":i===3?"Plan follow-ups and ownership.":i===4?"Maintain a traceable history of work.":"Control access with Admin and Sales roles."}</p></article>)}</section></main>
}
