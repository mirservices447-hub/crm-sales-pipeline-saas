# CRM & Sales Pipeline SaaS

A production-style CRM and sales pipeline MVP built with **Next.js, TypeScript, Supabase, and PostgreSQL**.

## MVP modules
- Authentication
- Dashboard
- Leads
- Customers
- Deals / sales pipeline
- Tasks and follow-ups
- Activity history
- Admin and sales-user roles
- Row Level Security (RLS)
- Responsive UI

## Deployment target
GitHub → Hostinger, with Supabase providing authentication and PostgreSQL.

## Current status
Foundation branch created with the Next.js application shell, Supabase browser client, environment template, and initial PostgreSQL/RLS schema.

## Environment
Copy `.env.example` to `.env.local` and provide your Supabase project URL and anon key.

## Database
Run `supabase/schema.sql` in a dedicated Supabase project after reviewing it. Never commit service-role keys or database passwords.

## Development
```bash
npm install
npm run dev
```

## Delivery workflow
Build → Test → Verify → Deploy
