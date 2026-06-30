import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const heroVariants = cva("bg-background text-foreground px-6 py-16 md:px-12 md:py-24 lg:px-20", {
  variants: { align: { split: "", center: "text-center" } },
  defaultVariants: { align: "split" },
});

interface HeroProps extends React.ComponentProps<"section">, VariantProps<typeof heroVariants> {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  highlight?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  highlightTone?: "mark" | "accent";
}

function Hero({
  eyebrow, headline, highlight, body, actions, align = "split", highlightTone = "accent", className, ...props
}: HeroProps) {
  const highlightNode = highlight ? (
    <span className={cn(highlightTone === "accent" ? "text-accent" : "bg-primary text-primary-foreground px-1")}>
      {highlight}
    </span>
  ) : null;
  return (
    <section data-slot="hero" className={cn(heroVariants({ align }), className)} {...props}>
      <div className={cn("grid gap-10", align === "split" ? "md:grid-cols-2 md:gap-16" : "mx-auto max-w-3xl")}>
        <div>
          {eyebrow ? (
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary mb-6">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-4xl leading-[1.05] md:text-5xl xl:text-6xl">
            {headline}
            {highlightNode ? <>{" "}{highlightNode}</> : null}
          </h1>
          {actions ? <div className={cn("mt-8 flex flex-wrap gap-3", align === "center" && "justify-center")}>{actions}</div> : null}
        </div>
        {body && align === "split" ? (
          <div className="font-sans text-base leading-relaxed text-card-foreground md:text-lg">{body}</div>
        ) : null}
        {body && align === "center" ? (
          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-card-foreground md:text-lg">{body}</p>
        ) : null}
      </div>
    </section>
  );
}

export { Hero };
