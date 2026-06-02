/**
 * LiveSync
 *
 * Pulsing-dot status chip for "Live, synced N min ago" indicators. Three
 * states cover the common cases: ok (green dot, default), stale (amber),
 * down (red). Always pair the dot with a label so meaning carries beyond
 * color alone.
 *
 * Drop one of these into a topbar, a panel header, or anywhere a screen
 * needs to telegraph that its data is fresh.
 *
 * @example
 *   <LiveSync>Live · synced 2m ago</LiveSync>
 *   <LiveSync state="stale">Last sync 14m ago</LiveSync>
 *   <LiveSync state="down">Sync paused</LiveSync>
 */
import * as React from "react";

import { cn } from "@/lib/utils";

type LiveSyncState = "ok" | "stale" | "down";

interface LiveSyncProps {
  state?: LiveSyncState;
  children: React.ReactNode;
  className?: string;
}

const DOT_CLASSES: Record<LiveSyncState, string> = {
  ok: "bg-positive shadow-[0_0_0_3px_rgba(74,222,128,0.15)]",
  stale: "bg-warning shadow-[0_0_0_3px_rgba(251,191,36,0.15)]",
  down: "bg-negative shadow-[0_0_0_3px_rgba(248,113,113,0.15)]",
};

function LiveSync({ state = "ok", children, className }: LiveSyncProps) {
  return (
    <span
      data-slot="live-sync"
      data-state={state}
      className={cn(
        "inline-flex items-center gap-2 text-xs text-muted-foreground",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-[7px] rounded-full", DOT_CLASSES[state])}
      />
      {children}
    </span>
  );
}

export { LiveSync };
export type { LiveSyncProps, LiveSyncState };
