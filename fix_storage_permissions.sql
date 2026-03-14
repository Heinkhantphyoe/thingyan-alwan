-- 1. Ensure the bucket is public
UPDATE storage.buckets
SET public = true
WHERE id = 'memory-images';

-- 2. Allow public read access to all objects in the 'memory-images' bucket
-- This policy allows anyone (even logged out users) to view images
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'memory-images');

-- 3. Allow authenticated users to upload their own avatars
-- (Only if not already covered by other policies)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'memory-images');

-- 4. Allow users to update/delete their own objects
CREATE POLICY "Allow personal updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'memory-images' AND auth.uid() = owner);

CREATE POLICY "Allow personal deletions"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'memory-images' AND auth.uid() = owner);
