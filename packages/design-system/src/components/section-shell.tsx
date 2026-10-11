import { cn } from "../cn";

/**
 * The section seam — the single vertical padding shared by every section.
 * Consumed as a style value, not a utility class: Tailwind v4 scans raw
 * source text, so `py-[${SECTION_SEAM}]` would never emit a CSS rule.
 */
export const SECTION_SEAM = "clamp(72px,10vw,140px)";

export interface SectionShellProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  divider?: boolean;
  container?: "default" | "wide" | "none";
}

export function SectionShell({
  children,
  id,
  className,
  divider = false,
  container = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      style={{ paddingBlock: SECTION_SEAM }}
      className={cn(divider && "border-t border-line")}
    >
      {container === "none" ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto px-6",
            container === "wide" ? "max-w-7xl" : "max-w-6xl",
            className,
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
