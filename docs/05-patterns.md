# UI Patterns

The standard ways TLB internal apps lay out screens, handle forms, render tables, and surface feedback. Follow these patterns rather than reinventing them per feature.

## Page Layout

Every screen sits inside `AppShell`. The shell provides the sidebar, top bar, and content area. Inside the shell, every page follows this skeleton:

```tsx
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors"
        subtitle="Approved suppliers and their payment terms."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add vendor
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Active vendors</CardTitle>
        </CardHeader>
        <CardContent>
          {/* DataTable goes here */}
        </CardContent>
      </Card>
    </div>
  );
}
```

Rules:
- `PageHeader` is always present at the top of every page.
- The primary action sits in the header's `actions` slot, not floating inside the page body.
- Content blocks are `Card`s. Avoid bare `<div>` containers with custom shadows or borders.
- Vertical rhythm uses `space-y-6` between top-level blocks.

## Forms

The form pattern is non-negotiable: `react-hook-form` plus `zod` resolver plus shadcn `Form` primitives. Schemas live in `src/schemas/`.

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const vendorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  taxId: z.string().regex(/^\d{2}-\d{7}$/, "Enter a valid EIN."),
});

type VendorInput = z.infer<typeof vendorSchema>;

export function VendorForm({ onSubmit }: { onSubmit: (v: VendorInput) => Promise<void> }) {
  const form = useForm<VendorInput>({
    resolver: zodResolver(vendorSchema),
    defaultValues: { name: "", taxId: "" },
  });

  const submitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Industries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EIN</FormLabel>
              <FormControl>
                <Input placeholder="12-3456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save vendor
        </Button>
      </form>
    </Form>
  );
}
```

Rules:
- One zod schema per resource. Import the schema in both the form and the API mapping code.
- Field-level errors render under each input via `FormMessage`. Never alert-box for validation errors.
- Submit buttons show a spinning `Loader2` icon while the request is in flight. The button stays disabled, the form stays mounted.
- Server errors raise a `toast.error()` via Sonner.

## Tables

Tables use `@tanstack/react-table` headless plus the shadcn `Table` primitives plus the `DataTable` composite. Default to the composite.

```tsx
import { DataTable } from "@/components/data/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

type Vendor = { id: string; name: string; status: "active" | "paused"; spend: number };

const columns: ColumnDef<Vendor>[] = [
  { accessorKey: "name", header: "Vendor" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "spend",
    header: "YTD spend",
    cell: ({ getValue }) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        getValue<number>()
      ),
  },
];

export function VendorsTable({ data }: { data: Vendor[] }) {
  return <DataTable columns={columns} data={data} pageSize={25} />;
}
```

Rules:
- Pagination is always on. Default page size 25.
- Currency renders through `Intl.NumberFormat`. Never hand-formatted with `$` plus `toFixed`.
- Dates render through `Intl.DateTimeFormat` or `date-fns/format`.
- Status columns render through `Badge` with a stable mapping of value to variant. Map lives next to the columns array.
- Empty data triggers `EmptyState`, not a blank table. The composite handles this automatically.

## Dialogs

Modals are `Dialog` for non-destructive actions and `AlertDialog` for destructive ones. There is no third option.

```tsx
// Destructive
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete vendor</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete vendor?</AlertDialogTitle>
      <AlertDialogDescription>
        This removes the vendor and unlinks open purchase requests.
        It cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Rules:
- The destructive button uses imperative wording: "Delete", "Remove", "Archive". Not "Yes" or "Confirm".
- The cancel button is "Cancel". Not "No" or "Nevermind".
- The description explains what will happen and whether it is reversible.

## Toasts

Use Sonner. Mounted once at the app root. Triggered imperatively:

```ts
import { toast } from "sonner";

toast.success("Vendor saved.");
toast.error("Could not save vendor. Try again.");
```

Rules:
- One toast per user action. No stacked logs.
- Success toasts are short and confirmatory. Failure toasts state what failed and what to try.
- Never use a toast where inline validation would be more appropriate.

## Loading States

| Surface | Loading treatment |
|---|---|
| Initial page load | `Skeleton` blocks matching the eventual layout. |
| Table refetch | Skeleton table rows inside the existing table. |
| Button-scoped (form submit, row action) | `Loader2` icon with `animate-spin`, button disabled. |
| Background process | `Progress` for determinate. Sonner for completion. |
| Full-page transition | Avoid. Render the next page's skeleton instead. |

Never use a full-screen spinner. It blocks interaction and erases context.

## Empty States

`EmptyState` from `src/components/data/empty-state.tsx`. Three parts:

1. An icon from lucide-react relevant to the missing thing.
2. A single sentence in sentence case: what is missing, why it might be missing.
3. A primary action button that fixes it.

Example: vendors page with no vendors yet.

> Icon: `Briefcase`  
> Message: "No vendors added yet."  
> Action: "Add your first vendor"

## Error States

Errors fall into three categories. Handle each in its own pattern:

- **Validation error (client).** Inline under the field. `FormMessage`.
- **Operation error (server).** Sonner toast plus inline retry where possible.
- **Page-level error (failed fetch).** A `Card` with `AlertTriangle` icon, error sentence, and a "Try again" button. Use the `ErrorState` composite if available.

Never log error details into UI copy. The user sees a one-sentence explanation. Stack traces go to the console and to Application Insights.

## Permissions

Wrap protected UI in `<Permission requires="role:finance">`. The composite hides children if the MSAL user lacks the role. Never branch on roles with inline ternaries scattered across the JSX. One wrapping component per protected element.

## Navigation

- Primary nav lives in the `Sidebar`. Up to 8 top-level items.
- Sub-navigation inside a page uses `Tabs`. Three to six tabs max.
- Breadcrumbs only when depth is 3 or more. Use the `Breadcrumb` composite if needed.
- Never use both Tabs and an in-page Sidebar on the same screen.

## Keyboard Shortcuts

If a screen exposes shortcuts, register them through a single `useShortcuts` hook in `src/hooks/`. Keep the discoverable list in `?` overlay (one of the shadcn `Dialog` patterns). Standard bindings TLB internal apps agree on:

| Binding | Action |
|---|---|
| `/` | Focus the page search input |
| `g h` | Go home |
| `c` | Open the primary "Create" action of the page |
| `?` | Show the shortcut list |
| `Esc` | Close the topmost dialog or sheet |

Routes that do not support a shortcut still respect the bindings (no-op rather than custom hijack).

## Responsive Targets

- Internal apps target desktop first. Minimum supported width: 1280px wide.
- Sidebar collapses to a sheet under 1024px.
- Tablet (768 to 1024) is supported but not optimized.
- Mobile (under 768) is not a target. Apps render but may be cramped. Do not spend engineering cycles on mobile polish for internal tools.
