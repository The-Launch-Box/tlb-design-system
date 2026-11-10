import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckCircle2, Clock, Cat as CatIcon, Heart, Home, Loader2, Search, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppShell } from "@/components/composites/app-shell";
import { DataTable } from "@/components/composites/data-table";
import { EmptyState } from "@/components/composites/empty-state";
import { KpiCard } from "@/components/composites/kpi-card";
import { Notice } from "@/components/composites/notice";
import { ThemeToggle } from "@/components/composites/theme-toggle";
import { ToolPage } from "@/components/composites/tool-page";
import { ToolTabs } from "@/components/composites/tool-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  applicationSchema,
  type Application,
  type ApplicationValues,
  type Cat,
  type CatStatus,
} from "@/schemas/shelter";

const INITIAL_CATS: Cat[] = [
  { id: "c1", name: "Miso", age: "2 years", breed: "Domestic shorthair", temperament: "Curious, loves window seats", goodWithKids: true, status: "available" },
  { id: "c2", name: "Biscuit", age: "5 years", breed: "Maine coon mix", temperament: "Calm lap cat", goodWithKids: true, status: "available" },
  { id: "c3", name: "Pepper", age: "8 months", breed: "Tuxedo", temperament: "Playful, chases everything", goodWithKids: false, status: "available" },
  { id: "c4", name: "Juniper", age: "10 years", breed: "Russian blue", temperament: "Quiet, prefers one person", goodWithKids: false, status: "pending" },
  { id: "c5", name: "Waffles", age: "3 years", breed: "Orange tabby", temperament: "Friendly, food motivated", goodWithKids: true, status: "available" },
  { id: "c6", name: "Sable", age: "1 year", breed: "Domestic longhair", temperament: "Shy at first, then affectionate", goodWithKids: true, status: "adopted" },
];

const STATUS_META: Record<CatStatus, { label: string; icon: typeof Heart; variant: "default" | "secondary" | "outline" }> = {
  available: { label: "Available", icon: Heart, variant: "default" },
  pending: { label: "Adoption pending", icon: Clock, variant: "secondary" },
  adopted: { label: "Adopted", icon: CheckCircle2, variant: "outline" },
};

type View = "cats" | "applications";
type Filter = "all" | CatStatus;

function StatusPill({ status }: { status: CatStatus }) {
  const { label, icon: Icon, variant } = STATUS_META[status];
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="size-3" aria-hidden="true" />
      {label}
    </Badge>
  );
}

const columns: ColumnDef<Application>[] = [
  { accessorKey: "catName", header: "Cat" },
  { accessorKey: "applicant", header: "Applicant" },
  { accessorKey: "email", header: "Email", cell: ({ getValue }) => <span className="font-mono text-xs">{getValue<string>()}</span> },
  { accessorKey: "submitted", header: "Submitted", cell: ({ getValue }) => <span className="font-mono text-xs">{getValue<string>()}</span> },
];

export function ShelterPage() {
  const [cats, setCats] = useState<Cat[]>(INITIAL_CATS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [view, setView] = useState<View>("cats");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [applyingTo, setApplyingTo] = useState<Cat | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { applicant: "", email: "", notes: "" },
  });

  const counts = useMemo(
    () => ({
      total: cats.length,
      available: cats.filter((c) => c.status === "available").length,
      pending: cats.filter((c) => c.status === "pending").length,
      adopted: cats.filter((c) => c.status === "adopted").length,
    }),
    [cats],
  );

  const visible = cats.filter(
    (c) =>
      (filter === "all" || c.status === filter) &&
      `${c.name} ${c.breed} ${c.temperament}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function openApply(cat: Cat) {
    form.reset({ applicant: "", email: "", notes: "" });
    setApplyingTo(cat);
  }

  function onSubmit(values: ApplicationValues) {
    if (!applyingTo) return;
    const cat = applyingTo;
    setSubmitting(true);
    window.setTimeout(() => {
      setApplications((prev) => [
        {
          id: `a${prev.length + 1}`,
          catId: cat.id,
          catName: cat.name,
          applicant: values.applicant,
          email: values.email,
          submitted: format(new Date(), "MMM d, yyyy"),
        },
        ...prev,
      ]);
      setCats((prev) => prev.map((c) => (c.id === cat.id ? { ...c, status: "pending" } : c)));
      setSubmitting(false);
      setApplyingTo(null);
      toast.success(`Application sent for ${cat.name}`);
    }, 500);
  }

  return (
    <AppShell sectionLabel="Cat shelter" actions={<ThemeToggle />} footer="Sample shelter data. Applications stay in this browser tab.">
      <ToolPage title="Whisker Haven" description="Meet the cats waiting for a home and send an adoption application.">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard label="Cats in care" value={counts.total} icon={CatIcon} />
          <KpiCard label="Ready to adopt" value={counts.available} icon={Heart} />
          <KpiCard label="Adoption pending" value={counts.pending} icon={Clock} />
          <KpiCard label="Adopted" value={counts.adopted} icon={Home} delta={{ value: "Great work, team", positive: true }} />
        </div>

        <ToolTabs<View>
          aria-label="Shelter view"
          value={view}
          onValueChange={setView}
          items={[
            { value: "cats", label: "Cats", icon: <CatIcon /> },
            { value: "applications", label: "Applications", count: applications.length, icon: <Users /> },
          ]}
        />

        {view === "cats" ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-56 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  aria-label="Search cats"
                  placeholder="Search by name, breed or temperament"
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
                <SelectTrigger aria-label="Filter by status" className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cats</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Adoption pending</SelectItem>
                  <SelectItem value="adopted">Adopted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {visible.length === 0 ? (
              <EmptyState
                icon={CatIcon}
                title="No cats match"
                description="Try a different search or show every cat."
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((cat) => (
                  <Card key={cat.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle>{cat.name}</CardTitle>
                        <StatusPill status={cat.status} />
                      </div>
                      <CardDescription>
                        {cat.age}, {cat.breed}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>{cat.temperament}</p>
                      <p className="text-muted-foreground">{cat.goodWithKids ? "Good with kids" : "Best in a home without young kids"}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        disabled={cat.status !== "available"}
                        onClick={() => openApply(cat)}
                        aria-label={`Adopt ${cat.name}`}
                      >
                        {cat.status === "available" ? `Adopt ${cat.name}` : STATUS_META[cat.status].label}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : applications.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No applications yet"
            description="Applications you send from the Cats tab show up here."
            action={<Button onClick={() => setView("cats")}>Browse Cats</Button>}
          />
        ) : (
          <>
            <Notice tone="info">A volunteer reviews each application and replies within two days.</Notice>
            <DataTable columns={columns} data={applications} pageSize={8} />
          </>
        )}
      </ToolPage>

      <Dialog open={applyingTo !== null} onOpenChange={(open) => (open ? null : setApplyingTo(null))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adopt {applyingTo?.name}</DialogTitle>
            <DialogDescription>Tell us a little about you. We will follow up by email.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormField
                control={form.control}
                name="applicant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setApplyingTo(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                  Send Application
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
