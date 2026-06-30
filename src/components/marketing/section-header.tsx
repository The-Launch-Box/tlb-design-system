import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.ComponentProps<"div"> {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}

function SectionHeader({ eyebrow, heading, intro, align = "left", className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 max-w-2xl", align === "center" && "mx-auto text-center", className)} {...props}>
      {eyebrow ? <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl md:text-4xl">{heading}</h2>
      {intro ? <p className="mt-3 font-sans text-base text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export { SectionHeader };
