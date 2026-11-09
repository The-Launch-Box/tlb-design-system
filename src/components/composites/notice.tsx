import type { ReactNode } from "react";
import { FlaskConical, Info, Loader2, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";

interface NoticeProps {
  /** `error` announces itself (`role="alert"`); `sample` marks placeholder data. */
  tone: "info" | "error" | "sample";
  children: ReactNode;
  /** A button on the right, e.g. Retry. */
  action?: ReactNode;
  className?: string;
}

/**
 * The one inline message for tool pages: a muted band with an icon, the text,
 * and an optional action. The icon changes with the tone so the meaning never
 * rides on colour alone.
 */
function Notice({ tone, children, action, className }: NoticeProps) {
  const Icon = tone === "error" ? ShieldAlert : tone === "sample" ? FlaskConical : Info;
  return (
    <div
      data-slot="notice"
      data-tone={tone}
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "flex items-start gap-2 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground",
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="flex-1">{children}</div>
      {action}
    </div>
  );
}

interface LoadingStateProps {
  /** What is loading, e.g. "Loading firms...". */
  label: string;
  className?: string;
}

/** A spinner and a line of text, announced politely as a status. */
function LoadingState({ label, className }: LoadingStateProps) {
  return (
    <p
      data-slot="loading-state"
      role="status"
      className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
    >
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      {label}
    </p>
  );
}

export { Notice, LoadingState };
export type { NoticeProps, LoadingStateProps };
