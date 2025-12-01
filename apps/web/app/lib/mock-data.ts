const delay = (ms = 40) => new Promise((resolve) => setTimeout(resolve, ms));

export type WorkspaceStat = {
  label: string;
  value: string;
  helperText: string;
  trend: "up" | "down" | "steady";
};

const WORKSPACE_STATS: WorkspaceStat[] = [
  { label: "Focus score", value: "82", helperText: "+5 vs last week", trend: "up" },
  { label: "Active circles", value: "12", helperText: "3 in review", trend: "steady" },
  { label: "Seeds planted", value: "48", helperText: "8 new this week", trend: "up" },
];

export async function getWorkspaceStats(): Promise<WorkspaceStat[]> {
  await delay();
  return WORKSPACE_STATS;
}

export type HomeOverview = {
  focusArea: string;
  nextMilestone: string;
  quickLinks: { label: string; href: string; description: string }[];
  reminders: string[];
};

const HOME_OVERVIEW: HomeOverview = {
  focusArea: "Research notes about async rituals",
  nextMilestone: "Consolidate summary for Friday demo",
  quickLinks: [
    { label: "Jump to review", href: "/review", description: "8 items waiting" },
    { label: "Open garden", href: "/garden", description: "Track experiments" },
    { label: "Check circles", href: "/circles", description: "See community" },
  ],
  reminders: ["Draft summary of interviews", "Record garden insight", "Share update with core circle"],
};

export async function getHomeOverview(): Promise<HomeOverview> {
  await delay();
  return HOME_OVERVIEW;
}

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  cadence: "monthly" | "annual";
  description: string;
  features: string[];
  popular?: boolean;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$12",
    cadence: "monthly",
    description: "For individuals exploring their garden.",
    features: ["Unlimited seeds", "Basic review automation", "1 circle"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$29",
    cadence: "monthly",
    description: "For small teams building a shared practice.",
    features: ["Shared garden", "Priority review cues", "3 circles"],
    popular: true,
  },
  {
    id: "strategy",
    name: "Strategy",
    price: "$99",
    cadence: "monthly",
    description: "For orgs turning ideas into playbooks.",
    features: ["Custom automations", "Insights API", "Unlimited circles"],
  },
];

export async function getPricingPlans(): Promise<PricingPlan[]> {
  await delay();
  return PRICING_PLANS;
}

export type SummaryDocument = {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  lastUpdated: string;
};

const SUMMARY_DOCUMENTS: Record<string, SummaryDocument> = {
  "north-star": {
    slug: "north-star",
    title: "North Star Narrative",
    summary: "Map the signals from research into a single decision frame.",
    highlights: [
      "Focus on habits not tactics",
      "Share context with circles weekly",
      "Invite critique before locking roadmap",
    ],
    lastUpdated: "2024-11-18",
  },
};

export async function getSummaryDocument(slug: string): Promise<SummaryDocument> {
  await delay();
  return (
    SUMMARY_DOCUMENTS[slug] ?? {
      slug,
      title: `Summary: ${slug}`,
      summary: "This placeholder summary will be replaced with live data.",
      highlights: ["Call the API once it is available", "Render insight level metrics"],
      lastUpdated: new Date().toISOString(),
    }
  );
}

export type GardenOverview = {
  collections: { name: string; insightCount: number }[];
  experiments: number;
  openQuestions: number;
};

const GARDEN_OVERVIEW: GardenOverview = {
  collections: [
    { name: "Research", insightCount: 18 },
    { name: "Design", insightCount: 9 },
    { name: "Go-to-market", insightCount: 16 },
  ],
  experiments: 4,
  openQuestions: 7,
};

export type GardenInsight = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  lastEdited: string;
};

const GARDEN_INSIGHTS: GardenInsight[] = [
  {
    id: "async-rituals",
    title: "Async rituals reduce blocker time",
    excerpt: "Teams with async rituals close loops 32% faster.",
    tags: ["rituals", "ops"],
    lastEdited: "2024-11-20",
  },
  {
    id: "feedback-layers",
    title: "Layered feedback keeps circles healthy",
    excerpt: "Feedback ladders help avoid burnout and churn.",
    tags: ["feedback", "circles"],
    lastEdited: "2024-11-22",
  },
];

export async function getGardenOverview(): Promise<GardenOverview> {
  await delay();
  return GARDEN_OVERVIEW;
}

export async function getGardenInsights(): Promise<GardenInsight[]> {
  await delay();
  return GARDEN_INSIGHTS;
}

export async function getGardenInsight(id: string): Promise<GardenInsight> {
  await delay();
  return (
    GARDEN_INSIGHTS.find((insight) => insight.id === id) ?? {
      id,
      title: "Unknown insight",
      excerpt: "No insight has been recorded for this ID yet.",
      tags: ["todo"],
      lastEdited: new Date().toISOString(),
    }
  );
}

export type ReviewItem = {
  id: string;
  title: string;
  type: "seed" | "insight" | "summary";
  dueDate: string;
};

const REVIEW_QUEUE: ReviewItem[] = [
  { id: "seed-1", title: "Garden retro notes", type: "seed", dueDate: "Tomorrow" },
  { id: "insight-3", title: "Async rituals recap", type: "insight", dueDate: "Today" },
  { id: "summary-2", title: "Q4 learning report", type: "summary", dueDate: "Friday" },
];

export async function getReviewQueue(): Promise<ReviewItem[]> {
  await delay();
  return REVIEW_QUEUE;
}

export type CircleSummary = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPublic: boolean;
};

const CIRCLES: CircleSummary[] = [
  {
    id: "pattern-lab",
    name: "Pattern Lab",
    description: "Research crew validating rituals.",
    memberCount: 18,
    isPublic: true,
  },
  {
    id: "ops-guild",
    name: "Ops Guild",
    description: "Operators sharing weekly experiments.",
    memberCount: 9,
    isPublic: false,
  },
];

export type CircleDetail = CircleSummary & {
  focusTopics: string[];
  meetingCadence: string;
};

const CIRCLE_DETAILS: Record<string, CircleDetail> = {
  "pattern-lab": {
    ...CIRCLES[0],
    focusTopics: ["Signal design", "Ritual QA"],
    meetingCadence: "Weekly",
  },
  "ops-guild": {
    ...CIRCLES[1],
    focusTopics: ["Playbooks", "Automation"],
    meetingCadence: "Bi-weekly",
  },
};

export async function getCircles(): Promise<CircleSummary[]> {
  await delay();
  return CIRCLES;
}

export async function getCircleDetail(id: string): Promise<CircleDetail> {
  await delay();
  return (
    CIRCLE_DETAILS[id] ?? {
      id,
      name: `Circle ${id}`,
      description: "This circle has not been configured yet.",
      memberCount: 0,
      isPublic: false,
      focusTopics: ["todo"],
      meetingCadence: "TBD",
    }
  );
}

export type LearningPath = {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalSteps: number;
};

export type LearningPathDetail = LearningPath & {
  milestones: { title: string; completed: boolean }[];
};

const PATHS: Record<string, LearningPathDetail> = {
  "discovery-first": {
    id: "discovery-first",
    name: "Discovery First",
    description: "Guide teams through discovery-first rituals.",
    progress: 3,
    totalSteps: 7,
    milestones: [
      { title: "Interview core customers", completed: true },
      { title: "Synthesize insights", completed: false },
      { title: "Playbook review", completed: false },
    ],
  },
  "async-mastery": {
    id: "async-mastery",
    name: "Async Mastery",
    description: "Enable async rituals inside remote teams.",
    progress: 5,
    totalSteps: 10,
    milestones: [
      { title: "Document rituals", completed: true },
      { title: "Pilot with circle", completed: true },
      { title: "Rollout dashboard", completed: false },
    ],
  },
};

export async function getPaths(): Promise<LearningPath[]> {
  await delay();
  return Object.values(PATHS).map(({ milestones, ...path }) => path);
}

export async function getPathDetail(id: string): Promise<LearningPathDetail> {
  await delay();
  return PATHS[id] ?? {
    id,
    name: `Path ${id}`,
    description: "Details coming soon.",
    progress: 0,
    totalSteps: 0,
    milestones: [],
  };
}

export type ProfileSettings = {
  displayName: string;
  role: string;
  timezone: string;
  availability: string[];
};

const PROFILE_SETTINGS: ProfileSettings = {
  displayName: "Jordan Smart",
  role: "Research Lead",
  timezone: "UTC-5",
  availability: ["Mon", "Tue", "Thu"],
};

export async function getProfileSettings(): Promise<ProfileSettings> {
  await delay();
  return PROFILE_SETTINGS;
}

export type BillingSettings = {
  plan: string;
  price: string;
  renewsOn: string;
  seats: number;
  paymentMethod: string;
};

const BILLING_SETTINGS: BillingSettings = {
  plan: "Growth",
  price: "$29",
  renewsOn: "2025-02-01",
  seats: 8,
  paymentMethod: "•••• 4242",
};

export async function getBillingSettings(): Promise<BillingSettings> {
  await delay();
  return BILLING_SETTINGS;
}

export type NotificationSettings = {
  emailDigests: boolean;
  pushReminders: boolean;
  weeklySummaryDay: string;
};

const NOTIFICATION_SETTINGS: NotificationSettings = {
  emailDigests: true,
  pushReminders: false,
  weeklySummaryDay: "Friday",
};

export async function getNotificationSettings(): Promise<NotificationSettings> {
  await delay();
  return NOTIFICATION_SETTINGS;
}

export type UserProfile = {
  username: string;
  displayName: string;
  bio: string;
  joinedAt: string;
  stats: { circles: number; paths: number; contributions: number };
};

const USER_PROFILES: Record<string, UserProfile> = {
  "demo-user": {
    username: "demo-user",
    displayName: "Demo User",
    bio: "Learning architect exploring async rituals.",
    joinedAt: "2023-05-10",
    stats: { circles: 3, paths: 2, contributions: 41 },
  },
};

export async function getUserProfile(username: string): Promise<UserProfile> {
  await delay();
  return (
    USER_PROFILES[username] ?? {
      username,
      displayName: username,
      bio: "This profile will be hydrated with live data soon.",
      joinedAt: new Date().toISOString(),
      stats: { circles: 0, paths: 0, contributions: 0 },
    }
  );
}

export type AuthProvider = {
  id: string;
  name: string;
  description: string;
};

const AUTH_PROVIDERS: AuthProvider[] = [
  { id: "email", name: "Magic link", description: "Send a secure link to your inbox." },
  { id: "github", name: "GitHub", description: "Use your GitHub identity." },
  { id: "google", name: "Google", description: "Sign in with Google Workspace." },
];

export async function getAuthProviders(): Promise<AuthProvider[]> {
  await delay();
  return AUTH_PROVIDERS;
}

export type AuthCallbackState = {
  status: "pending" | "success" | "error";
  message: string;
  nextRoute: string;
};

export async function getAuthCallbackState(): Promise<AuthCallbackState> {
  await delay();
  return {
    status: "pending",
    message: "Verifying session with Smart identity provider...",
    nextRoute: "/home",
  };
}
