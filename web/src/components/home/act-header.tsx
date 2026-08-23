import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ActHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  className?: string;
};

/** Shared five-act section header: mono eyebrow + display headline. */
export function ActHeader({ eyebrow, title, className }: ActHeaderProps) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-section font-semibold text-foam">
        {title}
      </h2>
    </header>
  );
}
