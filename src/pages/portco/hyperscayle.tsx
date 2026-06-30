import { Link } from "react-router";
import { ArrowLeft, ArrowRight, BarChart3, Boxes, Gauge, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, FeatureCard, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { HyperscayleWordmark, HyperscayleWink } from "@/components/portco/hyperscayle";

export function HyperscaylePage() {
  return (
    <PortcoTheme portco="hyperscayle" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <div className="flex items-center gap-3 text-secondary">
          <HyperscayleWink className="text-secondary" />
          <HyperscayleWordmark />
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Scale and data platform"
        headline="Remove complexity."
        highlight="Scale what works."
        body={<p>We connect technical depth to real outcomes: the dollar impact of moving from lead to cash, measured and made plain.</p>}
        actions={<>
          <Button size="lg">Talk to us<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See the platform</Button>
        </>}
      />

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="What we do" heading="Built to scale with you." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Gauge} title="Performance" description="Tuned pipelines that keep pace as data volume grows." />
          <FeatureCard icon={Boxes} title="Modular" description="Composable building blocks, not a monolith." />
          <FeatureCard icon={BarChart3} title="Measured" description="Every change tied to a number that matters." />
          <FeatureCard icon={Workflow} title="Automated" description="Lead to cash, wired end to end." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="10x" label="Throughput at peak load" />
          <StatCallout value="99.9%" label="Pipeline uptime" />
          <StatCallout value="Days" label="From signal to action" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="They translated our data mess into a system we can actually reason about." author="VP, Data" role="Confidential partner, logistics" />
          <QuoteCard quote="The lead-to-cash view paid for itself in the first quarter." author="Head of RevOps" role="Confidential partner, SaaS" />
        </div>
      </section>

      <CTABanner
        headline="Ready to scale without the complexity?"
        body="Start with the metric that matters most to you."
        actions={<Button size="lg" variant="secondary">Start the conversation<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
