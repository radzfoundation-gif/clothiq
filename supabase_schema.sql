-- Create the waitlist table
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public waitlist)
create policy "Allow public insert"
  on public.waitlist
  for insert
  with check (true);

-- Allow admins to view (optional, specific setup may vary)
-- For now, we just need insert access for the public page.
