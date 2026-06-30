import * as React from "react";
import { cn } from "@/lib/utils";

interface CTABannerProps extends React.ComponentProps<"section"> {
  headline: React.ReactNode;
  body?: React.ReactNode;
  actions: React.ReactNode;
}

function CTABanner({ headline, body, actions, className, ...props }: CTABannerProps) {
  return (
    <section className={cn("bg-primary text-primary-foreground px-6 py-16 md:px-12", className)} {...props}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl">{headline}</h2>
        {body ? <p className="mt-3 font-sans text-base opacity-90">{body}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
      </div>
    </section>
  );
}

export { CTABanner };
