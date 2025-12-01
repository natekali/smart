import { notFound } from "next/navigation";
import { z } from "zod";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getSummaryDocument } from "@/app/lib/mock-data";
import { slugSchema } from "@/app/lib/schemas";

const summaryParamsSchema = z.object({ slug: slugSchema });

type SummaryPageProps = {
  params: z.infer<typeof summaryParamsSchema>;
};

type SummaryPageData = Awaited<ReturnType<typeof loadSummaryPage>>;

async function loadSummaryPage(slug: string) {
  // TODO: Replace mock data with live API call.
  const document = await getSummaryDocument(slug);
  return document;
}

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { slug } = summaryParamsSchema.parse(params);
  const document: SummaryPageData = await loadSummaryPage(slug);

  if (!document) {
    notFound();
  }

  return (
    <AppShell title={document.title} description={`Last updated: ${document.lastUpdated}`}>
      <PageSection title="Summary" description="Key insights and learnings">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">{document.summary}</p>
      </PageSection>

      <PageSection title="Highlights" description="Top takeaways from this summary">
        <ul className="space-y-2">
          {document.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {idx + 1}
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </PageSection>
    </AppShell>
  );
}
