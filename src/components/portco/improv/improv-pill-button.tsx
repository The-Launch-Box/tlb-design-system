/**
 * ImprovPillButton
 *
 * Thin wrapper on shadcn `Button` that forces the Improv site's
 * pill shape ("Contact Us", "Learn more"). Forwards every prop,
 * including `asChild` and `variant`, so callers can compose links
 * inside.
 *
 * @example
 *   <ImprovPillButton>Contact us</ImprovPillButton>
 *   <ImprovPillButton variant="outline" asChild>
 *     <a href="/solutions">Learn more</a>
 *   </ImprovPillButton>
 */
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImprovPillButtonProps = React.ComponentProps<typeof Button>;

function ImprovPillButton({ className, ...props }: ImprovPillButtonProps) {
  return (
    <Button
      data-slot="improv-pill-button"
      className={cn("rounded-full px-6", className)}
      {...props}
    />
  );
}

export { ImprovPillButton };
