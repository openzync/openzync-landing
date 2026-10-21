import { cn } from "../cn";

/**
 * The section seam lives in the landing `section-seam` stylesheet class, not
 * here: a `style` prop would SSR as a nonce-less style attribute and be
 * dropped under the CSP style-src (see landing src/proxy.ts).
 */

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
      className={cn("section-seam", divider && "border-t border-line")}
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
