import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { getAuthProviders } from "@/app/lib/mock-data";

type AuthProvidersData = Awaited<ReturnType<typeof loadAuthProviders>>;

async function loadAuthProviders() {
  // TODO: Replace mock provider list with authentication service call.
  const providers = await getAuthProviders();
  return { providers };
}

export default async function SignUpPage() {
  const { providers }: AuthProvidersData = await loadAuthProviders();

  return (
    <AppShell title="Sign up" description="Create your Smart workspace">
      <PageSection title="Choose provider" description="Create an account to get started">
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
                Sign up with {provider.name}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
          Already have an account? <Link href="/auth/signin" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </PageSection>
    </AppShell>
  );
}
