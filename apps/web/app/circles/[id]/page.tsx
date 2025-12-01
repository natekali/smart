import { z } from "zod";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getCircleDetail } from "@/app/lib/mock-data";
import { identifierSchema } from "@/app/lib/schemas";

const circleParamsSchema = z.object({ id: identifierSchema });

type CirclePageProps = {
  params: z.infer<typeof circleParamsSchema>;
};

type CirclePageData = Awaited<ReturnType<typeof loadCirclePage>>;

async function loadCirclePage(id: string) {
  // TODO: Replace mock data with circle detail query.
  const circle = await getCircleDetail(id);
  return { circle };
}

export default async function CirclePage({ params }: CirclePageProps) {
  const { id } = circleParamsSchema.parse(params);
  const { circle }: CirclePageData = await loadCirclePage(id);

  return (
    <AppShell title={circle.name} description={circle.description}>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Members</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{circle.memberCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Visibility</p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            {circle.isPublic ? "Public" : "Private"}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Cadence</p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{circle.meetingCadence}</p>
        </div>
      </div>

      <PageSection title="Focus topics" description="Key areas of collaboration">
        <div className="flex flex-wrap gap-3">
          {circle.focusTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
            >
              {topic}
            </span>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
