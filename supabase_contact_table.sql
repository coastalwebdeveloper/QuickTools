-- Create contact_messages table in Supabase
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (send messages)
CREATE POLICY "Anyone can submit contact form" 
ON contact_messages FOR INSERT 
TO anon 
WITH CHECK (true);

-- Only authenticated users can view (for admin dashboard)
CREATE POLICY "Only authenticated users can view messages" 
ON contact_messages FOR SELECT 
TO authenticated 
USING (true);
