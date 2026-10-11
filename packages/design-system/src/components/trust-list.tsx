import { cn } from "../cn";

export interface TrustListItem {
  label: string;
  detail: string;
  mono?: string;
}

export interface TrustListProps {
  items: TrustListItem[];
  className?: string;
}

export function TrustList({ items, className }: TrustListProps) {
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <span className="w-full shrink-0 font-mono text-sm text-text sm:w-48">
            {item.label}
          </span>
          <span className="flex-1 text-muted">{item.detail}</span>
          {item.mono ? (
            <span className="whitespace-nowrap font-mono text-sm text-signal-dim">
              {item.mono}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
