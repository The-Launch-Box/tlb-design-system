import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoCloudProps extends React.ComponentProps<"div"> {
  label?: React.ReactNode;
}

function LogoCloud({ label, children, className, ...props }: LogoCloudProps) {
  return (
    <div className={cn("border-t border-border px-6 py-10 md:px-12", className)} {...props}>
      {label ? <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p> : null}
      <div className="flex flex-wrap items-center gap-8 opacity-80">{children}</div>
    </div>
  );
}

export { LogoCloud };
