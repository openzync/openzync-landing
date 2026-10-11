import { cn } from "../cn";

export interface DataGridProps {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export interface DataGridCellProps {
  children: React.ReactNode;
  className?: string;
}

const COL_CLASSES: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

// Children MUST be wrapped in <DataGrid.Cell> — the gap-px bg-line instrument
// grid only looks right when every cell paints its own surface.
export function DataGrid({ cols = 3, children, className }: DataGridProps) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-line bg-line",
        COL_CLASSES[cols],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DataGridCell({ children, className }: DataGridCellProps) {
  return (
    <div className={cn("bg-surface-900 p-6", className)}>{children}</div>
  );
}

DataGrid.Cell = DataGridCell;
