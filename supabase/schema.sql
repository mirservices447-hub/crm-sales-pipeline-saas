-- CRM MVP database foundation
create type public.app_role as enum ('admin','sales');
create type public.lead_status as enum ('new','contacted','qualified','lost','converted');
create type public.deal_stage as enum ('prospecting','qualified','proposal','negotiation','won','lost');

create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, role public.app_role not null default 'sales', created_at timestamptz not null default now());
create table public.leads (id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id), name text not null, email text, phone text, company text, status public.lead_status not null default 'new', created_at timestamptz not null default now());
create table public.customers (id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id), name text not null, email text, phone text, company text, created_at timestamptz not null default now());
create table public.deals (id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id), customer_id uuid references public.customers(id) on delete set null, title text not null, value numeric(12,2) not null default 0, stage public.deal_stage not null default 'prospecting', created_at timestamptz not null default now());
create table public.tasks (id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id), title text not null, due_at timestamptz, completed boolean not null default false, created_at timestamptz not null default now());
create table public.activities (id uuid primary key default gen_random_uuid(), actor_id uuid references public.profiles(id), entity_type text not null, entity_id uuid, action text not null, created_at timestamptz not null default now());

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.customers enable row level security;
alter table public.deals enable row level security;
alter table public.tasks enable row level security;
alter table public.activities enable row level security;

create policy "profiles read own" on public.profiles for select using (auth.uid() = id);
create policy "leads owner access" on public.leads for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "customers owner access" on public.customers for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "deals owner access" on public.deals for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "tasks owner access" on public.tasks for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "activities actor read" on public.activities for select using (auth.uid() = actor_id);
