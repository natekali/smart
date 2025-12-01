import type { ReactNode } from "react";

export type SummaryHeaderProps = {
  title: string;
  subtitle?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  lastUpdated: string;
  status?: "draft" | "published" | "archived";
  tags?: string[];
  actions?: ReactNode;
};

const statusStyles = {
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  published: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export function SummaryHeader({
  title,
  subtitle,
  author,
  lastUpdated,
  status = "draft",
  tags = [],
  actions,
}: SummaryHeaderProps) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
                {status}
              </span>
            </div>
            {subtitle && (
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-medium">{author.name}</span>
            </div>
          )}
          <span>Last updated: {lastUpdated}</span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export const mockSummaryHeader: SummaryHeaderProps = {
  title: "Q4 Product Strategy",
  subtitle: "Consolidating insights from user interviews and market research",
  author: {
    name: "Jordan Smart",
  },
  lastUpdated: "December 1, 2024",
  status: "published",
  tags: ["strategy", "Q4", "research", "product"],
};
