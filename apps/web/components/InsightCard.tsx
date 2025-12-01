import type { ReactNode } from "react";

export type InsightCardProps = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  lastEdited: string;
  mood?: "neutral" | "good" | "warning";
  metrics?: { label: string; value: string }[];
  footer?: ReactNode;
};

const moodBorder: Record<NonNullable<InsightCardProps["mood"]>, string> = {
  neutral: "border-slate-200 dark:border-slate-700",
  good: "border-emerald-200 dark:border-emerald-600/50",
  warning: "border-amber-200 dark:border-amber-600/50",
};

export function InsightCard({
  id,
  title,
  excerpt,
  tags,
  lastEdited,
  mood = "neutral",
  metrics,
  footer,
}: InsightCardProps) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 ${moodBorder[mood]}`}
      data-insight-id={id}
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{excerpt}</p>
      </div>

      {metrics && metrics.length > 0 && (
        <dl className="grid gap-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
              <dt className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</dt>
              <dd className="text-lg font-semibold text-slate-900 dark:text-white">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

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

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Last edited {lastEdited}</span>
        {footer}
      </div>
    </article>
  );
}

export const mockInsightCards: InsightCardProps[] = [
  {
    id: "insight-1",
    title: "Async standups cut blocker time",
    excerpt: "Teams reported 32% faster unblock rates after adopting async rituals for status updates.",
    tags: ["async", "rituals"],
    lastEdited: "2 days ago",
    mood: "good",
    metrics: [
      { label: "Impact", value: "+32%" },
      { label: "Confidence", value: "High" },
    ],
  },
  {
    id: "insight-2",
    title: "Circle feedback fatigue",
    excerpt: "Circles without ritual breaks see burnout after 6 weeks of weekly feedback sessions.",
    tags: ["circles", "feedback"],
    lastEdited: "5 days ago",
    mood: "warning",
    metrics: [{ label: "Risk", value: "Medium" }],
  },
];
