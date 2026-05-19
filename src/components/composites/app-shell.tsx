/**
 * AppShell
 *
 * Top-level layout for a TLB internal app: optional left sidebar (240px),
 * optional top bar, and a scrollable main content area. The sidebar is hidden
 * on screens narrower than the `md` breakpoint to leave room for a future
 * mobile drawer.
 *
 * @example
 *   <AppShell sidebar={<Nav />} topBar={<UserMenu />}>
 *     <PageHeader title="Cashflow" />
 *     <Card>...</Card>
 *   </AppShell>
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface AppShellProps {
  sidebar?: React.ReactNode;
  topBar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function AppShell({ sidebar, topBar, children, className }: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn(
        "flex min-h-screen bg-background text-foreground",
        className
      )}
    >
      {sidebar ? (
        <aside
          data-slot="app-shell-sidebar"
          className="hidden w-60 shrink-0 border-r border-border bg-card md:block"
        >
          {sidebar}
        </aside>
      ) : null}
      <div className="flex flex-1 flex-col">
        {topBar ? (
          <header
            data-slot="app-shell-topbar"
            className="border-b border-border bg-card"
          >
            {topBar}
          </header>
        ) : null}
        <main
          data-slot="app-shell-main"
          className="flex-1 overflow-y-auto p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export { AppShell };
