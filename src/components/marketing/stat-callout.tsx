import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCalloutProps extends React.ComponentProps<"div"> {
  value: React.ReactNode;
  label: React.ReactNode;
}

function StatCallout({ value, label, className, ...props }: StatCalloutProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 text-center", className)} {...props}>
      <p className="font-display text-4xl text-primary md:text-5xl">{value}</p>
      <p className="mt-2 font-sans text-sm text-card-foreground">{label}</p>
    </div>
  );
}

export { StatCallout };
