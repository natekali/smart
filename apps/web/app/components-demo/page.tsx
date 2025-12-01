"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { IdeaCard, mockIdeaCards } from "@/components/IdeaCard";
import { SummaryHeader, mockSummaryHeader } from "@/components/SummaryHeader";
import { SummaryContent, mockSummaryContent } from "@/components/SummaryContent";
import { AudioPlayer, mockAudioPlayer } from "@/components/AudioPlayer";
import { InsightCard, mockInsightCards } from "@/components/InsightCard";
import { ReviewSession, mockReviewItems } from "@/components/ReviewSession";

export default function ComponentsDemoPage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <AppShell title="Components Demo" description="UI Kit component showcase">
      <PageSection
        title="Component Library"
        description="Explore all available UI components with mock data"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <button
            onClick={() => setSelectedComponent("idea-card")}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          >
            <p className="font-semibold text-slate-900 dark:text-white">IdeaCard</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Display seed/idea items</p>
          </button>
          <button
            onClick={() => setSelectedComponent("summary-header")}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          >
            <p className="font-semibold text-slate-900 dark:text-white">SummaryHeader</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Summary page header</p>
          </button>
          <button
            onClick={() => setSelectedComponent("summary-content")}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          >
            <p className="font-semibold text-slate-900 dark:text-white">SummaryContent</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Rich content sections</p>
          </button>
          <button
            onClick={() => setSelectedComponent("audio-player")}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          >
            <p className="font-semibold text-slate-900 dark:text-white">AudioPlayer</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Audio playback UI</p>
          </button>
          <button
            onClick={() => setSelectedComponent("insight-card")}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          >
            <p className="font-semibold text-slate-900 dark:text-white">InsightCard</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Garden insight display</p>
          </button>
          <button
            onClick={() => setSelectedComponent("review-session")}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
          >
            <p className="font-semibold text-slate-900 dark:text-white">ReviewSession</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Review workflow UI</p>
          </button>
        </div>
      </PageSection>

      {selectedComponent === "idea-card" && (
        <PageSection title="IdeaCard" description="Card component for displaying ideas and seeds">
          <div className="space-y-4">
            {mockIdeaCards.map((card) => (
              <IdeaCard key={card.id} {...card} />
            ))}
          </div>
        </PageSection>
      )}

      {selectedComponent === "summary-header" && (
        <PageSection title="SummaryHeader" description="Header for summary documents">
          <SummaryHeader {...mockSummaryHeader} />
        </PageSection>
      )}

      {selectedComponent === "summary-content" && (
        <PageSection title="SummaryContent" description="Content sections for summaries">
          <SummaryContent {...mockSummaryContent} />
        </PageSection>
      )}

      {selectedComponent === "audio-player" && (
        <PageSection title="AudioPlayer" description="Audio playback interface">
          <AudioPlayer {...mockAudioPlayer} />
        </PageSection>
      )}

      {selectedComponent === "insight-card" && (
        <PageSection title="InsightCard" description="Cards for displaying insights">
          <div className="grid gap-4 md:grid-cols-2">
            {mockInsightCards.map((card) => (
              <InsightCard key={card.id} {...card} />
            ))}
          </div>
        </PageSection>
      )}

      {selectedComponent === "review-session" && (
        <PageSection title="ReviewSession" description="Review workflow interface">
          <ReviewSession items={mockReviewItems} />
        </PageSection>
      )}

      {!selectedComponent && (
        <PageSection title="Welcome" description="Select a component above to view examples">
          <p className="text-slate-600 dark:text-slate-300">
            This page demonstrates all the components in the UI kit. Each component is built with
            Tailwind CSS, includes TypeScript types, and has mock data for testing. Click on a
            component above to see it in action.
          </p>
        </PageSection>
      )}
    </AppShell>
  );
}
