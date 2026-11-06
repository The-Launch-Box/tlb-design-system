/**
 * ReviewItemCard
 *
 * One line item in a human-in-the-loop review: an ordered, numbered card with
 * an icon, a display label, an optional reference badge, a status slot, an
 * optional "Exclude" control, a one-line summary, the item's details, the
 * resulting record once done, and a "Why it failed" panel on failure.
 *
 * Use it for anything an operator approves item by item before the system
 * writes it: CRM writes, invoice lines, payroll adjustments.
 *
 * Source: Echelon Automation Hub `web/src/components/feature/operations/operation-card-shell.tsx`,
 * generalized from Echelon's Operation type.
 *
 * @example
 *   <ReviewItemCard
 *     index={1}
 *     icon={Building2}
 *     label="Create company"
 *     reference="P-03"
 *     status={<StatusBadge status="pending" />}
 *     summary="Create Acme Corp in HubSpot"
 *     excludable
 *     excluded={excluded}
 *     onExcludedChange={setExcluded}
 *   >
 *     <PayloadList payload={payload} />
 *   </ReviewItemCard>
 */
import { useId, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ReviewItemCardProps {
  /** One-based position in the ordered list. Rendered as two digits. */
  index: number;
  icon: LucideIcon;
  label: ReactNode;
  /** A short reference, e.g. a protocol step or line number. */
  reference?: string;
  /** Usually a StatusBadge. */
  status?: ReactNode;
  summary?: ReactNode;
  /** Shows the Exclude checkbox. True only while the item is still reviewable. */
  excludable?: boolean;
  excluded?: boolean;
  onExcludedChange?: (excluded: boolean) => void;
  /** The id of the record the item produced, once it ran. */
  resultId?: string;
  /** Shown in a "Why it failed" panel when defined. */
  error?: string;
  children?: ReactNode;
  className?: string;
}

function ReviewItemCard({
  index,
  icon: Icon,
  label,
  reference,
  status,
  summary,
  excludable = false,
  excluded = false,
  onExcludedChange,
  resultId,
  error,
  children,
  className,
}: ReviewItemCardProps) {
  const checkboxId = useId();
  return (
    <Card
      data-slot="review-item-card"
      data-excluded={excluded || undefined}
      className={cn("lift gap-3 py-4 hover:border-input", excluded && "opacity-60", className)}
    >
      <CardHeader className="gap-1.5 px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="figures text-xs text-fg-faint">{String(index).padStart(2, "0")}</span>
          <Icon className="size-4 text-primary" aria-hidden="true" />
          <span className="font-display text-lg leading-none font-semibold tracking-[0.02em] text-card-foreground uppercase">
            {label}
          </span>
          {reference !== undefined ? <Badge variant="outline">{reference}</Badge> : null}
          {status}
          {excludable ? (
            <span className="ml-auto flex items-center gap-2">
              <Checkbox
                id={checkboxId}
                checked={excluded}
                onCheckedChange={(checked) => onExcludedChange?.(checked === true)}
              />
              <Label htmlFor={checkboxId} className="cursor-pointer">
                Exclude
              </Label>
            </span>
          ) : null}
        </div>
        {summary ? <p className="font-sans text-sm text-card-foreground">{summary}</p> : null}
      </CardHeader>
      <CardContent className="space-y-3 px-4">
        {children}
        {resultId !== undefined ? (
          <p className="font-sans text-xs text-muted-foreground">
            Resulting record: <span className="figures text-card-foreground">{resultId}</span>
          </p>
        ) : null}
        {error !== undefined ? (
          <div className="space-y-1 rounded-md border border-negative/60 bg-negative-dim p-2">
            <p className="eyebrow text-negative">Why it failed</p>
            <p className="font-sans text-sm break-words text-negative">{error}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { ReviewItemCard };
export type { ReviewItemCardProps };
