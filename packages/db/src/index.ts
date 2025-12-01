import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";

export const SUPABASE_ENV_KEYS = {
  publicUrl: "NEXT_PUBLIC_SUPABASE_URL",
  anonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  serviceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
} as const;

export type SupabaseEnvSummary = {
  hasPublicUrl: boolean;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  missingKeys: string[];
};

export const getSupabaseEnvSummary = (
  env: Record<string, string | undefined> = process.env,
): SupabaseEnvSummary => {
  const hasPublicUrl = Boolean(env[SUPABASE_ENV_KEYS.publicUrl]);
  const hasAnonKey = Boolean(env[SUPABASE_ENV_KEYS.anonKey]);
  const hasServiceRoleKey = Boolean(env[SUPABASE_ENV_KEYS.serviceRoleKey]);

  const missingKeys = Object.entries({
    [SUPABASE_ENV_KEYS.publicUrl]: hasPublicUrl,
    [SUPABASE_ENV_KEYS.anonKey]: hasAnonKey,
    [SUPABASE_ENV_KEYS.serviceRoleKey]: hasServiceRoleKey,
  })
    .filter(([, present]) => !present)
    .map(([key]) => key);

  return {
    hasPublicUrl,
    hasAnonKey,
    hasServiceRoleKey,
    missingKeys,
  };
};

export type SupabaseClientFactoryOptions = SupabaseClientOptions<string>;

export const createSupabaseBrowserClient = (
  env: Record<string, string | undefined> = process.env,
  options?: SupabaseClientFactoryOptions,
): SupabaseClient => {
  const url = env[SUPABASE_ENV_KEYS.publicUrl];
  const anonKey = env[SUPABASE_ENV_KEYS.anonKey];

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase configuration. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are defined.",
    );
  }

  return createClient(url, anonKey, options);
};
