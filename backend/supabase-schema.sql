-- QuickTools Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query

-- ── Users table ───────────────────────────────────────────────────────────────
-- Stores Google OAuth users. We manage auth ourselves (custom JWT),
-- so this is a regular table, not Supabase Auth.

CREATE TABLE IF NOT EXISTS users (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_id     TEXT UNIQUE NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  avatar        TEXT,
  email_verified BOOLEAN DEFAULT false,
  plan          TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by google_id (used on every login)
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- ── Contact messages table ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  user_ip    TEXT,
  status     TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── AI Usage table (daily credit tracking) ────────────────────────────────────

CREATE TABLE IF NOT EXISTS ai_usage (
  id      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date    DATE NOT NULL DEFAULT CURRENT_DATE,
  count   INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_date ON ai_usage(user_id, date);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Backend uses service_role key which bypasses RLS.
-- Disable public access for safety.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- No public policies — only accessible via service_role key (backend)
