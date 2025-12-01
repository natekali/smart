import { getSupabaseEnvSummary } from "@smart/db";

export default function Home() {
  const supabaseStatus = getSupabaseEnvSummary();

  return (
    <div className="grid min-h-screen place-items-center p-8">
      <main className="flex flex-col items-center gap-8 text-center">
        <div className="inline-flex rounded-full border border-slate-200 px-4 py-1 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
          Turborepo + Next.js 15 + Supabase-ready
        </div>
        <h1 className="text-4xl font-bold">Welcome to Smart</h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A modern monorepo built with Turborepo, Next.js App Router, TypeScript, and Tailwind CSS.
        </p>
        <section className="rounded-2xl border border-slate-200 px-6 py-4 text-left shadow-sm dark:border-slate-700">
          <h2 className="text-base font-semibold">Supabase environment</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              Public URL: <strong>{supabaseStatus.hasPublicUrl ? "Configured" : "Missing"}</strong>
            </li>
            <li>
              Anon key: <strong>{supabaseStatus.hasAnonKey ? "Configured" : "Missing"}</strong>
            </li>
            <li>
              Service role: <strong>{supabaseStatus.hasServiceRoleKey ? "Configured" : "Missing"}</strong>
            </li>
          </ul>
          {!supabaseStatus.hasPublicUrl || !supabaseStatus.hasAnonKey ? (
            <p className="mt-3 text-xs text-amber-500">
              Provide the missing keys in <code>.env.local</code> to enable Supabase.
            </p>
          ) : (
            <p className="mt-3 text-xs text-emerald-500">Supabase is ready to go.</p>
          )}
        </section>
      </main>
    </div>
  );
}
