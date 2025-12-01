import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { getPaths } from "@/app/lib/mock-data";

type PathsPageData = Awaited<ReturnType<typeof loadPathsPage>>;

async function loadPathsPage() {
  // TODO: Replace mock data with paths API.
  const paths = await getPaths();
  return { paths };
}

export default async function PathsPage() {
  const { paths }: PathsPageData = await loadPathsPage();

  return (
    <AppShell title="Paths" description="Structured ways to level up">
      <PageSection title="Learning paths" description="Track progress across milestones">
        <div className="grid gap-4 md:grid-cols-2">
          {paths.map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.id}`}
              className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{path.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{path.description}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{path.progress} steps completed</span>
                  <span>{path.totalSteps} total steps</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${(path.progress / path.totalSteps) * 100 || 0}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
