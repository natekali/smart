import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getProfileSettings } from "@/app/lib/mock-data";

type ProfileSettingsPageData = Awaited<ReturnType<typeof loadProfileSettingsPage>>;

async function loadProfileSettingsPage() {
  // TODO: Replace mock data with settings API.
  const settings = await getProfileSettings();
  return { settings };
}

export default async function ProfileSettingsPage() {
  const { settings }: ProfileSettingsPageData = await loadProfileSettingsPage();

  return (
    <AppShell title="Profile settings" description="Update your workspace identity">
      <PageSection title="Profile" description="Basic information">
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Display name</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.displayName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Role</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Timezone</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.timezone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Availability</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.availability.join(", ")}</dd>
          </div>
        </dl>
      </PageSection>
    </AppShell>
  );
}
