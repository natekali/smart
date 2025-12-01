import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageSection } from "@/app/components/PageSection";
import { getAuthProviders } from "@/app/lib/mock-data";

type AuthProvidersData = Awaited<ReturnType<typeof loadAuthProviders>>;

async function loadAuthProviders() {
  // TODO: Replace mock provider list with authentication service call.
  const providers = await getAuthProviders();
  return { providers };
}

export default async function SignInPage() {
  const { providers }: AuthProvidersData = await loadAuthProviders();

  return (
    <AppShell title="Sign in" description="Access your Smart workspace">
      <PageSection title="Available providers" description="Choose how you would like to sign in">
        <div className="grid gap-3 md:grid-cols-2">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="font-semibold text-slate-900 dark:text-white">{provider.name}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{provider.description}</p>
              <button
                type="button"
                className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Continue with {provider.name}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
          Need an account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </PageSection>
    </AppShell>
  );
}
