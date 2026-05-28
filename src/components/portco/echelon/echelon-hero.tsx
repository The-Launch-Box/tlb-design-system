/**
 * EchelonHero
 *
 * Two-column hero matching the echeloncyber.com home pattern:
 * an oversized headline on the left with an optional yellow marker
 * highlight on the second clause, supporting copy on the right.
 *
 * Props
 *   - eyebrow:   optional small uppercase tag above the headline
 *   - headline:  required main title text (string or node)
 *   - highlight: optional clause rendered inside <EchelonMarker>,
 *                appended to the headline with a leading space
 *   - body:      supporting paragraph node on the right column
 *   - actions:   optional CTA slot (Button, link)
 *
 * @example
 *   <EchelonHero
 *     headline="Security and privacy are basic human rights."
 *     highlight="We are built to protect them."
 *     body={<p>The threats we face are constantly evolving...</p>}
 *     actions={<Button>Start the conversation</Button>}
 *   />
 */
import * as React from "react";

import { cn } from "@/lib/utils";
import { EchelonMarker } from "./echelon-marker";

interface EchelonHeroProps extends React.ComponentProps<"section"> {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  highlight?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
}

function EchelonHero({
  eyebrow,
  headline,
  highlight,
  body,
  actions,
  className,
  ...props
}: EchelonHeroProps) {
  return (
    <section
      data-slot="echelon-hero"
      className={cn(
        "bg-background text-foreground px-6 py-16 md:px-12 md:py-24 lg:px-20",
        className,
      )}
      {...props}
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          {eyebrow ? (
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-echelon-yellow)]/80 mb-6">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
            {headline}
            {highlight ? (
              <>
                {" "}
                <EchelonMarker>{highlight}</EchelonMarker>
              </>
            ) : null}
          </h1>
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
        {body ? (
          <div className="font-sans text-base leading-relaxed text-[var(--color-echelon-off-white)] md:text-lg">
            {body}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export { EchelonHero };
