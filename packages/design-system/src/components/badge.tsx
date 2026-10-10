import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../cn";

// ─── Variants ─────────────────────────────────────────────────────────────────
// success = signal, warning = amber, error = red, info = signal-dim,
// brand = signal. Matches the dashboard's Badge exactly.

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-surface-700 text-surface-300",
        success: "bg-signal/10 text-signal",
        warning: "bg-amber/10 text-amber",
        error: "bg-error/10 text-error",
        info: "bg-signal-dim/10 text-signal-dim",
        brand: "bg-signal/10 text-signal",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        md: "text-xs px-2 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Live status — dot pulses (opacity 1→0.25). Static otherwise. */
  live?: boolean;
  /** Status dot before the label. Default true; set false for label-only
   *  badges (e.g. version pills) — live is then ignored: no dot, no pulse. */
  showDot?: boolean;
}

const dotColor: Record<string, string> = {
  default: "bg-muted",
  success: "bg-signal",
  warning: "bg-amber",
  error: "bg-error",
  info: "bg-signal-dim",
  brand: "bg-signal",
};

// note: StatusBadge / ActorTypeBadge intentionally not mirrored —
// dashboard-only helpers (HTTP codes, audit actor types) with no
// marketing-site callers.

export function Badge({
  className,
  variant = "default",
  size,
  live = false,
  showDot = true,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {/* Status is never color-alone — dot + text. Dot pulses only when live.
          showDot={false} with live: no dot and no pulse — live has nothing to animate. */}
      {showDot && (
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            dotColor[variant ?? "default"],
            live && "animate-pulse-dot",
          )}
        />
      )}
      {children}
    </span>
  );
}
