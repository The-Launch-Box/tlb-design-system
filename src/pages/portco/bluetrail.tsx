import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Compass, FolderTree, Map, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, FeatureCard, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { BlueTrailWordmark, BlueTrailTrailDivider } from "@/components/portco/bluetrail";

export function BlueTrailPage() {
  return (
    <PortcoTheme portco="bluetrail" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <BlueTrailWordmark className="text-primary" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Digital asset management"
        headline="We do DAM right."
        highlight="No wrong turns."
        body={<p>Blue Trail Digital activates digital asset management across business functions, so the right file is never more than a step off the path.</p>}
        actions={<>
          <Button size="lg">Find your trail<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See the map</Button>
        </>}
      />

      <div className="px-6 md:px-12"><BlueTrailTrailDivider /></div>

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="The kit" heading="Everything you need to navigate your assets." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={FolderTree} title="Structure" description="A library that maps to how your teams actually work." />
          <FeatureCard icon={Tag} title="Metadata" description="Tags and taxonomy that make search feel like cheating." />
          <FeatureCard icon={Map} title="Governance" description="Clear rules of the trail, so nothing gets lost." />
          <FeatureCard icon={Compass} title="Adoption" description="We guide your people to the trailhead and beyond." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="40%" label="Less time hunting for files" />
          <StatCallout value="1" label="Source of truth" />
          <StatCallout value="Zero" label="Lost final-final-v3 files" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="They mapped our chaos into something a new hire can navigate on day one." author="Brand Operations Lead" role="Confidential partner, retail" />
          <QuoteCard quote="DAM done right, with a sense of humor that kept the rollout human." author="Marketing Director" role="Confidential partner, hospitality" />
        </div>
      </section>

      <CTABanner
        headline="Ready to find the trail?"
        body="Bring the assets. We will bring the map."
        actions={<Button size="lg" variant="secondary">Start the hike<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
