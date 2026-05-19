/**
 * PageHeader
 *
 * Standardized page header: uppercase TLB-orange title, optional subtitle, and
 * a right-aligned actions slot. Drop one of these at the top of every page in
 * a TLB internal app, immediately inside the AppShell main area.
 *
 * @example
 *   <PageHeader
 *     title="Cashflow"
 *     subtitle="13-week rolling forecast across all firms"
 *     actions={<Button>New entry</Button>}
 *   />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "mb-6 flex items-start justify-between gap-4 border-b border-border pb-4",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-3xl uppercase tracking-tight text-tlb-orange">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 font-sans text-base text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export { PageHeader };
