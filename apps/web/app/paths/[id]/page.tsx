import { z } from "zod";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getPathDetail } from "@/app/lib/mock-data";
import { identifierSchema } from "@/app/lib/schemas";

const pathParamsSchema = z.object({ id: identifierSchema });

type PathPageProps = {
  params: z.infer<typeof pathParamsSchema>;
};

type PathPageData = Awaited<ReturnType<typeof loadPathPage>>;

async function loadPathPage(id: string) {
  // TODO: Replace mock data with path detail query.
  const path = await getPathDetail(id);
  return { path };
}

export default async function PathPage({ params }: PathPageProps) {
  const { id } = pathParamsSchema.parse(params);
  const { path }: PathPageData = await loadPathPage(id);

  return (
    <AppShell title={path.name} description={path.description}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Progress</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {path.progress} / {path.totalSteps}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Completion</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {Math.round((path.progress / path.totalSteps) * 100 || 0)}%
          </p>
        </div>
      </div>

      <PageSection title="Milestones" description="Key checkpoints along the way">
        <div className="space-y-3">
          {path.milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 rounded-lg border p-4 ${
                milestone.completed
                  ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  milestone.completed
                    ? "bg-green-600 text-white"
                    : "bg-slate-300 text-slate-700 dark:bg-slate-600 dark:text-slate-300"
                }`}
              >
                {milestone.completed ? "✓" : idx + 1}
              </div>
              <span className="font-medium text-slate-900 dark:text-white">{milestone.title}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
