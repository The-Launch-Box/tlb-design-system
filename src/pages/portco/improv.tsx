import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Activity, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { ImprovLogo } from "@/components/portco/improv";

export function ImprovPage() {
  return (
    <PortcoTheme portco="improv" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <ImprovLogo className="h-7 text-foreground" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="WFM and HCM consulting"
        headline="Elevating possibilities. Inspiring results."
        body={<p>We simplify WFM and HCM transformation so teams evolve with clarity. Decades of proven success in workforce management, human capital management, and business transformation.</p>}
        actions={<>
          <Button size="lg">Contact us<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See solutions</Button>
        </>}
      />

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="Mapping your journey" heading="Every journey is different. Start anywhere and drive real value at scale." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProcessStep index="Ignite" icon={Sparkles} title="Spark insight and momentum" description="Uncover challenges, align on opportunities, and set a clear path forward." />
          <ProcessStep index="Forge" icon={Flame} title="Shape and launch with purpose" description="Activate practical solutions and strategies that generate measurable outcomes." />
          <ProcessStep index="Evolve" icon={Activity} title="Optimize and sustain" description="Continuously refine and scale solutions for lasting value and adaptability." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="5/5" label="Average partner rating" />
          <StatCallout value="1,000+" label="Firms served" />
          <StatCallout value="Millions" label="Employee lives impacted" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="We genuinely felt like more than just a client. There was a real sense of partnership." author="Director of IT" role="Confidential partner, energy sector" />
          <QuoteCard quote="They took the time to understand our environment rather than applying a one-size-fits-all approach." author="Security Leader" role="Confidential partner, entertainment" />
        </div>
      </section>

      <CTABanner
        headline="Ready to evolve with clarity?"
        actions={<Button size="lg" variant="secondary">Contact us<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
