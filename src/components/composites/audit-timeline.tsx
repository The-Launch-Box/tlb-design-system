/**
 * AuditTimeline
 *
 * An append-only history, oldest first: one entry per event with a title,
 * who did it (ActorBadge), when, an optional body, and the raw payload behind
 * a disclosure. Strictly read only: a correction is always a new event.
 *
 * Source: Echelon Automation Hub `web/src/components/feature/timeline/timeline.tsx`,
 * generalized from Echelon's AuditEvent type. Map your own event type to
 * `AuditTimelineEvent` (title from your label table, body for diffs or notes).
 *
 * @example
 *   <AuditTimeline
 *     events={events.map((e) => ({
 *       id: e.id,
 *       title: EVENT_LABEL[e.type],
 *       actor: e.actor,
 *       timestamp: e.timestamp,
 *       payload: e.payload,
 *     }))}
 *   />
 */
import type { ReactNode } from "react";
import { format } from "date-fns";

import { ActorBadge, type Actor } from "@/components/composites/actor-badge";
import { RawJson } from "@/components/composites/payload-list";
import { cn } from "@/lib/utils";

interface AuditTimelineEvent {
  id: string;
  title: ReactNode;
  actor?: Actor;
  /** ISO 8601 timestamp. */
  timestamp: string;
  /** Notes, a FieldDiff, anything that explains the event. */
  body?: ReactNode;
  /** Shown raw behind "View payload" when defined. */
  payload?: unknown;
}

function AuditTimelineEntry({ event }: { event: AuditTimelineEvent }) {
  return (
    <li className="relative border-l border-border pb-7 pl-6 last:pb-0">
      <span
        className="absolute top-1.5 -left-[5px] size-[9px] bg-primary ring-4 ring-primary/15"
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-lg leading-none font-semibold tracking-[0.02em] text-card-foreground uppercase">
          {event.title}
        </span>
        {event.actor ? <ActorBadge actor={event.actor} /> : null}
        <time dateTime={event.timestamp} className="figures text-xs text-fg-faint">
          {format(new Date(event.timestamp), "PPpp")}
        </time>
      </div>
      {event.body ? <div className="mt-1.5 space-y-1.5">{event.body}</div> : null}
      {event.payload !== undefined ? (
        <RawJson value={event.payload} label="View payload" className="mt-1.5" />
      ) : null}
    </li>
  );
}

interface AuditTimelineProps {
  events: readonly AuditTimelineEvent[];
  /** Line above the list. Defaults to the event count. Pass null to hide. */
  caption?: ReactNode | null;
  className?: string;
}

function AuditTimeline({ events, caption, className }: AuditTimelineProps) {
  const defaultCaption = `Append-only audit log, oldest first. ${events.length} ${
    events.length === 1 ? "event" : "events"
  }.`;
  return (
    <div data-slot="audit-timeline" className={className}>
      {caption !== null ? (
        <p className={cn("figures mb-6 text-xs text-fg-faint")}>{caption ?? defaultCaption}</p>
      ) : null}
      <ol className="ml-1.5">
        {events.map((event) => (
          <AuditTimelineEntry key={event.id} event={event} />
        ))}
      </ol>
    </div>
  );
}

export { AuditTimeline };
export type { AuditTimelineEvent, AuditTimelineProps };
