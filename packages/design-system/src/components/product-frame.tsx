import { cn } from "../cn";

export interface ProductFrameProps {
  title: string;
  variant?: "terminal" | "graph" | "timeline" | "generic";
  children: React.ReactNode;
  className?: string;
}

const BODY_CLASSES = {
  terminal: "p-4 font-mono text-[13px]",
  graph: "p-4",
  timeline: "p-5",
  generic: "p-5",
} as const;

export function ProductFrame({
  title,
  variant = "generic",
  children,
  className,
}: ProductFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface-900",
        className,
      )}
    >
      <div className="flex h-9 items-center border-b border-line bg-panel-raised px-3">
        <span className="truncate font-mono text-xs text-dim">{title}</span>
      </div>
      <div className={BODY_CLASSES[variant]}>{children}</div>
    </div>
  );
}
