import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { IdeaCard, mockIdeaCards } from "@/components/IdeaCard";
import { getHomeOverview, getWorkspaceStats } from "@/app/lib/mock-data";

type HomePageData = Awaited<ReturnType<typeof loadHomePage>>;

async function loadHomePage() {
  // TODO: Replace mock data with live API call.
  const [overview, stats] = await Promise.all([getHomeOverview(), getWorkspaceStats()]);
  return { overview, stats };
}

export default async function HomePage() {
  const { overview, stats }: HomePageData = await loadHomePage();

  return (
    <AppShell title="Home" description="Your workspace overview">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{stat.helperText}</p>
          </div>
        ))}
      </div>

      <PageSection title="Current focus" description="What you're working on right now">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Focus area</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{overview.focusArea}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Next milestone</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{overview.nextMilestone}</p>
          </div>
        </div>
      </PageSection>

      <PageSection title="Quick actions" description="Jump to your most important pages">
        <div className="grid gap-4 md:grid-cols-3">
          {overview.quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            >
              <p className="font-medium text-slate-900 dark:text-white">{link.label}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{link.description}</p>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection title="Active ideas" description="UI kit IdeaCards rendered with mock data">
        <div className="grid gap-4 md:grid-cols-2">
          {mockIdeaCards.slice(0, 2).map((idea) => (
            <IdeaCard key={idea.id} {...idea} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Reminders" description="Items to keep top of mind">
        <ul className="space-y-2">
          {overview.reminders.map((reminder, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
              <span>{reminder}</span>
            </li>
          ))}
        </ul>
      </PageSection>
    </AppShell>
  );
}
