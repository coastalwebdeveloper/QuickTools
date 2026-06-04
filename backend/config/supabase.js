import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend/.env — needed because ES modules are evaluated before
// server.js gets a chance to call dotenv.config()
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase credentials in backend/.env\n' +
    '  → Set SUPABASE_URL (your project URL)\n' +
    '  → Set SUPABASE_SERVICE_KEY (service_role key from Dashboard → Settings → API)'
  );
}

/**
 * Supabase admin client using SERVICE ROLE key.
 * - Bypasses Row Level Security — safe for backend only.
 * - Never send this key to the frontend.
 */
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export default supabase;

