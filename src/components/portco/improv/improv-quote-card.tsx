/**
 * ImprovQuoteCard
 *
 * Testimonial card matching Improv's refined consulting tone:
 * subtle border, soft surface, serif italic for the quote, clean
 * teal accent on the attribution.
 *
 * Props
 *   - quote:  the testimonial text
 *   - author: attribution name
 *   - role:   short title/org line under the author
 *
 * @example
 *   <ImprovQuoteCard
 *     quote="Improv brought clarity to a chaotic migration."
 *     author="Director of IT"
 *     role="Confidential Partner in Healthcare"
 *   />
 */
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImprovQuoteCardProps
  extends Omit<React.ComponentProps<typeof Card>, "role"> {
  quote: React.ReactNode;
  author: React.ReactNode;
  role?: React.ReactNode;
}

function ImprovQuoteCard({
  quote,
  author,
  role,
  className,
  ...props
}: ImprovQuoteCardProps) {
  return (
    <Card
      data-slot="improv-quote-card"
      className={cn(
        "border-[var(--color-improv-muted)] bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      <CardContent className="space-y-4 p-8">
        <blockquote className="font-display italic text-lg leading-relaxed text-[var(--color-improv-off-white)]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="space-y-0.5">
          <p className="font-sans text-sm font-semibold text-[var(--color-improv-teal)]">
            {author}
          </p>
          {role ? (
            <p className="font-sans text-xs text-[var(--color-improv-off-white)]/70">
              {role}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export { ImprovQuoteCard };
