import type { ReactNode } from "react";
import { Sidebar, type SidebarProps } from "@/components/Sidebar";
import { TopBar, type TopBarProps } from "@/components/TopBar";

export type AppShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  sidebarProps?: SidebarProps;
  topBarProps?: Omit<TopBarProps, "title" | "description">;
};

export function AppShell({
  title,
  description,
  children,
  sidebarProps,
  topBarProps,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar {...sidebarProps} />
      <div className="flex w-0 flex-1 flex-col">
        <TopBar title={title} description={description} {...topBarProps} />
        <main className="flex flex-1 flex-col gap-6 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
