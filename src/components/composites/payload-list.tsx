/**
 * PayloadList and RawJson
 *
 * Readable presentation for a record the UI only knows as `unknown` (an
 * automation payload, a webhook body, an API response). Primitive fields
 * render as a definition list; anything nested stays inspectable behind a
 * native disclosure, which is keyboard reachable by default.
 *
 * Source: Echelon Automation Hub `web/src/components/feature/operations/payload-list.tsx`,
 * with the Echelon-specific resolution filter replaced by a generic `exclude`.
 *
 * @example
 *   <PayloadList payload={operation.payload} omit={["dealId"]} />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPrimitive(value: unknown): value is string | number | boolean {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

interface RawJsonProps {
  value: unknown;
  /** Disclosure label. Defaults to "View JSON". */
  label?: string;
  className?: string;
}

function RawJson({ value, label = "View JSON", className }: RawJsonProps) {
  return (
    <details data-slot="raw-json" className={cn("group", className)}>
      <summary className="eyebrow cursor-pointer transition-colors hover:text-foreground">{label}</summary>
      <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-bg-sunken p-3 font-mono text-xs leading-relaxed text-muted-foreground">
        {JSON.stringify(value, null, 2)}
      </pre>
    </details>
  );
}

function ValueCell({ value }: { value: unknown }) {
  if (value === null) return <span className="text-muted-foreground">null</span>;
  if (typeof value === "boolean" || typeof value === "number") {
    return <span className="font-mono">{String(value)}</span>;
  }
  if (typeof value === "string") {
    return value === "" ? (
      <span className="text-muted-foreground">empty</span>
    ) : (
      <span className="break-words">{value}</span>
    );
  }
  if (Array.isArray(value) && value.every(isPrimitive)) {
    return <span className="break-words">{value.map(String).join(", ")}</span>;
  }
  return <RawJson value={value} />;
}

interface PayloadListProps {
  payload: unknown;
  /** Keys the caller already presented prominently. */
  omit?: readonly string[];
  /** Drop entries by value, e.g. shapes another component renders. */
  exclude?: (value: unknown, key: string) => boolean;
  className?: string;
}

function PayloadList({ payload, omit = [], exclude, className }: PayloadListProps) {
  if (!isRecord(payload)) {
    if (payload === undefined || payload === null) return null;
    return <RawJson value={payload} />;
  }
  const entries = Object.entries(payload).filter(
    ([key, value]) => !omit.includes(key) && value !== undefined && !(exclude?.(value, key) ?? false),
  );
  if (entries.length === 0) return null;
  return (
    <dl
      data-slot="payload-list"
      className={cn("grid gap-x-6 gap-y-1 sm:grid-cols-[minmax(8rem,auto)_1fr]", className)}
    >
      {entries.map(([key, value]) => (
        <React.Fragment key={key}>
          <dt className="font-mono text-xs leading-6 text-muted-foreground">{key}</dt>
          <dd className="min-w-0 font-sans text-sm leading-6 text-card-foreground">
            <ValueCell value={value} />
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export { PayloadList, RawJson };
export type { PayloadListProps, RawJsonProps };
