import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getWorkspaceStats } from "@/app/lib/mock-data";
import { getSupabaseEnvSummary } from "@smart/db";

type RootPageData = Awaited<ReturnType<typeof loadRootPage>>;

async function loadRootPage() {
  // TODO: Replace mock data with workspace bootstrap call.
  const [stats] = await Promise.all([getWorkspaceStats()]);
  const supabaseStatus = getSupabaseEnvSummary();
  return { stats, supabaseStatus };
}

const navigationLinks = [
  { label: "Home", description: "Workspace overview", href: "/home" },
  { label: "Garden", description: "Track insights", href: "/garden" },
  { label: "Summary", description: "Share narratives", href: "/summary/north-star" },
  { label: "Review queue", description: "Clear the backlog", href: "/review" },
  { label: "Circles", description: "Collaborate with peers", href: "/circles" },
  { label: "Paths", description: "Guide learning", href: "/paths" },
];

export default async function HomePage() {
  const { stats, supabaseStatus }: RootPageData = await loadRootPage();

  return (
    <AppShell title="Workspace overview" description="Smart scaffold ready to extend">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{stat.helperText}</p>
          </div>
        ))}
      </div>

      <PageSection title="Supabase environment" description="Check environment configuration">
        <ul className="space-y-2 text-sm">
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
      </PageSection>

      <PageSection title="Navigate" description="Jump into key surfaces">
        <div className="grid gap-4 md:grid-cols-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{link.label}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{link.description}</p>
            </Link>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
