/**
 * EchelonProcessStep
 *
 * Numbered process step tile for the "How We Work" four-up grid
 * (Assess / Strategize / Implement / Level Up). Renders a yellow
 * icon badge, a bold uppercase title, and a short description on
 * an Echelon dark surface.
 *
 * Props
 *   - step:        numeric position (1-based), shown as a small label
 *   - icon:        lucide icon component
 *   - title:       step name, rendered uppercase
 *   - description: one to two sentences
 *
 * @example
 *   <EchelonProcessStep
 *     step={1}
 *     icon={Search}
 *     title="Assess"
 *     description="Custom risk assessments tailored to your needs."
 *   />
 */
import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EchelonProcessStepProps extends React.ComponentProps<"div"> {
  step: number;
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
}

function EchelonProcessStep({
  step,
  icon: Icon,
  title,
  description,
  className,
  ...props
}: EchelonProcessStepProps) {
  return (
    <div
      data-slot="echelon-process-step"
      className={cn(
        "flex flex-col gap-4 border-l-2 border-[var(--color-echelon-yellow)] bg-card text-card-foreground p-6",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className="inline-flex size-10 items-center justify-center bg-[var(--color-echelon-yellow)] text-[var(--color-echelon-blue)]"
        >
          <Icon className="size-5" />
        </span>
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-echelon-yellow)]">
          Step {step.toString().padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-[var(--color-echelon-yellow)]">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export { EchelonProcessStep };
