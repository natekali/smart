"use client";

import { useState } from "react";

export type ReviewItemData = {
  id: string;
  type: "seed" | "insight" | "summary";
  title: string;
  content: string;
  author: string;
  submittedAt: string;
};

export type ReviewSessionProps = {
  items: ReviewItemData[];
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason?: string) => void;
  onDefer?: (id: string) => void;
};

const typeStyles = {
  seed: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  insight: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  summary: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
};

export function ReviewSession({ items, onApprove, onReject, onDefer }: ReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const currentItem = items[currentIndex];
  const hasNext = currentIndex < items.length - 1;
  const hasPrevious = currentIndex > 0;

  if (!currentItem) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-lg text-slate-600 dark:text-slate-400">
          No items to review. Great work clearing the queue!
        </p>
      </div>
    );
  }

  const handleApprove = () => {
    onApprove?.(currentItem.id);
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
    setFeedback("");
  };

  const handleReject = () => {
    onReject?.(currentItem.id, feedback);
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
    setFeedback("");
  };

  const handleDefer = () => {
    onDefer?.(currentItem.id);
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
    setFeedback("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Reviewing {currentIndex + 1} of {items.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={!hasPrevious}
            className="rounded-md px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(items.length - 1, currentIndex + 1))}
            disabled={!hasNext}
            className="rounded-md px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeStyles[currentItem.type]}`}>
                {currentItem.type}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{currentItem.title}</h3>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{currentItem.content}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-700">
          <span>by {currentItem.author}</span>
          <span>•</span>
          <span>{currentItem.submittedAt}</span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Feedback (optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Add notes or comments..."
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
          rows={3}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          Approve
        </button>
        <button
          onClick={handleDefer}
          className="flex-1 rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
        >
          Defer
        </button>
        <button
          onClick={handleReject}
          className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
        >
          Reject
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        TODO: Integrate with actual review queue API. Add keyboard shortcuts (a=approve, d=defer,
        r=reject). Store review feedback in database.
      </p>
    </div>
  );
}

export const mockReviewItems: ReviewItemData[] = [
  {
    id: "review-1",
    type: "seed",
    title: "Garden retro notes",
    content: "Notes from last week's retrospective about improving the garden interface and workflow.",
    author: "Jordan Smart",
    submittedAt: "1 hour ago",
  },
  {
    id: "review-2",
    type: "insight",
    title: "Async rituals recap",
    content: "Summary of findings from our month-long experiment with async standups.",
    author: "Alex Chen",
    submittedAt: "3 hours ago",
  },
  {
    id: "review-3",
    type: "summary",
    title: "Q4 learning report",
    content: "Comprehensive report consolidating key learnings and decisions from Q4 initiatives.",
    author: "Sam Rivera",
    submittedAt: "5 hours ago",
  },
];
