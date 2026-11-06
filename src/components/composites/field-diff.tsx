/**
 * FieldDiff
 *
 * The field-level before and after of any two values, one line per changed
 * path (`company.name`, `lines[2].qty`). Removed values are struck through
 * and the word "(removed)" carries the meaning, so color is never the only
 * signal. `fieldChanges()` is exported for tests and summaries.
 *
 * Source: Echelon Automation Hub `web/src/components/feature/revision/revision-diff.tsx`,
 * generalized from the `proposal.revised` audit event to any before/after pair.
 *
 * @example
 *   <FieldDiff before={previous} after={current} />
 */
import { cn } from "@/lib/utils";

interface FieldChange {
  path: string;
  before?: string;
  after?: string;
}

/** Flattens a value into "path: value" entries without knowing its shape. */
function flatten(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  const visit = (node: unknown, path: string): void => {
    if (Array.isArray(node)) {
      node.forEach((item: unknown, index) => visit(item, `${path}[${index}]`));
    } else if (typeof node === "object" && node !== null) {
      for (const [key, child] of Object.entries(node)) {
        visit(child, path ? `${path}.${key}` : key);
      }
    } else if (node !== undefined) {
      out[path] = String(node);
    }
  };
  visit(value, "");
  return out;
}

function fieldChanges(before: unknown, after: unknown): FieldChange[] {
  const a = flatten(before);
  const b = flatten(after);
  const paths = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...paths]
    .filter((path) => a[path] !== b[path])
    .sort()
    .map((path) => ({ path, before: a[path], after: b[path] }));
}

interface FieldDiffProps {
  before: unknown;
  after: unknown;
  /** Shown when nothing changed. */
  emptyLabel?: string;
  className?: string;
}

function FieldDiff({ before, after, emptyLabel = "No field changed.", className }: FieldDiffProps) {
  const changes = fieldChanges(before, after);
  if (changes.length === 0) {
    return <p className={cn("font-sans text-sm text-muted-foreground", className)}>{emptyLabel}</p>;
  }
  return (
    <ul data-slot="field-diff" className={cn("space-y-1 font-mono text-xs", className)} aria-label="Field changes">
      {changes.map((change) => (
        <li key={change.path}>
          <span className="text-muted-foreground">{change.path}: </span>
          {change.before !== undefined ? (
            <del className="text-negative">{change.before}</del>
          ) : null}{" "}
          {change.after !== undefined ? (
            <ins className="text-card-foreground no-underline">{change.after}</ins>
          ) : (
            <span className="text-muted-foreground">(removed)</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export { FieldDiff, fieldChanges };
export type { FieldChange, FieldDiffProps };
