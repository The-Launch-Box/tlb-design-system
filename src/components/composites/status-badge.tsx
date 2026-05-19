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
 * @example
 *   <StatusBadge status="pending" />
 */
import {
  CircleCheck,
  CircleDot,
  CircleX,
  FileText,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "draft" | "pending" | "approved" | "rejected";
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface StatusConfig {
  label: string;
  variant: BadgeVariant;
  Icon: LucideIcon;
}

const STATUS_CONFIG: Record<Status, StatusConfig> = {
  draft: { label: "Draft", variant: "outline", Icon: FileText },
  pending: { label: "Pending", variant: "default", Icon: CircleDot },
  approved: { label: "Approved", variant: "secondary", Icon: CircleCheck },
  rejected: { label: "Rejected", variant: "destructive", Icon: CircleX },
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
      className={cn("gap-1", className)}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span>{label ?? config.label}</span>
    </Badge>
  );
}

export { StatusBadge };
export type { Status };
