import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gmutkdowdxslpcgqmfeh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtdXRrZG93ZHhzbHBjZ3FtZmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODA3OTQsImV4cCI6MjA4MDI1Njc5NH0.gdZLdpSSutUJsCgdQebIASD95kM5TI-hxkx8YkF5bHc'

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