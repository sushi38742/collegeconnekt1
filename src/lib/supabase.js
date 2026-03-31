import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || 'https://tqvfwekaafhzhrjienhs.supabase.co'
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxdmZ3ZWthYWZoemhyamllbmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODAxNTUsImV4cCI6MjA5MDU1NjE1NX0.OZkrQe-YV2tB0Z2BRWSoCdGvfYp_ik2Pg1EPlWPiGjs'

export const supabase = createClient(url, key)
export const supabaseConfigured = true
