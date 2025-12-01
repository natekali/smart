# Smart UI Components

Shared component library for the Smart workspace application. All components are built with:

- **TypeScript**: Strong typing for props and data
- **Tailwind CSS**: Utility-first styling with dark mode support
- **React 19**: Latest React features
- **Mock data**: Each component includes example data for development

## Components

### Layout Components

#### AppShell
Main application shell that wraps all pages with sidebar and top bar.

```tsx
<AppShell title="Page Title" description="Optional description">
  {children}
</AppShell>
```

#### Sidebar
Navigation sidebar with workspace sections.

```tsx
<Sidebar />
```

#### TopBar
Header bar with page title and user actions.

```tsx
<TopBar title="Page Title" description="Optional description" />
```

#### PageSection
Reusable section container for page content.

```tsx
<PageSection 
  title="Section Title" 
  description="Optional description"
  actions={<button>Action</button>}
>
  {children}
</PageSection>
```

### Content Components

#### IdeaCard
Display idea/seed cards with status, tags, and metadata.

```tsx
<IdeaCard
  id="idea-1"
  title="Idea Title"
  description="Idea description"
  tags={["tag1", "tag2"]}
  status="active"
  createdAt="2 days ago"
  author="Author Name"
/>
```

Status options: `"draft" | "active" | "archived" | "planted"`

Mock data available: `mockIdeaCards`

#### InsightCard
Display insights from the garden with tags and metrics.

```tsx
<InsightCard
  id="insight-1"
  title="Insight Title"
  excerpt="Insight excerpt or summary"
  tags={["tag1", "tag2"]}
  lastEdited="2 days ago"
  mood="good"
  metrics={[{ label: "Impact", value: "+32%" }]}
/>
```

Mood options: `"neutral" | "good" | "warning"`

Mock data available: `mockInsightCards`

#### SummaryHeader
Header component for summary documents with metadata.

```tsx
<SummaryHeader
  title="Summary Title"
  subtitle="Optional subtitle"
  author={{ name: "Author Name", avatar: "url" }}
  lastUpdated="December 1, 2024"
  status="published"
  tags={["tag1", "tag2"]}
/>
```

Status options: `"draft" | "published" | "archived"`

Mock data available: `mockSummaryHeader`

#### SummaryContent
Render structured summary content with sections and insights.

```tsx
<SummaryContent
  sections={[
    {
      title: "Section Title",
      body: "Section content",
      insights: ["Insight 1", "Insight 2"]
    }
  ]}
/>
```

Mock data available: `mockSummaryContent`

#### AudioPlayer
Audio playback interface (UI-only, TODO: integrate with audio service).

```tsx
<AudioPlayer
  title="Audio Title"
  artist="Artist Name"
  duration={485}
  src="optional-audio-url"
/>
```

Mock data available: `mockAudioPlayer`

**TODO**: Connect to actual audio streaming service, implement real playback controls.

#### ReviewSession
Interactive review workflow for approving/rejecting items.

```tsx
<ReviewSession
  items={[
    {
      id: "review-1",
      type: "seed",
      title: "Item Title",
      content: "Item content",
      author: "Author Name",
      submittedAt: "1 hour ago"
    }
  ]}
  onApprove={(id) => console.log("Approved", id)}
  onReject={(id, reason) => console.log("Rejected", id, reason)}
  onDefer={(id) => console.log("Deferred", id)}
/>
```

Item types: `"seed" | "insight" | "summary"`

Mock data available: `mockReviewItems`

**TODO**: 
- Integrate with review queue API
- Add keyboard shortcuts (a=approve, d=defer, r=reject)
- Store review feedback in database

## Usage

Import components from `@/components`:

```tsx
import { AppShell, PageSection, IdeaCard } from "@/components";
```

Or import individually:

```tsx
import { IdeaCard } from "@/components/IdeaCard";
```

## Mock Data

Each component exports mock data for testing and development:

```tsx
import { mockIdeaCards, mockInsightCards, mockSummaryHeader } from "@/components";
```

## Demo Page

View all components in action at `/components-demo` route.

## Composability

Components are designed to be composable and accept common patterns:

- **children**: Most layout components accept children
- **actions**: Many components accept action nodes for buttons/links
- **footer**: Card components accept footer content
- **onClick**: Interactive components support click handlers

## Styling

All components use Tailwind CSS with:
- Dark mode support via `dark:` variants
- Responsive design with `md:` and other breakpoints
- Consistent color palette (slate, blue)
- Accessible focus states

## Future Enhancements

- [ ] Add unit tests with React Testing Library
- [ ] Add Storybook for component documentation
- [ ] Implement actual audio streaming in AudioPlayer
- [ ] Connect ReviewSession to real API
- [ ] Add keyboard shortcuts for ReviewSession
- [ ] Add animation/transition effects
- [ ] Create more granular primitive components
- [ ] Add form components (inputs, selects, etc.)
