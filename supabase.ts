import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_CONFIG_KEY = 'kla_supabase_config_override';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isOverridden: boolean;
}

/**
 * Validates and sanitizes a Supabase URL.
 * Returns the normalized HTTPS/HTTP origin or null if invalid or placeholder.
 */
export function sanitizeAndValidateSupabaseUrl(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  let url = rawUrl.trim();
  if (!url) return null;

  // Ignore default placeholders
  if (
    url.includes('your-project') ||
    url.includes('YOUR_SUPABASE_URL') ||
    url.includes('MY_SUPABASE_URL') ||
    url === 'undefined' ||
    url === 'null'
  ) {
    return null;
  }

  // Prepend https:// if user provided project domain without protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      if (parsed.hostname && (parsed.hostname.includes('.') || parsed.hostname === 'localhost')) {
        return parsed.origin;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Validates that an anon key is not empty or a placeholder
 */
export function isValidAnonKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (
    trimmed.length < 20 ||
    trimmed.includes('your-anon-key') ||
    trimmed.includes('YOUR_ANON_KEY') ||
    trimmed.includes('MY_SUPABASE_ANON_KEY')
  ) {
    return false;
  }
  return true;
}

export function getSupabaseConfig(): SupabaseConfig {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '').trim();
  const envAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '').trim();

  // Allow manual override from admin setup UI if env vars aren't injected yet
  let customUrl = '';
  let customKey = '';
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      customUrl = (parsed.url || '').trim();
      customKey = (parsed.anonKey || '').trim();
    }
  } catch {
    // ignore
  }

  if (customUrl && customKey) {
    return {
      url: customUrl,
      anonKey: customKey,
      isOverridden: true
    };
  }

  return {
    url: envUrl,
    anonKey: envAnonKey,
    isOverridden: false
  };
}

export function setSupabaseConfigOverride(url: string, anonKey: string): void {
  try {
    if (!url.trim() && !anonKey.trim()) {
      localStorage.removeItem(STORAGE_CONFIG_KEY);
    } else {
      localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }));
    }
    // Re-initialize cached client
    cachedClient = null;
  } catch {
    // ignore
  }
}

export function isSupabaseConfigured(): boolean {
  const config = getSupabaseConfig();
  const validUrl = sanitizeAndValidateSupabaseUrl(config.url);
  const validKey = isValidAnonKey(config.anonKey);
  return Boolean(validUrl && validKey);
}

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const config = getSupabaseConfig();
  const validUrl = sanitizeAndValidateSupabaseUrl(config.url);
  const validKey = isValidAnonKey(config.anonKey);

  if (!validUrl || !validKey) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient(validUrl, config.anonKey.trim(), {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: 'kla_supabase_auth_token'
        }
      });
    } catch {
      // Gracefully return null if initialization fails
      return null;
    }
  }

  return cachedClient;
}

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Supabase credentials are not configured yet or contain invalid placeholders. Please provide a valid project URL (e.g., https://your-ref.supabase.co) and public Anon Key.'
    };
  }

  const client = getSupabase();
  if (!client) {
    return {
      success: false,
      message: 'Failed to initialize Supabase client with the provided credentials. Please check the URL and Anon Key.'
    };
  }

  try {
    // Query website_settings to verify table connectivity
    const { data, error } = await client
      .from('website_settings')
      .select('chamber_name, updated_at')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        return {
          success: false,
          message: 'Connected to Supabase project, but tables are not created yet. Please execute the provided schema.sql in Supabase SQL Editor.',
          details: error
        };
      }
      return {
        success: false,
        message: `Database query returned error: ${error.message} (Code: ${error.code})`,
        details: error
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase PostgreSQL database!',
      details: data
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error connecting to Supabase host.'
    };
  }
}
