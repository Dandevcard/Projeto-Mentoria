
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing')
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

export type User = {
  id: string
  email: string
  name: string
  user_type: 'mentor' | 'user'
}

export type Mentor = {
  id: string
  user_id: string
  expertise_area: string
  experience_level: string
  hourly_rate: number
  availability: {
    [key: string]: { start: string; end: string }[]
  }
  linkedin_url: string
  mini_bio: string
}

export type MentorSession = {
  id: string
  mentor_id: string
  user_id: string
  status: 'pending' | 'approved' | 'rejected'
  request_date: string
  session_date: string
  notes: string
}
