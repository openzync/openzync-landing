import { cn } from "../cn";

export interface MonoMetaProps {
  children: React.ReactNode;
  className?: string;
}

export function MonoMeta({ children, className }: MonoMetaProps) {
  return (
    <span className={cn("font-mono text-xs text-dim", className)}>
      {children}
    </span>
  );
}
