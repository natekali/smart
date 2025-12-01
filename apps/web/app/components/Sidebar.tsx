"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  match?: string;
};

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", href: "/" },
      { label: "Home", href: "/home" },
      { label: "Pricing", href: "/pricing" },
      { label: "Review", href: "/review" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Summary", href: "/summary/north-star", match: "/summary" },
      { label: "Garden", href: "/garden" },
      { label: "Insight detail", href: "/garden/insight/async-rituals", match: "/garden/insight" },
    ],
  },
  {
    title: "Collaboration",
    items: [
      { label: "Circles", href: "/circles" },
      { label: "Circle detail", href: "/circles/pattern-lab", match: "/circles/" },
      { label: "Paths", href: "/paths" },
      { label: "Path detail", href: "/paths/discovery-first", match: "/paths/" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Billing", href: "/settings/billing" },
      { label: "Notifications", href: "/settings/notifications" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "User profile", href: "/u/demo-user", match: "/u/" },
      { label: "Sign in", href: "/auth/signin" },
      { label: "Sign up", href: "/auth/signup" },
      { label: "Auth callback", href: "/auth/callback" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    const target = item.match ?? item.href;
    if (target === "/") {
      return pathname === "/";
    }
    if (pathname === item.href) {
      return true;
    }
    return pathname.startsWith(target);
  };

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {section.title}
              </h3>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mb-1 block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
