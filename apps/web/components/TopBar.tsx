import type { ReactNode } from "react";
import Link from "next/link";

export type TopBarProps = {
  title: string;
  description?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function TopBar({ title, description, subtitle, actions }: TopBarProps) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {subtitle ?? "Smart Workspace"}
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
          {description ? (
            <p className="text-sm text-slate-500 dark:text-slate-300">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex items-center gap-3">{actions}</div>
        ) : (
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/pricing"
              className="text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline dark:text-slate-300"
            >
              Pricing
            </Link>
            <Link
              href="/auth/signin"
              className="rounded-md border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              Sign in
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
