/**
 * FilterBar
 *
 * A compact period picker (segmented buttons) with an optional second
 * dimension (a labelled select, e.g. resource or owner). For report tools
 * that slice one dataset by period.
 *
 * Source: tlb-financial-tools `packages/ui/src/composites/filter-bar.tsx`.
 * Changes on the way in: the select is the shadcn Select with a real label
 * (the original was an unlabelled native select), the period group is a
 * labelled `role="group"`, and the active period sets `aria-pressed`.
 *
 * @example
 *   <FilterBar
 *     periods={["MTD", "QTD", "YTD"]}
 *     selectedPeriod={period}
 *     onPeriodChange={setPeriod}
 *     options={["All", "A. Rivera", "J. Chen"]}
 *     selectedOption={owner}
 *     onOptionChange={setOwner}
 *     optionLabel="Resource"
 *   />
 */
import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  periods: readonly string[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  /** Label for the period group. Defaults to "Period". */
  periodLabel?: string;
  /** Optional second filter, rendered as a labelled select. */
  options?: readonly string[];
  selectedOption?: string;
  onOptionChange?: (option: string) => void;
  /** Label for the second filter. Defaults to "Resource". */
  optionLabel?: string;
  className?: string;
}

function FilterBar({
  periods,
  selectedPeriod,
  onPeriodChange,
  periodLabel = "Period",
  options,
  selectedOption,
  onOptionChange,
  optionLabel = "Resource",
  className,
}: FilterBarProps) {
  const periodLabelId = useId();
  const optionLabelId = useId();
  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-wrap items-center gap-2.5", className)}
    >
      <span id={periodLabelId} className="eyebrow">
        {periodLabel}
      </span>
      <div role="group" aria-labelledby={periodLabelId} className="flex flex-wrap gap-1">
        {periods.map((p) => {
          const active = selectedPeriod === p;
          return (
            <Button
              key={p}
              type="button"
              variant={active ? "default" : "outline"}
              size="xs"
              aria-pressed={active}
              onClick={() => onPeriodChange(p)}
              className="font-mono whitespace-nowrap"
            >
              {p}
            </Button>
          );
        })}
      </div>
      {options && onOptionChange ? (
        <>
          <span id={optionLabelId} className="eyebrow ml-2">
            {optionLabel}
          </span>
          <Select value={selectedOption} onValueChange={onOptionChange}>
            <SelectTrigger
              size="sm"
              aria-labelledby={optionLabelId}
              className="min-w-40 font-mono text-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : null}
    </div>
  );
}

export { FilterBar };
export type { FilterBarProps };
