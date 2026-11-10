import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/composites/app-shell";
import { ThemeToggle } from "@/components/composites/theme-toggle";
import { ToolPage } from "@/components/composites/tool-page";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DESTINATIONS = [
  {
    to: "/runway",
    title: "Runway",
    description: "A cash runway planner built from the portal tool-page pattern.",
  },
  {
    to: "/components",
    title: "Component board",
    description: "Every primitive and composite, as tlb-financial-tools ships them.",
  },
  {
    to: "/firm-themes",
    title: "Firm themes",
    description: "One set of components, retinted per firm by colour tokens alone.",
  },
];

export function Home() {
  return (
    <AppShell actions={<ThemeToggle />}>
      <ToolPage
        title="TLB Design System"
        description="The UI of tlb-financial-tools: tokens, fonts, components and the patterns that hold them together."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {d.title}
                    <ArrowRight
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </CardTitle>
                  <CardDescription>{d.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </ToolPage>
    </AppShell>
  );
}
