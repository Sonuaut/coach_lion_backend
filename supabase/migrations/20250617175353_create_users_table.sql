create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  password text not null,
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
