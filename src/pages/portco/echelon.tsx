import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Compass, Hammer, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { EchelonLogoStacked } from "@/components/portco/echelon";

export function EchelonPage() {
  return (
    <PortcoTheme portco="echelon" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <EchelonLogoStacked className="size-16 text-primary" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Cybersecurity consulting"
        headline="Security and privacy are basic human rights."
        highlight="We are built to protect them."
        highlightTone="mark"
        body={<>
          <p>The threats we face are constantly evolving. We keep mid-market firms safe across vCISO, MSSP, and offensive testing engagements.</p>
          <p className="mt-4">We take this personally. We are all in.</p>
        </>}
        actions={<>
          <Button size="lg">Start the conversation<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See services</Button>
        </>}
      />

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="How we work" heading="Clear, actionable, people-led cybersecurity that delivers results." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProcessStep index={1} icon={Search} title="Assess" description="Custom risk assessments tailored to your business needs." />
          <ProcessStep index={2} icon={Compass} title="Strategize" description="Practical security roadmaps aligned with your long-term goals." />
          <ProcessStep index={3} icon={Hammer} title="Implement" description="Hands-on execution that makes security measures a reality." />
          <ProcessStep index={4} icon={TrendingUp} title="Level Up" description="Continuous improvement and proactive threat mitigation." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="500+" label="Mid-market clients" />
          <StatCallout value="24/7" label="MSSP coverage" />
          <StatCallout value="100%" label="Compliance focus" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="Echelon felt like an extension of our team. They moved quickly, communicated clearly, and delivered." author="Security Leader" role="Confidential partner, financial services" />
          <QuoteCard quote="Their deep expertise modernized our detection and gave us better visibility across the environment." author="Senior Manager, Information Security" role="Confidential partner, consumer goods" />
        </div>
      </section>

      <CTABanner
        headline="Ready to take security personally?"
        actions={<Button size="lg" variant="secondary">Start the conversation<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
