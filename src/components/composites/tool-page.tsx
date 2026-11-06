/**
 * ToolPage
 *
 * The root of every tool page hosted in the TLB portal. Owns the vertical
 * rhythm (`py-6`) and the header row: display title, one-line description,
 * and a right-hand actions slot. A tool embedded in the portal clears the
 * portal header without needing its own standalone wrapper.
 *
 * Use PageHeader for full apps with breadcrumbs; use ToolPage for a tool
 * rendered inside a host shell.
 *
 * Source: tlb-financial-tools `packages/ui/src/tool/tool-page.tsx`.
 *
 * @example
 *   <ToolPage title="Cashflow" description="13-week view by entity" actions={<Button>Export</Button>}>
 *     ...
 *   </ToolPage>
 */
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ToolPageProps {
  /** The tool's name, as the tool registry shows it. */
  title: ReactNode;
  /** One line under the title. Keep the tool's own wording. */
  description?: ReactNode;
  /** Right-hand slot in the header: buttons, a status line, a date stamp. */
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

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
