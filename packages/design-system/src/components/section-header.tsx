import { cn } from "../cn";
import { MonoMeta } from "./mono-meta";

export interface SectionHeaderProps {
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  title,
  lede,
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        {index ? (
          <MonoMeta className="mb-3 block">
            {/^\d/.test(index) ? <>{index} &mdash;</> : index}
          </MonoMeta>
        ) : null}
        <h2 className="font-display text-3xl md:text-4xl font-medium text-text">
          {title}
        </h2>
        {lede ? <p className="mt-4 text-muted">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
