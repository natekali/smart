import type { ReactNode } from "react";

export type SummarySection = {
  title: string;
  body: string;
  insights?: string[];
  actions?: ReactNode;
};

export type SummaryContentProps = {
  sections: SummarySection[];
};

export function SummaryContent({ sections }: SummaryContentProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <article key={section.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {section.body}
              </p>
            </div>
            {section.actions && <div className="flex gap-2">{section.actions}</div>}
          </div>
          {section.insights && section.insights.length > 0 && (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-600 dark:text-slate-300">
              {section.insights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

export const mockSummaryContent: SummaryContentProps = {
  sections: [
    {
      title: "Signal: Async rituals drive focus",
      body: "Teams that commit to async rituals report 32% better focus scores and 18% faster project throughput.",
      insights: [
        "Weekly check-ins keep circles aligned.",
        "Documented rituals reduce onboarding time.",
        "Async retro prompts surface blockers sooner.",
      ],
    },
    {
      title: "Decision: Maintain dual ritual cadence",
      body: "Keep both async and synchronous rituals active until circle cohesion reaches 80% for two weeks.",
      insights: ["Circles that hybridize rituals churn 40% less participants."],
    },
  ],
};
