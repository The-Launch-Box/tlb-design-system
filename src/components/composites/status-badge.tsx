/**
 * StatusBadge
 *
 * Status pill with a paired lucide icon. Per TLB accessibility rule, color is
 * never the sole carrier of meaning, so every status carries both a color
 * (via Badge variant) and an icon.
 *
 * Statuses:
 *   - draft     outline border, document icon
 *   - pending   accent tint, pulsing dot icon
 *   - approved  charcoal secondary, check icon
 *   - rejected  destructive dark-orange, x icon
 *
 * Workflow statuses (added 2026-11 from the Echelon Automation Hub console,
 * for any automation that proposes, gets approved, then executes):
 *   received, analyzing, proposed, awaiting_approval, executing, completed,
 *   succeeded, failed, needs_attention, skipped, not_attempted, superseded,
 *   dismissed, expired
 *
 * Tones follow what the reader should feel: warning for "this waits on you",
 * info for "the system has it", negative for "step in", positive for "done
 * and written", muted for "finished, nothing to do".
 *
 * @example
 *   <StatusBadge status="pending" />
 */
import {
  Archive,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleOff,
  CircleSlash,
  CircleX,
  Clock,
  FileText,
  History,
  Hourglass,
  Inbox,
  OctagonAlert,
  Play,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "received"
  | "analyzing"
  | "proposed"
  | "awaiting_approval"
  | "executing"
  | "completed"
  | "succeeded"
  | "failed"
  | "needs_attention"
  | "skipped"
  | "not_attempted"
  | "superseded"
  | "dismissed"
  | "expired";
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface StatusConfig {
  label: string;
  variant: BadgeVariant;
  Icon: LucideIcon;
  /** Token-based tint on top of the variant. Never a raw color value. */
  className?: string;
}

const WARNING = "border-warning/50 bg-warning-dim text-warning";
const INFO = "border-info/50 bg-info-dim text-info";
const POSITIVE = "border-positive/50 bg-positive-dim text-positive";
const NEGATIVE = "border-negative/50 bg-negative-dim text-negative";
const MUTED = "text-muted-foreground";

const STATUS_CONFIG: Record<Status, StatusConfig> = {
  draft: { label: "Draft", variant: "outline", Icon: FileText },
  pending: { label: "Pending", variant: "default", Icon: CircleDot },
  approved: { label: "Approved", variant: "secondary", Icon: CircleCheck },
  rejected: { label: "Rejected", variant: "destructive", Icon: CircleX },
  received: { label: "Received", variant: "outline", Icon: Inbox },
  analyzing: { label: "Analyzing", variant: "outline", Icon: Sparkles, className: "border-info/50 text-info" },
  proposed: { label: "Proposed", variant: "outline", Icon: CircleDashed },
  awaiting_approval: { label: "Awaiting Approval", variant: "outline", Icon: Hourglass, className: WARNING },
  executing: { label: "Executing", variant: "outline", Icon: Play, className: INFO },
  completed: { label: "Completed", variant: "outline", Icon: CircleCheck, className: POSITIVE },
  succeeded: { label: "Succeeded", variant: "outline", Icon: CircleCheck, className: POSITIVE },
  failed: { label: "Failed", variant: "outline", Icon: TriangleAlert, className: NEGATIVE },
  needs_attention: { label: "Needs Attention", variant: "outline", Icon: OctagonAlert, className: WARNING },
  skipped: { label: "Skipped", variant: "outline", Icon: CircleOff, className: MUTED },
  not_attempted: { label: "Not Attempted", variant: "outline", Icon: CircleSlash, className: MUTED },
  superseded: { label: "Superseded", variant: "outline", Icon: History, className: MUTED },
  dismissed: { label: "Dismissed", variant: "outline", Icon: Archive, className: MUTED },
  expired: { label: "Expired", variant: "outline", Icon: Clock, className: MUTED },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
  label?: string;
}

function StatusBadge({ status, className, label }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.Icon;
  return (
    <Badge
      variant={config.variant}
      data-status={status}
      className={cn("gap-1", config.className, className)}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span>{label ?? config.label}</span>
    </Badge>
  );
}

/** The default label for a status, for a detail line beside a badge. */
function statusLabel(status: Status): string {
  return STATUS_CONFIG[status].label;
}

export { StatusBadge, statusLabel };
export type { Status };
