-- Tables for Thangyan Alwan

-- 1. Songs Table
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Memories Table
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage Buckets Configuration (Note: Buckets must be created via Supabase Dashboard or API)
-- thangyan-songs
-- memory-images

-- RLS Policies (Example for memories)
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to memories"
ON memories FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated users to insert memories"
ON memories FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for songs
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to songs"
ON songs FOR SELECT
TO public
USING (true);
