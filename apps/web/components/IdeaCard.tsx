import type { ReactNode } from "react";

export type IdeaCardStatus = "draft" | "active" | "archived" | "planted";

export type IdeaCardProps = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  status: IdeaCardStatus;
  createdAt: string;
  author?: string;
  onClick?: () => void;
  actions?: ReactNode;
};

const statusStyles: Record<IdeaCardStatus, string> = {
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  active: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  planted: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
};

export function IdeaCard({
  id,
  title,
  description,
  tags = [],
  status,
  createdAt,
  author,
  onClick,
  actions,
}: IdeaCardProps) {
  const Component = onClick ? "button" : "div";
  const interactiveStyles = onClick
    ? "cursor-pointer transition-all hover:border-blue-500 hover:shadow-md"
    : "";

  return (
    <Component
      onClick={onClick}
      className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 ${interactiveStyles}`}
      data-idea-id={id}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {author ? `by ${author}` : "Anonymous"} • {createdAt}
        </span>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </Component>
  );
}

export const mockIdeaCards: IdeaCardProps[] = [
  {
    id: "idea-1",
    title: "Async standup experiment",
    description: "Test async standups with Pattern Lab to reduce meeting fatigue.",
    tags: ["rituals", "async", "experiment"],
    status: "active",
    createdAt: "2 days ago",
    author: "Jordan Smart",
  },
  {
    id: "idea-2",
    title: "Garden insights dashboard",
    description: "Build a visual dashboard to track insight relationships.",
    tags: ["design", "visualization"],
    status: "draft",
    createdAt: "1 week ago",
    author: "Alex Chen",
  },
  {
    id: "idea-3",
    title: "Review automation workflow",
    description: "Automate review queue prioritization based on urgency.",
    tags: ["automation", "productivity"],
    status: "planted",
    createdAt: "3 days ago",
  },
  {
    id: "idea-4",
    title: "Circle feedback ladder",
    description: "Implement a feedback structure for healthier circle dynamics.",
    tags: ["circles", "feedback"],
    status: "archived",
    createdAt: "2 weeks ago",
    author: "Sam Rivera",
  },
];
