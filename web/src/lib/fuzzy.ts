export type PaletteEntry = {
  id: string;
  label: string;
  hint: string;
  href?: string;
  run?: () => void;
};

/**
 * Subsequence match score. Lower is better (earlier match); -1 means no match.
 * Contiguous characters are free, each gap costs the skipped distance.
 */
export function fuzzyScore(query: string, text: string): number {
  if (!query) return 0;
  const haystack = text.toLowerCase();
  let from = 0;
  let score = 0;
  for (const ch of query.toLowerCase()) {
    const idx = haystack.indexOf(ch, from);
    if (idx === -1) return -1;
    score += idx - from;
    from = idx + 1;
  }
  return score;
}

/** Filter entries by query against label and hint, best match first. */
export function filterEntries(
  query: string,
  entries: PaletteEntry[],
): PaletteEntry[] {
  const q = query.trim();
  if (!q) return entries;
  const scored: { entry: PaletteEntry; score: number }[] = [];
  for (const entry of entries) {
    const byLabel = fuzzyScore(q, entry.label);
    const byHint = fuzzyScore(q, entry.hint);
    const score =
      byLabel === -1 ? byHint : byHint === -1 ? byLabel : Math.min(byLabel, byHint);
    if (score !== -1) scored.push({ entry, score });
  }
  return scored.sort((a, b) => a.score - b.score).map((s) => s.entry);
}
