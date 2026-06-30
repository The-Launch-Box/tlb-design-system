import * as React from "react";
import { cn } from "@/lib/utils";

interface QuoteCardProps extends Omit<React.ComponentProps<"figure">, "role"> {
  quote: React.ReactNode;
  author: React.ReactNode;
  role: React.ReactNode;
}

function QuoteCard({ quote, author, role, className, ...props }: QuoteCardProps) {
  return (
    <figure className={cn("rounded-lg border border-border bg-card p-6", className)} {...props}>
      <blockquote className="font-sans text-lg leading-relaxed text-card-foreground">"{quote}"</blockquote>
      <figcaption className="mt-4">
        <span className="block font-display text-sm uppercase tracking-wide text-primary">{author}</span>
        <span className="block font-sans text-xs text-muted-foreground">{role}</span>
      </figcaption>
    </figure>
  );
}

export { QuoteCard };
