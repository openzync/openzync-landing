import { versionTimelines } from "@/content/version-support";

interface Tick {
  label: string;
  position: number;
}

/**
 * Compute quarterly timeline ticks as percentage positions
 * across the overall date range.
 */
function generateTicks(earliest: Date, latest: Date): Tick[] {
  const ticks: Tick[] = [];
  const totalMs = latest.getTime() - earliest.getTime();
  if (totalMs <= 0) return ticks;

  // Snap start to the beginning of the quarter
  const start = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  start.setMonth(Math.floor(start.getMonth() / 3) * 3);

  const cursor = new Date(start);
  while (cursor <= latest) {
    const position = ((cursor.getTime() - earliest.getTime()) / totalMs) * 100;
    const label = cursor.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    ticks.push({ label, position: Math.max(0, Math.min(100, position)) });
    cursor.setMonth(cursor.getMonth() + 3);
  }

  return ticks;
}

/**
 * What's Next section — version support timeline Gantt chart.
 *
 * Each row shows a single bar split into two segments:
 *   maintenance (brand) → security (amber).
 * Bar positions are computed as percentages of the total range.
 */
export function WhatsNext() {
  const timelines = versionTimelines;

  // Parse all dates and find the global range
  const parsed = timelines.map((t) => ({
    release: new Date(t.releaseDate),
    maintEnd: new Date(t.maintenanceEnd),
    secEnd: new Date(t.securityEnd),
  }));

  const earliestMs = Math.min(...parsed.map((d) => d.release.getTime()));
  const latestMs = Math.max(...parsed.map((d) => d.secEnd.getTime()));
  const totalMs = latestMs - earliestMs;

  const earliest = new Date(earliestMs);
  const latest = new Date(latestMs);
  const ticks = generateTicks(earliest, latest);

  if (totalMs <= 0 || timelines.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 border-t border-surface-800">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Heading ─────────────────────────────────────────── */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
          What&rsquo;s Next
        </h2>
        <p className="text-surface-400 text-center max-w-xl mx-auto mb-12">
          Version support timeline — each release receives maintenance updates
          followed by extended security patches.
        </p>

        {/* ── Chart card ──────────────────────────────────────── */}
        <div className="rounded-xl border border-surface-800 bg-surface-900 p-6 md:p-8 max-w-5xl mx-auto overflow-hidden">
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-surface-300">
              <span className="inline-flex items-center gap-2 rounded-lg border border-surface-700/50 bg-surface-900 px-3 py-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#14488C" }} />
                Maintenance Support
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-surface-700/50 bg-surface-900 px-3 py-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#6C7A8E" }} />
                Security Support
              </span>
          </div>

          {/* Chart */}
          <div>
            {/* Timeline header */}
            <div className="flex items-end mb-2">
              <div className="w-24 shrink-0" />
              <div className="flex-1 relative h-6">
                {ticks.map((tick, i) => (
                  <div
                    key={i}
                    className="absolute text-[11px] text-surface-500 -translate-x-1/2 font-medium"
                    style={{ left: `${tick.position}%` }}
                  >
                    {tick.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid + rows */}
            <div className="relative">
              {/* Vertical grid lines */}
              {ticks.map((tick, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-surface-800"
                  style={{ left: `${tick.position}%` }}
                />
              ))}

              {/* Version rows */}
              <div className="divide-y divide-surface-800">
                {timelines.map((t) => {
                  const r = new Date(t.releaseDate).getTime();
                  const m = new Date(t.maintenanceEnd).getTime();
                  const s = new Date(t.securityEnd).getTime();

                  const maintLeft = ((r - earliestMs) / totalMs) * 100;
                  const maintWidth = ((m - r) / totalMs) * 100;
                  const secLeft = ((m - earliestMs) / totalMs) * 100;
                  const secWidth = ((s - m) / totalMs) * 100;

                  return (
                    <div key={t.version} className="flex items-center h-14">
                      {/* Version label */}
                      <div className="w-24 shrink-0 pr-4">
                        <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-300 font-mono">
                          v{t.version}
                        </span>
                      </div>

                      {/* Bar row */}
                      <div className="flex-1 relative h-8">
                        {/* Maintenance segment */}
                        {maintWidth > 0 && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-5"
                            style={{
                              left: `${maintLeft}%`,
                              width: `${maintWidth}%`,
                              backgroundColor: "#14488C",
                              borderRadius: "0.375rem 0 0 0.375rem",
                            }}
                          />
                        )}

                        {/* Security segment */}
                        {secWidth > 0 && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-5"
                            style={{
                              left: `${secLeft}%`,
                              width: `${secWidth}%`,
                              backgroundColor: "#6C7A8E",
                              borderRadius:
                                maintWidth > 0
                                  ? "0 0.375rem 0.375rem 0"
                                  : "0.375rem",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
