-- =====================================================
-- SVM Technologies - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- 1. Popup Ads Table (for carousel popup images)
-- =====================================================
create table popup_ads (
  id text primary key,
  url text not null,
  title text,
  active boolean default true,
  created_at timestamp default now()
);

comment on table popup_ads is 'Stores popup ad images for carousel display';


-- 2. Contact Form Submissions Table
-- =====================================================
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  created_at timestamp default now()
);

comment on table contact_submissions is 'Stores contact form submissions from /contact page';


-- 3. Careers Form Submissions Table
-- =====================================================
create table careers_submissions (
  id uuid default gen_random_uuid() primary key,
  role text not null,
  name text not null,
  email text not null,
  phone text,
  resume text,
  message text,
  created_at timestamp default now()
);

comment on table careers_submissions is 'Stores job application submissions from /careers page';


-- =====================================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- =====================================================

-- Enable RLS on all tables
alter table popup_ads enable row level security;
alter table contact_submissions enable row level security;
alter table careers_submissions enable row level security;


-- Popup ads policies
create policy "Public can view active ads" 
  on popup_ads for select using (active = true);

create policy "Admin can manage ads" 
  on popup_ads for all using (true);


-- Contact submissions policies
create policy "Anyone can submit contact form" 
  on contact_submissions for insert with check (true);

create policy "Public cannot view submissions" 
  on contact_submissions for select using (false);


-- Careers submissions policies
create policy "Anyone can submit careers form" 
  on careers_submissions for insert with check (true);

create policy "Public cannot view submissions" 
  on careers_submissions for select using (false);


-- =====================================================
-- STORAGE BUCKET (Run in Supabase Dashboard)
-- =====================================================
-- Go to Storage > Buckets > Create bucket
-- Name: popup-ads
-- Public: Yes (for image display)
-- File size limit: 5MB recommended
-- Allowed MIME types: image/*


-- =====================================================
-- INSERT DEFAULT DATA (Optional)
-- =====================================================
insert into popup_ads (id, url, title, active) values 
  ('1', '/ad-banner.jpg', 'Default Ad', true);