import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gyiauyqkjukbabtxnkdn.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5aWF1eXFranVrYmFidHhua2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODAwMTEsImV4cCI6MjA5Mjk1NjAxMX0.ve877bvxiNrOmykIl0CJADerS808NXQ01B6CaMm0WBs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
