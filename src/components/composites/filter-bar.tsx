import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  periods: string[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  users?: string[];
  selectedUser?: string;
  onUserChange?: (user: string) => void;
}

export function FilterBar({
  periods,
  selectedPeriod,
  onPeriodChange,
  users,
  selectedUser,
  onUserChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-2.5 flex-wrap items-center mb-5">
      <span className="text-[10px] text-muted-foreground tracking-widest">PERIOD</span>
      <div className="flex gap-1 flex-wrap">
        {periods.map((p) => (
          <Button
            key={p}
            variant={selectedPeriod === p ? "default" : "outline"}
            size="xs"
            onClick={() => onPeriodChange(p)}
            className={cn(
              "font-mono text-[11px] whitespace-nowrap",
              selectedPeriod === p
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                : "bg-muted text-muted-foreground border-border hover:bg-muted",
            )}
          >
            {p}
          </Button>
        ))}
      </div>
      {users && onUserChange && (
        <>
          <span className="text-[10px] text-muted-foreground tracking-widest ml-2">RESOURCE</span>
          <select
            className="bg-muted border border-border rounded-sm text-foreground px-2.5 py-1 font-mono text-[11px] cursor-pointer"
            value={selectedUser}
            onChange={(e) => onUserChange(e.target.value)}
          >
            {users.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
