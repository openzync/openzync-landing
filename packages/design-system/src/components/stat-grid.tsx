import { Children } from "react";
import { cn } from "../cn";

export interface StatGridProps {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

const COL_CLASSES: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

// Unlike DataGrid, StatGrid wraps children in its own cells so callers can pass
// bare <StatBlock> elements.
export function StatGrid({ cols = 3, children, className }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-line bg-line",
        COL_CLASSES[cols],
        className,
      )}
    >
      {Children.map(children, (child, i) => (
        <div key={i} className="bg-surface-950 p-6">
          {child}
        </div>
      ))}
    </div>
  );
}
