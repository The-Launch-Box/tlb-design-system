import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/composites/app-shell";
import { PageHeader } from "@/components/composites/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DESTINATIONS = [
  { to: "/components", title: "Component Board", description: "Primitives and composites catalog." },
  { to: "/echelon", title: "Echelon Risk + Cyber", description: "Cybersecurity consulting brand page." },
  { to: "/improv", title: "Improv", description: "WFM and HCM transformation brand page." },
  { to: "/hyperscayle", title: "Hyperscayle", description: "Scale and data platform brand page." },
  { to: "/vescape", title: "VEscape", description: "Velocity and escape brand page." },
  { to: "/bluetrail", title: "Blue Trail Digital", description: "Digital asset management brand page." },
  { to: "/dxfoundation", title: "DX Foundation", description: "Foundations for the future brand page." },
];

export function Home() {
  return (
    <AppShell sidebar={null} topBar={null}>
      <PageHeader title="TLB Design System" subtitle="One board, every brand." />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((d) => (
          <Link key={d.to} to={d.to} className="group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Card className="h-full transition-colors group-hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {d.title}
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </CardTitle>
                <CardDescription>{d.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
