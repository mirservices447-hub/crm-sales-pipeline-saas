import Link from "next/link";
import { login } from "../auth/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link className="back-link" href="/">← CRM home</Link>
        <span className="badge dark-badge">Secure access</span>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to manage your leads, customers, deals and follow-ups.</p>
        {searchParams?.message ? <p className="form-message">{searchParams.message}</p> : null}
        <form action={login} className="auth-form">
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
          <button type="submit">Sign in</button>
        </form>
        <p className="auth-foot">New to the CRM? <Link href="/signup">Create an account</Link></p>
      </section>
    </main>
  );
}
