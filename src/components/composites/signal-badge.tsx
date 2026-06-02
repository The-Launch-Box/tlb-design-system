/**
 * SignalBadge
 *
 * Data-signal pill for financial transaction state: settled, pending, failed,
 * draft. Each kind pairs a dim background tint with a colored dot prefix so
 * meaning carries through both color and shape (TLB a11y rule). For workflow
 * states (draft / pending / approved / rejected) use the StatusBadge composite
 * instead. They cover separate domains.
 *
 * @example
 *   <SignalBadge kind="settled" />
 *   <SignalBadge kind="failed">Wire failed</SignalBadge>
 */
import * as React from "react";

import { cn } from "@/lib/utils";

type SignalKind = "settled" | "pending" | "failed" | "draft";

interface SignalBadgeProps {
  kind: SignalKind;
  children?: React.ReactNode;
  className?: string;
}

const KIND_LABEL: Record<SignalKind, string> = {
  settled: "Settled",
  pending: "Pending",
  failed: "Failed",
  draft: "Draft",
};

const KIND_CLASSES: Record<SignalKind, string> = {
  settled: "bg-positive-dim text-positive",
  pending: "bg-warning-dim text-warning",
  failed: "bg-negative-dim text-negative",
  draft: "bg-bg-raised text-muted-foreground border border-border",
};

const DOT_CLASSES: Record<SignalKind, string> = {
  settled: "bg-positive",
  pending: "bg-warning",
  failed: "bg-negative",
  draft: "bg-fg-faint",
};

function SignalBadge({ kind, children, className }: SignalBadgeProps) {
  return (
    <span
      data-slot="signal-badge"
      data-kind={kind}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        KIND_CLASSES[kind],
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", DOT_CLASSES[kind])}
      />
      {children ?? KIND_LABEL[kind]}
    </span>
  );
}

export { SignalBadge };
export type { SignalBadgeProps, SignalKind };
