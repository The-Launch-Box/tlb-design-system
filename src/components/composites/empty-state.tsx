/**
 * EmptyState
 *
 * Standardized "no results" or "nothing here yet" block. Always pairs an icon,
 * a one-sentence headline, optional description, and a primary action. Used
 * in lists, tables, and dashboards.
 *
 * @example
 *   <EmptyState
 *     icon={Inbox}
 *     title="No requests yet"
 *     description="When a teammate submits a request, it shows up here."
 *     action={<Button>New request</Button>}
 *   />
 */
import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 py-12 px-6 text-center",
        className
      )}
    >
      {Icon ? (
        <Icon className="size-10 text-muted-foreground" aria-hidden="true" />
      ) : null}
      <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
        {title}
      </h3>
      {description ? (
        <p className="max-w-md font-sans text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export { EmptyState };
