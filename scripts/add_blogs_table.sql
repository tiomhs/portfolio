-- Table: blogs
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image VARCHAR(255),
    category VARCHAR(100) DEFAULT 'General',
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public blogs are viewable by everyone." ON blogs FOR SELECT USING (true);
CREATE POLICY "Users can insert blogs." ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update blogs." ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete blogs." ON blogs FOR DELETE TO authenticated USING (true);

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
