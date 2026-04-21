-- Skema Database untuk Dashboard Portofolio Tio Mahesa
-- Jalankan kode ini di fitur "SQL Editor" pada Supabase Dashboard Anda.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    subtitle VARCHAR(255),
    role VARCHAR(255),
    description TEXT,
    tech_stack TEXT[], -- array of strings e.g. ['Vue.js', 'Tailwind']
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    image_urls TEXT[], -- array of image URLs
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: experiences
CREATE TABLE IF NOT EXISTS experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    "year" VARCHAR(100) NOT NULL, -- e.g. "2025 - Sekarang"
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: education
CREATE TABLE IF NOT EXISTS education (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role VARCHAR(255) NOT NULL, -- e.g. "S1 Sistem Informasi"
    company VARCHAR(255) NOT NULL, -- e.g. "ITB STIKOM Bali"
    "year" VARCHAR(100) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) DEFAULT 'Main',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set Up Row Level Security (RLS)
-- Mengizinkan READ untuk semua orang (anon), tapi INSERT/UPDATE/DELETE hanya untuk Authenticated (User Admin)

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Policy Select (Public)
CREATE POLICY "Public profiles are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone." ON experiences FOR SELECT USING (true);
CREATE POLICY "Public education are viewable by everyone." ON education FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone." ON skills FOR SELECT USING (true);

-- Policy Insert/Update/Delete (Authenticated users only)
CREATE POLICY "Users can insert their own projects." ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update their own projects." ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete their own projects." ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can insert experiences." ON experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update experiences." ON experiences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete experiences." ON experiences FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can insert education." ON education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update education." ON education FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete education." ON education FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can insert skills." ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update skills." ON skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete skills." ON skills FOR DELETE TO authenticated USING (true);
