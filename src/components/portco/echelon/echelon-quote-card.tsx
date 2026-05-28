/**
 * EchelonQuoteCard
 *
 * Testimonial card matching the Echelon carousel pattern: deep
 * blue surface, off-white body copy, yellow attribution name,
 * white role line.
 *
 * Props
 *   - quote:  the testimonial text
 *   - author: attribution name (rendered yellow)
 *   - role:   short title/org line under the author
 *
 * @example
 *   <EchelonQuoteCard
 *     quote="Echelon felt like an extension of our team."
 *     author="Chuck Hagen"
 *     role="Chief Risk Officer, ESSA Bank & Trust"
 *   />
 */
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EchelonQuoteCardProps
  extends Omit<React.ComponentProps<typeof Card>, "role"> {
  quote: React.ReactNode;
  author: React.ReactNode;
  role?: React.ReactNode;
}

function EchelonQuoteCard({
  quote,
  author,
  role,
  className,
  ...props
}: EchelonQuoteCardProps) {
  return (
    <Card
      data-slot="echelon-quote-card"
      className={cn(
        "border-[var(--color-echelon-blue-light)] bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      <CardContent className="space-y-5 p-8">
        <p
          aria-hidden="true"
          className="font-display text-4xl leading-none text-[var(--color-echelon-yellow)]"
        >
          &ldquo;
        </p>
        <blockquote className="font-sans text-base leading-relaxed">
          {quote}
        </blockquote>
        <div className="space-y-0.5">
          <p className="font-sans text-sm font-semibold text-[var(--color-echelon-yellow)]">
            {author}
          </p>
          {role ? (
            <p className="font-sans text-xs text-[var(--color-echelon-off-white)]/80">
              {role}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export { EchelonQuoteCard };
