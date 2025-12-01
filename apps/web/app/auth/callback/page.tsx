import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { getAuthCallbackState } from "@/app/lib/mock-data";

type AuthCallbackData = Awaited<ReturnType<typeof loadAuthCallbackPage>>;

async function loadAuthCallbackPage() {
  // TODO: Replace mock data with callback verification logic.
  const state = await getAuthCallbackState();
  return { state };
}

export default async function AuthCallbackPage() {
  const { state }: AuthCallbackData = await loadAuthCallbackPage();

  return (
    <AppShell title="Authentication" description="Completing your sign-in">
      <PageSection title="Callback status" description="Current state of the authentication flow">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{state.status}</p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{state.message}</p>
          <p className="mt-6 text-xs text-slate-500">Next route: {state.nextRoute}</p>
        </div>
      </PageSection>
    </AppShell>
  );
}
