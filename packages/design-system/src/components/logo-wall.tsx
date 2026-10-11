import { cn } from "../cn";
import "./marquee.css";

export interface LogoWallItem {
  name: string;
  href?: string;
  mono?: boolean;
}

export interface LogoWallProps {
  items: LogoWallItem[];
  speed?: number;
  className?: string;
}

function renderItem(item: LogoWallItem) {
  const content = (
    <span
      className={cn(
        "text-sm text-muted",
        item.mono ? "font-mono" : "font-sans",
      )}
    >
      {item.name}
    </span>
  );
  if (!item.href) return content;
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener"
      className="transition-colors hover:text-text"
    >
      {content}
    </a>
  );
}

export function LogoWall({ items, speed = 32, className }: LogoWallProps) {
  return (
    <div className={cn("logo-wall-viewport", className)}>
      <div
        className="logo-wall-track"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <div className="logo-wall-group">
          {items.map((item) => (
            <span key={item.name}>{renderItem(item)}</span>
          ))}
        </div>
        <div className="logo-wall-group" aria-hidden="true">
          {items.map((item) => (
            <span key={item.name}>{renderItem(item)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
