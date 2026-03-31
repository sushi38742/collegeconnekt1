import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fall back to a dummy URL so createClient doesn't throw at module load.
// Auth/data features simply won't work until real env vars are provided.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-anon-key'
)

export const supabaseConfigured = Boolean(url && key)
