import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

function FeatureCard({ icon: Icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)} {...props}>
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg text-card-foreground">{title}</h3>
      <p className="mt-2 font-sans text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export { FeatureCard };
