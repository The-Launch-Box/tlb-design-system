/**
 * ImprovJourneyStep
 *
 * One step in Improv's IGNITE -> FORGE -> EVOLVE journey row.
 * Renders an icon, the phase word in teal uppercase, an italic
 * tagline, and a description on a subtly tinted blurred surface.
 *
 * Props
 *   - phase:       "Ignite" | "Forge" | "Evolve" | custom string
 *   - icon:        lucide icon component
 *   - tagline:     short italic phrase (e.g. "Spark Insight, Alignment & Momentum")
 *   - description: one to two sentences
 *
 * @example
 *   <ImprovJourneyStep
 *     phase="Ignite"
 *     icon={Sparkles}
 *     tagline="Spark Insight, Alignment & Momentum"
 *     description="Ignite momentum by uncovering challenges and aligning on opportunities."
 *   />
 */
import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImprovJourneyStepProps extends React.ComponentProps<"div"> {
  phase: string;
  icon: LucideIcon;
  tagline?: React.ReactNode;
  description: React.ReactNode;
}

function ImprovJourneyStep({
  phase,
  icon: Icon,
  tagline,
  description,
  className,
  ...props
}: ImprovJourneyStepProps) {
  return (
    <div
      data-slot="improv-journey-step"
      className={cn(
        "flex flex-col gap-3 rounded-sm border border-[var(--color-improv-muted)] bg-[var(--color-improv-teal-soft)] p-6 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <div className="inline-flex size-12 items-center justify-center rounded-sm bg-[var(--color-improv-teal)] text-[var(--color-improv-navy)]">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="font-sans text-lg font-semibold uppercase tracking-[0.25em] text-[var(--color-improv-teal)]">
        {phase}
      </h3>
      {tagline ? (
        <p className="font-display italic text-sm text-[var(--color-improv-off-white)]/90">
          {tagline}
        </p>
      ) : null}
      <p className="font-sans text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export { ImprovJourneyStep };
