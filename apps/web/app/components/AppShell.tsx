import type { ReactNode } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { TopBar } from "@/app/components/TopBar";

export type AppShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col">
        <TopBar title={title} description={description} />
        <main className="flex flex-1 flex-col gap-6 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
