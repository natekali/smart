import { notFound } from "next/navigation";
import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { SummaryHeader } from "@/components/SummaryHeader";
import { SummaryContent } from "@/components/SummaryContent";
import { AudioPlayer } from "@/components/AudioPlayer";
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

  const summarySections = [
    {
      title: "Summary overview",
      body: document.summary,
    },
    {
      title: "Highlights",
      body: "Top signals to share with the team.",
      insights: document.highlights,
    },
  ];

  return (
    <AppShell title={document.title} description={`Last updated: ${document.lastUpdated}`}>
      <SummaryHeader
        title={document.title}
        subtitle="Narrative generated from Smart research"
        lastUpdated={document.lastUpdated}
        status="published"
        tags={["summary", document.slug]}
      />

      <SummaryContent sections={summarySections} />

      <PageSection title="Audio companion" description="Share a narrated version of this summary">
        <AudioPlayer title={`${document.title} audio`} duration={485} />
      </PageSection>
    </AppShell>
  );
}
