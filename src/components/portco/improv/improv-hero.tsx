/**
 * ImprovHero
 *
 * Hero matching the improvizations.com home pattern: a serif
 * headline that aspirational tagline ("Elevating Possibilities.
 * Inspiring Results.") sets, a clean grotesk supporting paragraph,
 * and an optional CTA row. Centered or left-aligned via `align`.
 *
 * Props
 *   - eyebrow:  optional small uppercase tag above the headline
 *   - headline: the serif display headline
 *   - body:     supporting paragraph (string or node)
 *   - actions:  optional CTA slot
 *   - align:    "left" (default) | "center"
 *
 * @example
 *   <ImprovHero
 *     headline="Elevating Possibilities. Inspiring Results."
 *     body="Simplifying WFM/HCM transformation to evolve with clarity."
 *     actions={<ImprovPillButton>Contact us</ImprovPillButton>}
 *   />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface ImprovHeroProps extends React.ComponentProps<"section"> {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  align?: "left" | "center";
}

function ImprovHero({
  eyebrow,
  headline,
  body,
  actions,
  align = "left",
  className,
  ...props
}: ImprovHeroProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <section
      data-slot="improv-hero"
      className={cn(
        "relative bg-background text-foreground px-6 py-20 md:px-12 md:py-28 lg:px-20",
        className,
      )}
      {...props}
    >
      {/* Soft radial accent. Tokens via inline CSS var, no hex. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, var(--color-improv-teal-soft), transparent 60%)",
        }}
      />
      <div className={cn("relative mx-auto flex max-w-4xl flex-col gap-6", alignment)}>
        {eyebrow ? (
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-improv-teal)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl leading-[1.15] md:text-5xl xl:text-6xl">
          {headline}
        </h1>
        {body ? (
          <p className="font-sans max-w-3xl text-base leading-relaxed text-[var(--color-improv-off-white)]/85 md:text-lg">
            {body}
          </p>
        ) : null}
        {actions ? (
          <div className={cn("mt-4 flex flex-wrap gap-3", align === "center" && "justify-center")}>
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export { ImprovHero };
