import { createBrowserClient } from '@supabase/ssr'
import { generateSessionId } from './utils'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[Supabase] Missing env vars — running in demo mode')
    // Return a dummy client that won't crash the app
    return null as any
  }

  const client = createBrowserClient(url, key)

  // Set session ID for anonymous cart RLS
  const sessionId = generateSessionId()
  client.rpc('set_app_config', { key: 'session_id', value: sessionId }).then(() => {}, () => {})

  return client
}

export type SupabaseClient = ReturnType<typeof createClient>
