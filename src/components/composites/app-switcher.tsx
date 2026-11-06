/**
 * AppSwitcher
 *
 * Compact tool navigation for a portal header: an "Apps" trigger that opens
 * a two-column grid of every tool, plus an "All apps" link back to the hub.
 * Scales to any catalog size (the grid scrolls internally past ~12 tools).
 * External tools open in a new tab and show an arrow.
 *
 * Router-agnostic: items carry an `href`. Pass `renderLink` to route
 * internal items through your router's Link.
 *
 * Source: tlb-financial-tools `apps/web/src/shared/components/AppSwitcher.tsx`,
 * decoupled from the portal's tool registry and auth context.
 *
 * @example
 *   <AppSwitcher
 *     items={[{ id: "cashflow", name: "Cashflow", icon: Wallet, href: "/tools/cashflow" }]}
 *     allAppsHref="/"
 *     renderLink={(href, children) => <Link to={href}>{children}</Link>}
 *   />
 */
import type { ReactNode } from "react";
import { ArrowUpRight, LayoutGrid, type LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AppSwitcherItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"`. */
  external?: boolean;
}

interface AppSwitcherProps {
  items: readonly AppSwitcherItem[];
  /** Footer link back to the hub. Omit to hide it. */
  allAppsHref?: string;
  /** Renders an internal link, e.g. react-router's Link. Defaults to `<a>`. */
  renderLink?: (href: string, children: ReactNode) => ReactNode;
  className?: string;
}

function defaultLink(href: string, children: ReactNode) {
  return <a href={href}>{children}</a>;
}

function AppSwitcher({
  items,
  allAppsHref,
  renderLink = defaultLink,
  className,
}: AppSwitcherProps) {
  if (items.length === 0) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open app switcher"
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-md border border-transparent px-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground outline-none transition-colors",
          "hover:bg-bg-raised hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "data-[state=open]:border-primary data-[state=open]:bg-accent-wash data-[state=open]:text-primary",
          className,
        )}
      >
        <LayoutGrid className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Apps</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 border-border bg-card p-1.5">
        <div className="grid max-h-96 grid-cols-2 gap-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <span className="grid size-7 flex-none place-items-center rounded-sm border border-border bg-bg-raised text-primary">
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-medium">{item.name}</span>
                {item.external ? (
                  <ArrowUpRight className="size-3 flex-none text-muted-foreground" aria-label="Opens in a new tab" />
                ) : null}
              </>
            );
            return (
              <DropdownMenuItem key={item.id} asChild className="cursor-pointer gap-2.5 p-2">
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  renderLink(item.href, inner)
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
        {allAppsHref ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="cursor-pointer justify-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              {renderLink(allAppsHref, "All apps")}
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AppSwitcher };
export type { AppSwitcherItem, AppSwitcherProps };
