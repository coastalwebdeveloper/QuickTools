import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      tool_usage: {
        Row: {
          id: string
          tool_id: string
          user_ip: string
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_ip: string
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_ip?: string
          created_at?: string
        }
      }
      user_feedback: {
        Row: {
          id: string
          tool_id: string
          rating: number
          comment: string | null
          user_ip: string
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          rating: number
          comment?: string | null
          user_ip: string
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          rating?: number
          comment?: string | null
          user_ip?: string
          created_at?: string
        }
      }
    }
  }
}