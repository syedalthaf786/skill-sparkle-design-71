-- Supabase SQL: run this in the Supabase SQL Editor
create table if not exists ads (
  id text primary key,
  url text not null,
  created_at timestamp with time zone default now()
);

-- Optional: allow public read access (restrict write to your admin)
alter table ads enable row level security;
create policy "Anyone can read ads" on ads for select using (true);
