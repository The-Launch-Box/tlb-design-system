import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowLeftRight,
  CheckCircle,
  CircleDollarSign,
  FileSpreadsheet,
  Inbox,
  Loader2,
  Settings,
  ShieldHalf,
  Trash2,
  TrendingUp,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppShell } from "@/components/composites/app-shell";
import { BrandMark } from "@/components/composites/brand-mark";
import { DataTable } from "@/components/composites/data-table";
import { Delta } from "@/components/composites/delta";
import { EmptyState } from "@/components/composites/empty-state";
import { KpiCard } from "@/components/composites/kpi-card";
import { LiveSync } from "@/components/composites/live-sync";
import { PageHeader } from "@/components/composites/page-header";
import { SignalBadge } from "@/components/composites/signal-badge";
import { Sparkline } from "@/components/composites/sparkline";
import { StatusBadge } from "@/components/composites/status-badge";
import { ToolLauncher } from "@/components/composites/tool-launcher";

type Demo = {
  id: string;
  client: string;
  amount: string;
  status: "draft" | "pending" | "approved" | "rejected";
};

const DEMO_ROWS: Demo[] = [
  { id: "INV-1001", client: "Company A", amount: "$10,000.00", status: "approved" },
  { id: "INV-1002", client: "Company B", amount: "$8,900.00", status: "pending" },
  { id: "INV-1003", client: "Company C", amount: "$22,150.00", status: "draft" },
  { id: "INV-1004", client: "Company D", amount: "$5,300.00", status: "rejected" },
];

const COLUMNS: ColumnDef<Demo>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "client", header: "Client" },
  { accessorKey: "amount", header: "Amount" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

const SIDEBAR_LINKS = [
  { label: "Dashboard", icon: TrendingUp },
  { label: "Invoices", icon: CircleDollarSign },
  { label: "Inbox", icon: Inbox },
  { label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <nav className="flex flex-col gap-1 p-4">
      <div className="mb-4 flex items-center gap-3">
        <BrandMark size="md" className="size-12" />
        <p className="font-display text-xs uppercase tracking-wide text-tlb-orange">
          TLB Internal
        </p>
      </div>
      {SIDEBAR_LINKS.map(({ label, icon: Icon }) => (
        <a
          key={label}
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 font-sans text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Icon className="size-4" aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <LiveSync>Live, synced 2m ago</LiveSync>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="size-4" aria-hidden="true" />
            Example User
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** Resolve a `public/` asset against the Vite base so it works on Pages too. */
const brandAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function LogoSwatch({
  src,
  label,
  surface = "light",
}: {
  src: string;
  label: string;
  surface?: "light" | "dark";
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div
        className={cn(
          "flex h-24 items-center justify-center overflow-hidden rounded-md border p-5",
          surface === "dark" ? "border-transparent bg-black" : "bg-white"
        )}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
      <figcaption className="font-sans text-xs text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

function BrandLogoShowcase() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Brand and portco logos</CardTitle>
        <CardDescription>
          Official brand assets served from <code>/brand/</code>. The Launch Box
          is the house mark; Echelon and Improv are portco lockups. Reversed and
          light variants sit on dark surfaces.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            The Launch Box
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <LogoSwatch
              src={brandAsset("brand/tlb/tlb-square.png")}
              label="Square"
            />
            <LogoSwatch
              src={brandAsset("brand/tlb/tlb-horizontal.png")}
              label="Horizontal"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Echelon Risk + Cyber
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <LogoSwatch
              src={brandAsset("brand/echelon/echelon-logo-long.svg")}
              label="Logo, long"
              surface="dark"
            />
            <LogoSwatch
              src={brandAsset("brand/echelon/echelon-logo-stacked.svg")}
              label="Logo, stacked"
              surface="dark"
            />
            <LogoSwatch
              src={brandAsset("brand/echelon/echelon-wordmark-light.svg")}
              label="Wordmark"
              surface="dark"
            />
            <LogoSwatch
              src={brandAsset("brand/echelon/echelon-glitch-yellow.svg")}
              label="Glitch mark"
              surface="dark"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Improv
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <LogoSwatch
              src={brandAsset("brand/improv/improv-logo.png")}
              label="Logo"
            />
            <LogoSwatch
              src={brandAsset("brand/improv/improv-icon.png")}
              label="Icon"
            />
            <LogoSwatch
              src={brandAsset("brand/improv/improv-logo-reversed.png")}
              label="Logo, reversed"
              surface="dark"
            />
            <LogoSwatch
              src={brandAsset("brand/improv/improv-icon-reversed.png")}
              label="Icon, reversed"
              surface="dark"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ComponentsBoard() {
  return (
    <AppShell sidebar={<Sidebar />} topBar={<TopBar />}>
      <PageHeader
        title="Component Board"
        subtitle="Every TLB primitive and composite in one place."
        actions={
          <>
            <Button variant="outline" size="sm">
              Documentation
            </Button>
            <Button size="sm" onClick={() => toast.success("Saved.")}>
              Trigger toast
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard
          label="Cash on hand"
          value="$1.42M"
          delta={{ value: "+4.3% MoM", positive: true }}
          icon={CircleDollarSign}
        />
        <KpiCard
          label="Open invoices"
          value="14"
          delta={{ value: "+2 since last week", positive: true }}
          icon={Inbox}
        />
        <KpiCard
          label="Net P&amp;L (today)"
          value="+$104.3K"
          sparkline={
            <Sparkline
              values={[0.3, 0.45, 0.4, 0.6, 0.55, 0.7, 0.85]}
              trend="up"
            />
          }
        />
        <KpiCard label="Approvals pending" value="3" icon={CheckCircle} />
      </div>

      <BrandLogoShowcase />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
          <CardDescription>
            The four most recent client invoices, sortable by any column.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={COLUMNS} data={DEMO_ROWS} />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Form primitives</CardTitle>
          <CardDescription>
            Inputs, controls, and switches.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="client">Client name</Label>
            <Input id="client" placeholder="Company A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memo">Memo</Label>
            <Textarea id="memo" placeholder="Optional note for the team" rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Billing frequency</Label>
            <Select>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Pick one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-2">
              <Checkbox id="autopay" />
              <Label htmlFor="autopay">Auto-pay enabled</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="notify" defaultChecked />
              <Label htmlFor="notify">Email on send</Label>
            </div>
            <RadioGroup defaultValue="net30" className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="net15" value="net15" />
                <Label htmlFor="net15">Net 15</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="net30" value="net30" />
                <Label htmlFor="net30">Net 30</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Badges and status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <StatusBadge status="draft" />
          <StatusBadge status="pending" />
          <StatusBadge status="approved" />
          <StatusBadge status="rejected" />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Delete">
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete record</TooltipContent>
          </Tooltip>
          <Button disabled>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Saving
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Signal primitives</CardTitle>
          <CardDescription>
            Financial-signal building blocks: status pills, deltas, live-sync
            chips, and inline sparklines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <SignalBadge kind="settled" />
            <SignalBadge kind="pending" />
            <SignalBadge kind="failed" />
            <SignalBadge kind="draft" />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Delta value={1.24} />
            <Delta value={-0.83} />
            <Delta value={4.7} suffix="bps" decimals={1} />
            <LiveSync>Live, synced 2m ago</LiveSync>
            <LiveSync state="stale">Last sync 14m ago</LiveSync>
            <LiveSync state="down">Sync paused</LiveSync>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs uppercase tracking-wide text-muted-foreground">
                Trending up
              </span>
              <Sparkline
                values={[0.2, 0.3, 0.45, 0.4, 0.6, 0.55, 0.7, 0.85]}
                className="w-40"
                trend="up"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-xs uppercase tracking-wide text-muted-foreground">
                Trending down
              </span>
              <Sparkline
                values={[0.8, 0.7, 0.75, 0.55, 0.6, 0.4, 0.35, 0.2]}
                className="w-40"
                trend="down"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tool launchers</CardTitle>
          <CardDescription>
            Card-style launcher tiles for the dashboard tools grid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ToolLauncher
              icon={FileSpreadsheet}
              title="FX Settlement Sheet"
              description="Live pricing workbook for the macro FX desk."
              meta="Updated 2m ago"
              onClick={() => toast.message("Opening FX Settlement Sheet.")}
            />
            <ToolLauncher
              icon={ArrowLeftRight}
              title="Daily Reconciliation"
              description="Match custodian ledger against internal book."
              meta="28 unmatched"
              onClick={() => toast.message("Opening Reconciliation.")}
            />
            <ToolLauncher
              icon={ShieldHalf}
              title="Portfolio Risk Engine"
              description="VaR, stress scenarios, and limit monitoring."
              meta="2 limits breached"
              onClick={() => toast.message("Opening Risk Engine.")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overlays</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create invoice</DialogTitle>
                  <DialogDescription>
                    Provide the client and amount. We will pre-fill the rest.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <Label htmlFor="d-client">Client</Label>
                  <Input id="d-client" placeholder="Company A" />
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This cannot be undone. All invoices and audit records
                    for this account will be removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine the visible invoices.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-3 px-4">
                  <Label htmlFor="filter-client">Client</Label>
                  <Input id="filter-client" placeholder="All clients" />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Apply</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2">
                <p className="font-display text-xs uppercase tracking-wide text-muted-foreground">
                  Quick edit
                </p>
                <Input placeholder="Memo" />
                <Button size="sm">Save</Button>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loading states</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <p className="font-sans text-xs text-muted-foreground">
              Skeleton placeholders pulse with the muted token.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="catalog">Catalog</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="mt-3 font-sans text-sm text-muted-foreground">
                Tabs are page-level navigation. Never nest inside a card. (This
                one is for showcase only.)
              </p>
            </TabsContent>
            <TabsContent value="usage">
              <p className="mt-3 font-sans text-sm text-muted-foreground">
                Install via the shadcn CLI from this registry.
              </p>
            </TabsContent>
            <TabsContent value="catalog">
              <p className="mt-3 font-sans text-sm text-muted-foreground">
                See docs/04-component-catalog.md.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8">
        <EmptyState
          icon={Inbox}
          title="No requests yet"
          description="When a teammate submits a request, it lands here."
          action={<Button size="sm">New request</Button>}
        />
      </div>
    </AppShell>
  );
}
