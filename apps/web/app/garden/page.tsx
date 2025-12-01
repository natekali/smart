import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { InsightCard } from "@/components/InsightCard";
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
            <InsightCard
              key={insight.id}
              id={insight.id}
              title={insight.title}
              excerpt={insight.excerpt}
              tags={insight.tags}
              lastEdited={insight.lastEdited}
              footer={
                <Link
                  className="font-medium text-blue-600 underline-offset-2 hover:underline"
                  href={`/garden/insight/${insight.id}`}
                >
                  View insight
                </Link>
              }
            />
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
