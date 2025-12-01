import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { getPricingPlans } from "@/app/lib/mock-data";

type PricingPageData = Awaited<ReturnType<typeof loadPricingPage>>;

async function loadPricingPage() {
  // TODO: Replace mock data with billing service integration.
  const plans = await getPricingPlans();
  return { plans };
}

export default async function PricingPage() {
  const { plans }: PricingPageData = await loadPricingPage();

  return (
    <AppShell title="Pricing" description="Plans to grow with your team">
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all ${
              plan.popular
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            {plan.popular ? (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                Popular
              </div>
            ) : null}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-600 dark:text-slate-300">/{plan.cadence}</span>
              </div>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/auth/signup"
                className={`block rounded-md px-6 py-3 text-center font-medium ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                }`}
              >
                Get started
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
