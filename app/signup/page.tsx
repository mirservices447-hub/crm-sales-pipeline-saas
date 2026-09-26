import Link from "next/link";
import { signup } from "../auth/actions";

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link className="back-link" href="/">← CRM home</Link>
        <span className="badge dark-badge">CRM SaaS • MVP</span>
        <h1>Create your workspace</h1>
        <p className="muted">Start with a secure account. Your CRM records are isolated with Row Level Security.</p>
        {searchParams?.message ? <p className="form-message">{searchParams.message}</p> : null}
        <form action={signup} className="auth-form">
          <label>Full name<input name="full_name" type="text" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" minLength={8} autoComplete="new-password" required /></label>
          <button type="submit">Create account</button>
        </form>
        <p className="auth-foot">Already have an account? <Link href="/login">Sign in</Link></p>
      </section>
    </main>
  );
}
