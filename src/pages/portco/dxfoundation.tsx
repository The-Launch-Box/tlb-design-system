import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Layers, Rocket, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { DXFWordmark, DXFCosmicField } from "@/components/portco/dxfoundation";

export function DXFoundationPage() {
  return (
    <PortcoTheme portco="dxfoundation" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <DXFWordmark className="text-secondary" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Foundations for the future"
        headline="Built for you,"
        highlight="for the future."
        body={<p>When we talk about foundations, we mean possibilities. We go deep on the systems, the teams, and the goals of the firms we partner with.</p>}
        actions={<>
          <Button size="lg">Lay the groundwork<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">Explore</Button>
        </>}
      />

      <DXFCosmicField className="px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="∞" label="Possibilities from a solid base" />
          <StatCallout value="1:1" label="Foundation fit to your vision" />
          <StatCallout value="Future" label="Where we build toward" />
        </div>
      </DXFCosmicField>

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="How we build" heading="Deep on the systems, the teams, and the goals." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProcessStep index={1} icon={Telescope} title="Survey" description="Understand the terrain before we pour anything." />
          <ProcessStep index={2} icon={Layers} title="Foundation" description="Lay a base fit to your future, not a template." />
          <ProcessStep index={3} icon={Rocket} title="Launch" description="Build up with confidence and room to grow." />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="They got the foundation right, so everything we built after just worked." author="CTO" role="Confidential partner, healthcare" />
          <QuoteCard quote="It felt like they were planning for our next decade, not our next quarter." author="Founder" role="Confidential partner, climate" />
        </div>
      </section>

      <CTABanner
        headline="Ready to build something that lasts?"
        actions={<Button size="lg" variant="secondary">Start with the foundation<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
