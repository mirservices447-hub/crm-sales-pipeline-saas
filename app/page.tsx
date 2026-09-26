import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, CircleDollarSign, ContactRound, LayoutDashboard, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";

const features = [
  { icon: ContactRound, label: "Lead management", text: "Capture, qualify and move every prospect forward." },
  { icon: CircleDollarSign, label: "Deal pipeline", text: "Keep opportunities, values and stages in one clear view." },
  { icon: UsersRound, label: "Customer records", text: "Turn won opportunities into organized relationships." },
];

export default function Home() {
  return (
    <main className="marketing-page">
      <nav className="topbar">
        <Link href="/" className="brand"><span className="brand-mark"><Target size={19}/></span><span>Pipeline<span className="brand-accent">OS</span></span></Link>
        <div className="nav-links"><a href="#product">Product</a><a href="#workflow">Workflow</a><a href="#security">Security</a></div>
        <div className="nav-actions"><Link className="nav-signin" href="/login">Sign in</Link><Link className="nav-cta" href="/signup">Start free <ArrowRight size={15}/></Link></div>
      </nav>

      <section className="hero-pro">
        <div className="hero-copy">
          <div className="announcement"><Sparkles size={15}/><span>Built for modern sales teams</span><span className="announcement-dot">•</span><span>Secure by design</span></div>
          <h1>Close more deals.<br/><span>Lose less momentum.</span></h1>
          <p className="hero-lead">A focused CRM workspace that gives your team one clean view of leads, customers, deals and follow-ups — without the enterprise clutter.</p>
          <div className="hero-buttons"><Link className="primary-cta" href="/signup">Build your pipeline <ArrowRight size={18}/></Link><Link className="secondary-cta" href="/login">Open workspace</Link></div>
          <div className="trust-row"><span><CheckCircle2 size={15}/> Supabase Auth</span><span><CheckCircle2 size={15}/> Row-level security</span><span><CheckCircle2 size={15}/> Production deployment</span></div>
        </div>

        <div className="product-stage" aria-label="CRM dashboard preview">
          <div className="glow glow-one"/><div className="glow glow-two"/>
          <div className="app-window">
            <aside className="preview-sidebar">
              <div className="preview-logo"><Target size={18}/></div>
              <div className="preview-nav active"><LayoutDashboard size={17}/><span>Overview</span></div>
              <div className="preview-nav"><ContactRound size={17}/><span>Leads</span></div>
              <div className="preview-nav"><CircleDollarSign size={17}/><span>Deals</span></div>
              <div className="preview-nav"><UsersRound size={17}/><span>Customers</span></div>
              <div className="preview-nav"><BarChart3 size={17}/><span>Activity</span></div>
            </aside>
            <div className="preview-main">
              <div className="preview-head"><div><small>SALES OVERVIEW</small><strong>Good morning, Alex</strong></div><button>+ New lead</button></div>
              <div className="preview-stats">
                <div><span>Open pipeline</span><strong>$84.2k</strong><small>12 active deals</small></div>
                <div><span>Qualified leads</span><strong>28</strong><small>6 this week</small></div>
                <div><span>Win rate</span><strong>32%</strong><small>Current pipeline</small></div>
              </div>
              <div className="pipeline-preview">
                <div className="pipeline-title"><div><strong>Deal pipeline</strong><span>Active opportunities by stage</span></div><span className="live-pill">Live workspace</span></div>
                <div className="kanban">
                  <div className="kanban-col"><span>QUALIFIED <b>3</b></span><div className="deal-card"><i/><strong>Northstar Labs</strong><small>Website platform</small><b>$12,400</b></div><div className="deal-card compact"><i/><strong>Acme Studio</strong><b>$8,750</b></div></div>
                  <div className="kanban-col"><span>PROPOSAL <b>2</b></span><div className="deal-card"><i/><strong>Vertex Group</strong><small>CRM rollout</small><b>$18,200</b></div></div>
                  <div className="kanban-col"><span>NEGOTIATION <b>2</b></span><div className="deal-card"><i/><strong>Brightline Co.</strong><small>Annual contract</small><b>$24,000</b></div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-card security-float"><span className="float-icon"><ShieldCheck size={19}/></span><div><strong>Protected workspace</strong><small>Owner-scoped data access</small></div></div>
        </div>
      </section>

      <section className="proof-strip"><span>ONE WORKSPACE FOR</span><strong>Leads</strong><i/><strong>Customers</strong><i/><strong>Deals</strong><i/><strong>Tasks</strong><i/><strong>Activity</strong></section>

      <section id="product" className="feature-section">
        <div className="section-heading"><span className="section-kicker">Everything stays connected</span><h2>From first contact to closed deal.</h2><p>Your sales workflow should feel obvious. PipelineOS keeps the important work visible and the next action clear.</p></div>
        <div className="feature-grid">{features.map(({icon:Icon,label,text},index)=><article className="feature-card" key={label}><div className="feature-number">0{index+1}</div><div className="feature-icon"><Icon size={22}/></div><h3>{label}</h3><p>{text}</p><span className="feature-link">Explore workflow <ArrowRight size={15}/></span></article>)}</div>
      </section>

      <section id="security" className="security-band">
        <div><span className="section-kicker light">Production-minded foundation</span><h2>Security isn't an add-on.</h2><p>Authentication, protected routes and database row-level security are part of the foundation — ready for real multi-user workflows.</p></div>
        <div className="security-points"><span><ShieldCheck size={20}/><div><strong>Supabase authentication</strong><small>Secure account and session flow</small></div></span><span><Target size={20}/><div><strong>Owner-scoped RLS</strong><small>Users access only their own CRM records</small></div></span></div>
      </section>

      <footer><Link href="/" className="brand"><span className="brand-mark"><Target size={18}/></span>Pipeline<span className="brand-accent">OS</span></Link><span>Next.js • TypeScript • Supabase • PostgreSQL</span><Link href="/signup">Create workspace <ArrowRight size={14}/></Link></footer>
    </main>
  );
}
