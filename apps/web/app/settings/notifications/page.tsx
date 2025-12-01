import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { getNotificationSettings } from "@/app/lib/mock-data";

type NotificationSettingsPageData = Awaited<ReturnType<typeof loadNotificationSettingsPage>>;

async function loadNotificationSettingsPage() {
  // TODO: Replace mock data with notification preferences API.
  const settings = await getNotificationSettings();
  return { settings };
}

export default async function NotificationSettingsPage() {
  const { settings }: NotificationSettingsPageData = await loadNotificationSettingsPage();

  return (
    <AppShell title="Notification settings" description="Control how Smart keeps you informed">
      <PageSection title="Preferences" description="Current notification channels">
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span>Email digests</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {settings.emailDigests ? "Enabled" : "Disabled"}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span>Push reminders</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {settings.pushReminders ? "Enabled" : "Disabled"}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span>Weekly summary day</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">{settings.weeklySummaryDay}</span>
          </li>
        </ul>
      </PageSection>
    </AppShell>
  );
}
