import { cn } from "../cn";
import { MonoMeta } from "./mono-meta";

export interface DataCardProps {
  title?: React.ReactNode;
  meta?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export function DataCard({
  title,
  meta,
  icon,
  children,
  interactive = false,
  className,
}: DataCardProps) {
  const hasHeader = title || meta || icon;
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface-900 p-6",
        interactive &&
          "transition-colors duration-150 hover:border-signal-dim",
        className,
      )}
    >
      {hasHeader ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {icon ? (
              <span className="mt-0.5 text-signal-dim" aria-hidden="true">
                {icon}
              </span>
            ) : null}
            {title ? (
              <h3 className="text-base font-semibold text-text">{title}</h3>
            ) : null}
          </div>
          {meta ? <MonoMeta className="text-right">{meta}</MonoMeta> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
