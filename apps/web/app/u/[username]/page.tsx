import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { getUserProfile } from "@/app/lib/mock-data";
import { usernameSchema } from "@/app/lib/schemas";

const userParamsSchema = z.object({ username: usernameSchema });

type UserProfilePageProps = {
  params: z.infer<typeof userParamsSchema>;
};

type UserProfilePageData = Awaited<ReturnType<typeof loadUserProfilePage>>;

async function loadUserProfilePage(username: string) {
  // TODO: Replace mock data with user profile API.
  const profile = await getUserProfile(username);
  return { profile };
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = userParamsSchema.parse(params);
  const { profile }: UserProfilePageData = await loadUserProfilePage(username);

  return (
    <AppShell title={profile.displayName} description={`@${profile.username}`}>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Circles</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{profile.stats.circles}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Paths</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{profile.stats.paths}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Contributions</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{profile.stats.contributions}</p>
        </div>
      </div>

      <PageSection title="About" description={`Joined on ${profile.joinedAt}`}>
        <p className="text-base text-slate-700 dark:text-slate-200">{profile.bio}</p>
      </PageSection>
    </AppShell>
  );
}
