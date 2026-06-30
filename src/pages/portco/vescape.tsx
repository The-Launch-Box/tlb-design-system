import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Flame, Rocket, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { VEscapeWordmark, VEscapeIgnitionPanel } from "@/components/portco/vescape";

export function VEscapePage() {
  return (
    <PortcoTheme portco="vescape" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <VEscapeWordmark />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Reach escape velocity"
        headline={<span className="italic">Break orbit. Move faster than the problem.</span>}
        body={<p>VEscape turns stalled programs into momentum, with the structure and warmth to keep teams moving together.</p>}
        actions={<>
          <Button size="lg">Ignite<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See how</Button>
        </>}
      />

      <VEscapeIgnitionPanel className="px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="3x" label="Faster time to launch" />
          <StatCallout value="0" label="Stalled milestones" />
          <StatCallout value="100%" label="Teams aligned at liftoff" />
        </div>
      </VEscapeIgnitionPanel>

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="The sequence" heading="From ignition to orbit." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProcessStep index={1} icon={Flame} title="Ignition" description="Find the spark and commit the energy to move." />
          <ProcessStep index={2} icon={Rocket} title="Liftoff" description="Launch with structure, precision, and a clear path." />
          <ProcessStep index={3} icon={Orbit} title="Orbit" description="Sustain momentum and hold a stable, repeatable course." />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="We went from stuck to shipping in a single quarter." author="Program Director" role="Confidential partner, aerospace" />
          <QuoteCard quote="They brought velocity without burning the team out." author="COO" role="Confidential partner, fintech" />
        </div>
      </section>

      <CTABanner
        headline="Ready to break orbit?"
        actions={<Button size="lg" variant="secondary">Start the countdown<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
