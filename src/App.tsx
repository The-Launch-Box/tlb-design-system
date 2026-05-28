import { type ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  ArrowRight,
  CheckCircle,
  CircleDollarSign,
  Compass,
  Flame,
  Hammer,
  Inbox,
  Loader2,
  Mail,
  Search,
  Settings,
  Sparkles,
  Trash2,
  TrendingUp,
  User,
} from "lucide-react";
import { Toaster, toast } from "sonner";

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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppShell } from "@/components/composites/app-shell";
import { DataTable } from "@/components/composites/data-table";
import { EmptyState } from "@/components/composites/empty-state";
import { KpiCard } from "@/components/composites/kpi-card";
import { PageHeader } from "@/components/composites/page-header";
import { StatusBadge } from "@/components/composites/status-badge";
import { PortcoTheme } from "@/components/portco/portco-theme";
import {
  EchelonHero,
  EchelonLogoStacked,
  EchelonProcessStep,
  EchelonQuoteCard,
  EchelonStatCallout,
} from "@/components/portco/echelon";
import {
  ImprovHero,
  ImprovJourneyStep,
  ImprovLogo,
  ImprovPillButton,
  ImprovQuoteCard,
  ImprovStatCallout,
} from "@/components/portco/improv";

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
      <p className="font-display mb-2 text-xs uppercase tracking-wide text-tlb-orange">
        TLB Internal
      </p>
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
      <p className="font-sans text-sm text-muted-foreground">
        Welcome back
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="size-4" />
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

function EchelonShowcase() {
  return (
    <PortcoTheme portco="echelon" className="mt-6">
      <div className="flex items-center justify-between px-6 pt-6 md:px-12">
        <EchelonLogoStacked className="size-20 text-[var(--color-echelon-yellow)]" />
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-echelon-yellow)]/80">
          Portco preview
        </span>
      </div>
      <EchelonHero
        eyebrow="Cybersecurity consulting"
        headline="Security and privacy are basic human rights."
        highlight="We are built to protect them."
        body={
          <>
            <p>
              The threats we face are constantly evolving. We see this as our
              calling: keep mid-market organizations safe across vCISO, MSSP,
              and offensive testing engagements.
            </p>
            <p className="mt-4">We take this personally. We are all in.</p>
          </>
        }
        actions={
          <>
            <Button size="lg">
              Start the conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg">
              See services
            </Button>
          </>
        }
      />

      <section className="px-6 py-12 md:px-12">
        <div className="mb-8 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-echelon-yellow)] mb-3">
            How we work
          </p>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wider md:text-4xl">
            Clear, actionable, people-led cybersecurity that delivers results.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <EchelonProcessStep
            step={1}
            icon={Search}
            title="Assess"
            description="Custom risk assessments tailored to your specific business needs."
          />
          <EchelonProcessStep
            step={2}
            icon={Compass}
            title="Strategize"
            description="Practical security roadmaps that align with your long-term goals."
          />
          <EchelonProcessStep
            step={3}
            icon={Hammer}
            title="Implement"
            description="Hands-on execution, ensuring security measures are a reality."
          />
          <EchelonProcessStep
            step={4}
            icon={TrendingUp}
            title="Level Up"
            description="Continuous improvement and proactive threat mitigation."
          />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <EchelonStatCallout value="500+" label="Mid-market clients" />
          <EchelonStatCallout value="24/7" label="MSSP coverage" />
          <EchelonStatCallout value="100%" label="Compliance focus" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EchelonQuoteCard
            quote="Echelon felt like an extension of our team. They moved quickly, communicated clearly, and delivered."
            author="Security Leader"
            role="Confidential partner, financial services"
          />
          <EchelonQuoteCard
            quote="Their deep expertise modernized our detection capabilities and gave us better visibility across the environment."
            author="Senior Manager, Information Security"
            role="Confidential partner, consumer goods"
          />
        </div>
      </section>

      <section className="border-t border-[var(--color-echelon-blue-light)] px-6 py-10 md:px-12">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-echelon-yellow)] mb-4">
          Unmodified shadcn primitives, restyled by token cascade
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </PortcoTheme>
  );
}

function ImprovShowcase() {
  return (
    <PortcoTheme portco="improv" className="mt-6">
      <div className="flex items-center justify-between px-6 pt-6 md:px-12">
        <ImprovLogo className="h-8 text-[var(--color-improv-off-white)]" />
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-improv-teal)]">
          Portco preview
        </span>
      </div>
      <ImprovHero
        eyebrow="WFM / HCM consulting"
        headline="Elevating Possibilities. Inspiring Results."
        body="Simplifying WFM/HCM transformation to evolve with clarity. Decades of proven success in workforce management, human capital management, and business transformation."
        actions={
          <>
            <ImprovPillButton size="lg">
              Contact us
              <ArrowRight className="size-4" aria-hidden="true" />
            </ImprovPillButton>
            <ImprovPillButton variant="outline" size="lg">
              See solutions
            </ImprovPillButton>
          </>
        }
      />

      <section className="px-6 py-12 md:px-12">
        <div className="mb-8 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-improv-teal)] mb-3">
            Mapping your journey
          </p>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">
            Every journey is different. Start anywhere and drive real value at scale.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ImprovJourneyStep
            phase="Ignite"
            icon={Sparkles}
            tagline="Spark insight, alignment, and momentum"
            description="Uncover challenges, align on opportunities, and set a clear journey forward."
          />
          <ImprovJourneyStep
            phase="Forge"
            icon={Flame}
            tagline="Shape and launch with purpose"
            description="Activate practical solutions, technology, and strategies that generate measurable outcomes."
          />
          <ImprovJourneyStep
            phase="Evolve"
            icon={Activity}
            tagline="Optimize and sustain transformation"
            description="Continuously improve by refining and scaling solutions for lasting value and adaptability."
          />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ImprovStatCallout value="5/5" label="Average partner rating" />
          <ImprovStatCallout value="1,000+" label="Companies served" />
          <ImprovStatCallout value="Millions" label="Employee lives impacted" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ImprovQuoteCard
            quote="We genuinely felt like more than just a client. There was a real sense of partnership."
            author="Director of IT"
            role="Confidential partner, energy sector"
          />
          <ImprovQuoteCard
            quote="They took the time to understand our environment rather than applying a one-size-fits-all approach."
            author="Security Leader"
            role="Confidential partner, entertainment"
          />
        </div>
      </section>

      <section className="border-t border-[var(--color-improv-muted)] px-6 py-10 md:px-12">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-improv-teal)] mb-4">
          Unmodified shadcn primitives, restyled by token cascade
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </PortcoTheme>
  );
}

export function App() {
  return (
    <TooltipProvider>
      <AppShell sidebar={<Sidebar />} topBar={<TopBar />}>
        <PageHeader
          title="Design System Showcase"
          subtitle="TLB defaults plus portco previews for Improv and Echelon."
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

        <Tabs defaultValue="tlb" className="mt-6">
          <TabsList>
            <TabsTrigger value="tlb">TLB</TabsTrigger>
            <TabsTrigger value="echelon">Echelon</TabsTrigger>
            <TabsTrigger value="improv">Improv</TabsTrigger>
          </TabsList>

          <TabsContent value="tlb" className="mt-6">

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
            label="Overdue"
            value="$31.2k"
            delta={{ value: "-1 invoice this week", positive: false }}
            icon={Mail}
          />
          <KpiCard label="Approvals pending" value="3" icon={CheckCircle} />
        </div>

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
                  <Trash2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete record</TooltipContent>
            </Tooltip>
            <Button disabled>
              <Loader2 className="size-4 animate-spin" />
              Saving
            </Button>
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

          </TabsContent>

          <TabsContent value="echelon">
            <EchelonShowcase />
          </TabsContent>

          <TabsContent value="improv">
            <ImprovShowcase />
          </TabsContent>
        </Tabs>
      </AppShell>
      <Toaster richColors closeButton />
    </TooltipProvider>
  );
}
