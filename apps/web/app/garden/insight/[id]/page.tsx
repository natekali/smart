import { z } from "zod";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getGardenInsight } from "@/app/lib/mock-data";
import { identifierSchema } from "@/app/lib/schemas";

const insightParamsSchema = z.object({ id: identifierSchema });

type InsightPageProps = {
  params: z.infer<typeof insightParamsSchema>;
};

type InsightPageData = Awaited<ReturnType<typeof loadInsightPage>>;

async function loadInsightPage(id: string) {
  // TODO: Replace mock data with garden insight query.
  const insight = await getGardenInsight(id);
  return { insight };
}

export default async function GardenInsightPage({ params }: InsightPageProps) {
  const { id } = insightParamsSchema.parse(params);
  const { insight }: InsightPageData = await loadInsightPage(id);

  return (
    <AppShell title={insight.title} description={`Last edited ${insight.lastEdited}`}>
      <PageSection title="Insight" description="Reference insight details">
        <p className="text-base text-slate-700 dark:text-slate-200">{insight.excerpt}</p>
      </PageSection>

      <PageSection title="Tags" description="Contextual labels">
        <div className="flex flex-wrap gap-2">
          {insight.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
