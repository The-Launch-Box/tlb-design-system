/**
 * ActorBadge
 *
 * Who did it, at a glance. Three actor kinds are visually distinct by icon,
 * text and color: a system component, an AI model, or a named human. A
 * human actor always carries the person's name: an audit trail exists to
 * answer "who approved this".
 *
 * Source: Echelon Automation Hub `web/src/components/feature/timeline/actor-badge.tsx`.
 *
 * @example
 *   <ActorBadge actor={{ kind: "human", displayName: "A. Rivera" }} />
 *   <ActorBadge actor={{ kind: "model", model: "claude-opus-5-5" }} />
 */
import { Bot, Cog, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Actor =
  | { kind: "system"; component: string }
  | { kind: "model"; model: string }
  | { kind: "human"; displayName: string };

interface ActorBadgeProps {
  actor: Actor;
  className?: string;
}

function ActorBadge({ actor, className }: ActorBadgeProps) {
  switch (actor.kind) {
    case "system":
      return (
        <Badge variant="outline" data-actor="system" className={cn("text-muted-foreground", className)}>
          <Cog aria-hidden="true" />
          System: {actor.component}
        </Badge>
      );
    case "model":
      return (
        <Badge variant="outline" data-actor="model" className={cn("border-info/50 text-info", className)}>
          <Bot aria-hidden="true" />
          Model: {actor.model}
        </Badge>
      );
    case "human":
      return (
        <Badge
          variant="outline"
          data-actor="human"
          className={cn("border-primary bg-primary text-primary-foreground", className)}
        >
          <UserRound aria-hidden="true" />
          {actor.displayName}
        </Badge>
      );
  }
}

export { ActorBadge };
export type { Actor, ActorBadgeProps };
