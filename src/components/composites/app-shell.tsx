/**
 * AppShell
 *
 * The TLB portal frame: a sticky 56px header tinted toward the active firm
 * (`bg-bg-header`), the TLB arrow and the "ACCELERATED BY THE LAUNCH BOX"
 * wordmark on the left, an optional section label, a right-hand slot for
 * controls (app switcher, theme toggle, firm and department pickers, account
 * menu), then a centred 1280px main column and a footer line.
 *
 * Source: tlb-financial-tools `apps/web/src/shared/components/AppShell.tsx`,
 * with the auth, workspace and telemetry hooks lifted out into props. The
 * classes are the portal's; keep them in step. The portal also mounts the
 * firm theme here: call `applyFirmTheme(firm, isDark)` from
 * `@/lib/firm-themes` in an effect on firm or theme change.
 *
 * @example
 *   <AppShell
 *     sectionLabel="Cashflow"
 *     actions={<><AppSwitcher items={tools} allAppsHref="/" /><ThemeToggle /></>}
 *     footer="We record which tools you open, never what you type or see."
 *   >
 *     <ToolPage title="Cashflow">...</ToolPage>
 *   </AppShell>
 */
import type { ReactNode } from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  /** Left-hand brand link content. Defaults to the TLB arrow and wordmark. */
  brand?: ReactNode;
  /** Wraps the brand, e.g. `(b) => <Link to="/">{b}</Link>`. Defaults to `<a href="/">`. */
  renderHomeLink?: (brand: ReactNode) => ReactNode;
  /** The current tool or page name, shown after a hairline from `md` up. */
  sectionLabel?: string;
  /** Right-hand header controls, in order. */
  actions?: ReactNode;
  /** Run the main area full width (the portal dashboard does, for its sidebar). */
  fullWidth?: boolean;
  /** One muted line under a hairline at the foot of every page. */
  footer?: ReactNode;
  className?: string;
}

/** The portal's brand lockup. The arrow ships at `public/brand/tlb/tlb-arrow.png`. */
function TlbWordmark({ arrowSrc = `${import.meta.env.BASE_URL}brand/tlb/tlb-arrow.png` }: { arrowSrc?: string }) {
  return (
    <>
      <img src={arrowSrc} alt="The Launch Box" className="block size-[22px] flex-none" />
      <span className="truncate font-brand text-xl font-bold italic leading-none tracking-[0.03em] text-foreground">
        ACCELERATED BY THE LAUNCH BOX
      </span>
    </>
  );
}

function defaultHomeLink(brand: ReactNode) {
  return (
    <a href="/" className="flex min-w-0 items-center gap-3">
      {brand}
    </a>
  );
}

function AppShell({
  children,
  brand,
  renderHomeLink = defaultHomeLink,
  sectionLabel,
  actions,
  fullWidth = false,
  footer,
  className,
}: AppShellProps) {
  return (
    <div data-slot="app-shell" className={cn("min-h-screen bg-bg-canvas font-sans text-foreground", className)}>
      <header className="sticky top-0 z-10 border-b border-border bg-bg-header/90 backdrop-blur-[10px]">
        <div className="flex h-14 w-full items-center gap-4 px-6 lg:px-3">
          {renderHomeLink(brand ?? <TlbWordmark />)}

          {sectionLabel ? (
            <span className="hidden min-w-0 items-center gap-3 md:flex">
              <span className="h-4 w-px flex-none bg-border" aria-hidden="true" />
              <span className="truncate font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {sectionLabel}
              </span>
            </span>
          ) : null}

          {actions ? <div className="ml-auto flex flex-none items-center gap-2.5">{actions}</div> : null}
        </div>
      </header>

      <main className={cn("mx-auto w-full px-6", fullWidth ? "lg:pl-3 lg:pr-8" : "max-w-[1280px] lg:px-8")}>
        {children}
      </main>

      {footer ? (
        <footer className="mx-auto w-full max-w-[1280px] px-6 pb-8 pt-10 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
            <Info className="size-3.5 flex-none" aria-hidden="true" />
            <span>{footer}</span>
          </div>
        </footer>
      ) : null}
    </div>
  );
}

export { AppShell, TlbWordmark };
export type { AppShellProps };
