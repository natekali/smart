import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getBillingSettings } from "@/app/lib/mock-data";

type BillingSettingsPageData = Awaited<ReturnType<typeof loadBillingSettingsPage>>;

async function loadBillingSettingsPage() {
  // TODO: Replace mock data with billing API integration.
  const settings = await getBillingSettings();
  return { settings };
}

export default async function BillingSettingsPage() {
  const { settings }: BillingSettingsPageData = await loadBillingSettingsPage();

  return (
    <AppShell title="Billing settings" description="Manage plan and payment info">
      <PageSection
        title="Current plan"
        description="View your subscription details"
        actions={
          <Link
            href="/pricing"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Change plan
          </Link>
        }
      >
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Plan</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{settings.plan}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Price</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{settings.price}/month</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Renews on</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.renewsOn}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Seats</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.seats}</dd>
          </div>
        </dl>
      </PageSection>

      <PageSection title="Payment method" description="Current payment details">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Card ending in</dt>
          <dd className="mt-1 font-medium text-slate-900 dark:text-white">{settings.paymentMethod}</dd>
        </div>
      </PageSection>
    </AppShell>
  );
}
