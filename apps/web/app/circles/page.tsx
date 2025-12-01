import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getCircles } from "@/app/lib/mock-data";

type CirclesPageData = Awaited<ReturnType<typeof loadCirclesPage>>;

async function loadCirclesPage() {
  // TODO: Replace mock data with circles API.
  const circles = await getCircles();
  return { circles };
}

export default async function CirclesPage() {
  const { circles }: CirclesPageData = await loadCirclesPage();

  return (
    <AppShell title="Circles" description="Communities collaborating with you">
      <PageSection title="Active circles" description="Choose a circle to go deeper">
        <div className="grid gap-4 md:grid-cols-2">
          {circles.map((circle) => (
            <Link
              key={circle.id}
              href={`/circles/${circle.id}`}
              className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{circle.name}</h3>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {circle.isPublic ? "Public" : "Private"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{circle.description}</p>
              <p className="mt-3 text-xs text-slate-500">{circle.memberCount} members</p>
            </Link>
          ))}
        </div>
      </PageSection>
    </AppShell>
  );
}
