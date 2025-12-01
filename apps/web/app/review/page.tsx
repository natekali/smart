import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getReviewQueue } from "@/app/lib/mock-data";

type ReviewPageData = Awaited<ReturnType<typeof loadReviewPage>>;

async function loadReviewPage() {
  // TODO: Replace mock data with live review queue API.
  const queue = await getReviewQueue();
  return { queue };
}

export default async function ReviewPage() {
  const { queue }: ReviewPageData = await loadReviewPage();

  return (
    <AppShell title="Review" description="Items waiting for your attention">
      <PageSection title="Review queue" description={`${queue.length} items to review`}>
        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.type === "seed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : item.type === "insight"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                        : "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                  }`}
                >
                  {item.type}
                </span>
                <span className="font-medium text-slate-900 dark:text-white">{item.title}</span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">{item.dueDate}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
