import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getGardenOverview, getGardenInsights } from "@/app/lib/mock-data";

type GardenPageData = Awaited<ReturnType<typeof loadGardenPage>>;

async function loadGardenPage() {
  // TODO: Replace mock data with live API call.
  const [overview, insights] = await Promise.all([getGardenOverview(), getGardenInsights()]);
  return { overview, insights };
}

export default async function GardenPage() {
  const { overview, insights }: GardenPageData = await loadGardenPage();

  return (
    <AppShell title="Garden" description="Nurture your ideas and experiments">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Experiments</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{overview.experiments}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Open questions</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{overview.openQuestions}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Collections</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{overview.collections.length}</p>
        </div>
      </div>

      <PageSection title="Collections" description="Organized groups of insights">
        <div className="space-y-2">
          {overview.collections.map((collection) => (
            <div
              key={collection.name}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="font-medium text-slate-900 dark:text-white">{collection.name}</span>
              <span className="text-sm text-slate-600 dark:text-slate-300">{collection.insightCount} insights</span>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Recent insights" description="Latest additions to your garden">
        <div className="grid gap-4 md:grid-cols-2">
          {insights.map((insight) => (
            <Link
              key={insight.id}
              href={`/garden/insight/${insight.id}`}
              className="block rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{insight.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{insight.excerpt}</p>
              <div className="mt-3 flex gap-2">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">Last edited: {insight.lastEdited}</p>
            </Link>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
