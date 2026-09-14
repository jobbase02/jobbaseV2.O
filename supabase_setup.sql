-- ==============================================================================
-- JOBBASE SUPABASE SETUP SCRIPT (RESOURCES & STORAGE ONLY)
-- Note: Sanity CMS is your primary CMS for Jobs & Descriptions.
-- Supabase is used strictly for Free Resources DB & Storage Buckets.
-- Copy and paste this script into your Supabase SQL Editor and click "Run".
-- ==============================================================================

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE RESOURCES TABLE (For Free Resources Library)
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Interview Roadmaps', 'PDF Cheatsheets', 'Resume Templates'
    description TEXT,
    file_url TEXT NOT NULL,
    file_size VARCHAR(50) NOT NULL, -- e.g. '1.2 MB'
    format VARCHAR(20) NOT NULL DEFAULT 'PDF', -- 'PDF', 'ZIP', 'DOCX'
    download_count INT DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE STORAGE BUCKET FOR FREE RESOURCES
-- Bucket: 'resources-files' (Public bucket for downloadable PDFs, cheat sheets, templates)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resources-files', 'resources-files', true)
ON CONFLICT (id) DO NOTHING;

-- 4. STORAGE ROW LEVEL SECURITY (RLS) POLICIES
-- Allow public read access to 'resources-files'
CREATE POLICY "Public Read Access for Resource Files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'resources-files');

-- Allow public insert for uploads (adjust as needed for admin role)
CREATE POLICY "Public Upload Access for Resource Files" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'resources-files');

-- 5. ENABLE RLS ON RESOURCES TABLE & ADD PUBLIC READ POLICY
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read resources" ON public.resources FOR SELECT USING (true);

-- 6. SEED INITIAL HIGH-TRUST RESOURCES DATA
INSERT INTO public.resources (title, slug, category, description, file_url, file_size, format, tags)
VALUES 
(
  'Top 50 SDE-1 Data Structures & Algorithms Cheatsheet', 
  'dsa-sde1-cheatsheet', 
  'PDF Cheatsheets', 
  'Curated quick-reference guide covering arrays, trees, graphs, and dynamic programming patterns for tech interviews.', 
  'https://raw.githubusercontent.com/jobbase/resources/main/dsa-cheatsheet.pdf', 
  '2.4 MB', 
  'PDF', 
  ARRAY['DSA', 'SDE-1', 'Coding Interview']
),
(
  'ATS-Optimized Modern Tech Resume Template', 
  'ats-tech-resume-template', 
  'Resume Templates', 
  'Clean, single-column LaTeX & Word resume format proven to pass ATS filters for top tech companies.', 
  'https://raw.githubusercontent.com/jobbase/resources/main/ats-resume.docx', 
  '450 KB', 
  'DOCX', 
  ARRAY['Resume', 'ATS', 'Fresher']
),
(
  'Complete Frontend Developer Interview Roadmap 2024-2025', 
  'frontend-developer-roadmap', 
  'Interview Roadmaps', 
  'Step-by-step master plan covering HTML5, CSS Grid/Flexbox, JavaScript ES6+, React, Next.js, and Web Performance.', 
  'https://raw.githubusercontent.com/jobbase/resources/main/frontend-roadmap.pdf', 
  '4.1 MB', 
  'PDF', 
  ARRAY['Frontend', 'React', 'Next.js', 'Roadmap']
),
(
  'System Design Primer for 1-3 YOE Engineers', 
  'system-design-primer-1-3yoe', 
  'Interview Roadmaps', 
  'High-level architecture patterns, microservices basics, database indexing, caching (Redis), and load balancers.', 
  'https://raw.githubusercontent.com/jobbase/resources/main/system-design-primer.pdf', 
  '3.8 MB', 
  'PDF', 
  ARRAY['System Design', 'Backend', 'Architecture']
)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 7. SUBSCRIBERS TABLE (Newsletter / Career Notifications)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for real-time fast lookups on email (Supabase creates a unique index for UNIQUE constraints automatically, but explicitly defining it helps document intent)
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON public.subscribers(email);

-- Enable RLS for subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public insert to subscribe (but restrict read access so emails remain private)
CREATE POLICY "Allow public insert to subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);
-- Note: Intentionally no SELECT policy for public, so users cannot read the email list.

-- 5. Create contact_messages table for contact form & ad spot inquiries
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    reason text NOT NULL,
    message text,
    ad_spot text,
    page_name text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to contact_messages
CREATE POLICY "Allow public insert to contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
-- Intentionally no SELECT policy for public to protect user inquiries.
