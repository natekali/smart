import type { ReactNode } from "react";

export type PageSectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageSection({ title, description, actions, children }: PageSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          {description ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex gap-2">{actions}</div> : null}
      </div>
      <div className="mt-6 text-sm text-slate-700 dark:text-slate-200">{children}</div>
    </section>
  );
}
