import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStepProps extends Omit<React.ComponentProps<"div">, "title"> {
  index?: React.ReactNode;
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ProcessStep({ index, icon: Icon, title, description, className, ...props }: ProcessStepProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)} {...props}>
      <div className="flex items-center gap-3">
        {index != null ? <span className="font-display text-2xl text-primary">{index}</span> : null}
        <Icon className="size-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-xl text-card-foreground">{title}</h3>
      <p className="mt-2 font-sans text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export { ProcessStep };
