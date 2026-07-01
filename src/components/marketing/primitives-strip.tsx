import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PrimitivesStripProps extends React.ComponentProps<"section"> {
  note?: React.ReactNode;
}

function PrimitivesStrip({ note = "Unmodified shadcn primitives, restyled by token cascade", className, ...props }: PrimitivesStripProps) {
  return (
    <section className={cn("border-t border-border px-6 py-10 md:px-12", className)} {...props}>
      <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-primary">{note}</p>
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
  );
}

export { PrimitivesStrip };
