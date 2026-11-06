import { useState } from "react";
import { Building2, Calculator, Hourglass, Mail, Play, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActorBadge } from "@/components/composites/actor-badge";
import { AppSwitcher } from "@/components/composites/app-switcher";
import { AuditTimeline } from "@/components/composites/audit-timeline";
import { FieldDiff } from "@/components/composites/field-diff";
import { FilterBar } from "@/components/composites/filter-bar";
import { Flapboard } from "@/components/composites/flapboard";
import { KpiCard } from "@/components/composites/kpi-card";
import { LoadingState, Notice } from "@/components/composites/notice";
import { PayloadList } from "@/components/composites/payload-list";
import { ReviewItemCard } from "@/components/composites/review-item-card";
import { StatusBadge, type Status } from "@/components/composites/status-badge";
import { ToolPage } from "@/components/composites/tool-page";
import { ToolTabs } from "@/components/composites/tool-tabs";

const WORKFLOW_STATUSES: Status[] = [
  "received",
  "analyzing",
  "proposed",
  "awaiting_approval",
  "executing",
  "completed",
  "succeeded",
  "failed",
  "needs_attention",
  "skipped",
  "not_attempted",
  "superseded",
  "dismissed",
  "expired",
];

const BEFORE = { company: { name: "Acme", domain: "acme.com" }, owner: "J. Chen" };
const AFTER = { company: { name: "Acme Corp", domain: "acme.com" }, stage: "qualified" };

type View = "weekly" | "alerts" | "settings";

/**
 * Tool-page and review composites lifted from tlb-financial-tools and the
 * Echelon Automation Hub console (2026-11).
 */
export function ToolAndReviewShowcase() {
  const [view, setView] = useState<View>("weekly");
  const [period, setPeriod] = useState("QTD");
  const [owner, setOwner] = useState("All");
  const [excluded, setExcluded] = useState(false);

  return (
    <section aria-labelledby="tool-review-heading" className="mt-8 space-y-8">
      <h2 id="tool-review-heading" className="text-2xl text-foreground">
        Tool pages and review flows
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Tool page shell</CardTitle>
          <CardDescription>ToolPage, ToolTabs, FilterBar, Notice, LoadingState, AppSwitcher.</CardDescription>
        </CardHeader>
        <CardContent>
          <ToolPage
            title="Cashflow"
            description="13-week view by entity"
            actions={
              <AppSwitcher
                allAppsHref="#/"
                items={[
                  { id: "cashflow", name: "Cashflow", icon: Wallet, href: "#/components" },
                  { id: "cpq", name: "CPQ", icon: Calculator, href: "#/components" },
                  { id: "inbox", name: "HubSpot inbox", icon: Mail, href: "https://example.com", external: true },
                ]}
              />
            }
          >
            <ToolTabs<View>
              aria-label="Cashflow view"
              value={view}
              onValueChange={setView}
              items={[
                { value: "weekly", label: "Weekly" },
                { value: "alerts", label: "Alerts", count: 3 },
                { value: "settings", label: "Settings" },
              ]}
            >
              <Button variant="outline" size="sm">
                Sync
              </Button>
            </ToolTabs>
            <FilterBar
              periods={["MTD", "QTD", "YTD"]}
              selectedPeriod={period}
              onPeriodChange={setPeriod}
              options={["All", "A. Rivera", "J. Chen"]}
              selectedOption={owner}
              onOptionChange={setOwner}
            />
            <Notice tone="sample">Sample data. Connect an entity to see real figures.</Notice>
            <Notice
              tone="error"
              action={
                <Button size="sm" variant="outline">
                  Retry
                </Button>
              }
            >
              Could not load the forecast.
            </Notice>
            <LoadingState label="Loading entities..." />
          </ToolPage>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flapboard</CardTitle>
          <CardDescription>Hover the heading to flap through the words.</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-5xl text-foreground">
            Welcome to <Flapboard words={["TLB", "LAUNCH"]} />
          </h3>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard label="Awaiting review" value={4} icon={Hourglass} tone="warning" emphasis />
        <KpiCard label="In progress" value={2} icon={Play} tone="info" />
        <KpiCard label="Needs attention" value={1} tone="negative" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow statuses</CardTitle>
          <CardDescription>StatusBadge values for propose, approve, execute automations.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {WORKFLOW_STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <ReviewItemCard
          index={1}
          icon={Building2}
          label="Update company"
          reference="P-03"
          status={<StatusBadge status={excluded ? "skipped" : "proposed"} />}
          summary="Rename Acme to Acme Corp and set the stage to qualified."
          excludable
          excluded={excluded}
          onExcludedChange={setExcluded}
        >
          <PayloadList payload={{ companyId: "8812", stage: "qualified", tags: ["inbound", "q4"] }} />
        </ReviewItemCard>
        <ReviewItemCard
          index={2}
          icon={Mail}
          label="Send email"
          status={<StatusBadge status="failed" />}
          summary="Send the welcome email to the primary contact."
          error="The contact has no email address on file."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit timeline</CardTitle>
          <CardDescription>AuditTimeline with ActorBadge and FieldDiff.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <ActorBadge actor={{ kind: "system", component: "intake" }} />
            <ActorBadge actor={{ kind: "model", model: "claude-opus-5-5" }} />
            <ActorBadge actor={{ kind: "human", displayName: "A. Rivera" }} />
          </div>
          <AuditTimeline
            events={[
              {
                id: "1",
                title: "Run created",
                actor: { kind: "system", component: "intake" },
                timestamp: "2026-11-06T14:02:00Z",
                payload: { source: "email" },
              },
              {
                id: "2",
                title: "Proposal revised",
                actor: { kind: "human", displayName: "A. Rivera" },
                timestamp: "2026-11-06T14:20:00Z",
                body: <FieldDiff before={BEFORE} after={AFTER} />,
              },
            ]}
          />
        </CardContent>
      </Card>
    </section>
  );
}
