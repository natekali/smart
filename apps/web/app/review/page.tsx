import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { ReviewSession } from "@/components/ReviewSession";
import { getReviewQueue } from "@/app/lib/mock-data";

type ReviewPageData = Awaited<ReturnType<typeof loadReviewPage>>;

async function loadReviewPage() {
  // TODO: Replace mock data with live review queue API.
  const queue = await getReviewQueue();
  return { queue };
}

export default async function ReviewPage() {
  const { queue }: ReviewPageData = await loadReviewPage();
  const sessionItems = queue.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    content: `Queued ${item.type} awaiting your review. Target due date: ${item.dueDate}.`,
    author: "Workflow engine",
    submittedAt: `Due ${item.dueDate}`,
  }));

  return (
    <AppShell title="Review" description="Items waiting for your attention">
      <PageSection
        title="Review queue"
        description={`${queue.length} items to review`}
      >
        <ReviewSession items={sessionItems} />
      </PageSection>
    </AppShell>
  );
}
