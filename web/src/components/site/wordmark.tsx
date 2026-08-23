import { cn } from "@/lib/cn";

type WordmarkProps = {
  size?: number;
  className?: string;
};

/** Triangle-graph mark + display wordmark. Edges draw in on group hover. */
export function Wordmark({ size = 28, className }: WordmarkProps) {
  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden
        focusable="false"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          pathLength={1}
          className="text-foam/70 [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out-quint group-hover:[stroke-dashoffset:0]"
        >
          <path d="M16 7 6 25h20z" />
        </g>
        <circle cx="16" cy="7" r="3" className="fill-biolume" />
        <circle cx="6" cy="25" r="2.2" className="fill-foam/80" />
        <circle cx="26" cy="25" r="2.2" className="fill-foam/80" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-foam">
        OpenZync
      </span>
    </span>
  );
}
