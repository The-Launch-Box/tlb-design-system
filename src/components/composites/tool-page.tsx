import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ToolPageProps {
  /** The tool's name, as the registry shows it. */
  title: ReactNode;
  /** One line under the title. Keep the tool's own wording. */
  description?: ReactNode;
  /** Right-hand slot in the header: buttons, a status line, a date stamp. */
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * The root of every tool page. Owns the vertical rhythm (`py-6`), so a tool
 * embedded in the portal clears the portal header without the standalone
 * `App.tsx` wrapper, which the portal never renders. See docs/ui-structure.md,
 * "Page layout".
 */
function ToolPage({ title, description, actions, children, className }: ToolPageProps) {
  return (
    <div data-slot="tool-page" className={cn("flex flex-col gap-5 py-6", className)}>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">{title}</h1>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}

export { ToolPage };
export type { ToolPageProps };
