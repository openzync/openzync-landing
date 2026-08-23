"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { filterEntries, type PaletteEntry } from "@/lib/fuzzy";
import { cn } from "@/lib/cn";
import { GITHUB_URL, INSTALL_CMD, NAV_LINKS } from "@/lib/site";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const entries: PaletteEntry[] = useMemo(
    () => [
      { id: "home", label: "Home", hint: "landing page", href: "/" },
      ...NAV_LINKS.map((l) => ({
        id: l.href,
        label: l.label,
        hint: `go to ${l.label.toLowerCase()}`,
        href: l.href,
      })),
      {
        id: "copy-install",
        label: "Copy install command",
        hint: "pip terminal cli",
        run: () => void navigator.clipboard?.writeText(INSTALL_CMD),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "source repository",
        run: () => window.open(GITHUB_URL, "_blank", "noopener"),
      },
    ],
    [],
  );

  const results = useMemo(() => filterEntries(query, entries), [query, entries]);

  useEffect(() => setActiveIdx(0), [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    inputRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector('[aria-selected="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const select = (entry: PaletteEntry) => {
    onClose();
    if (entry.href) router.push(entry.href);
    else entry.run?.();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "Tab") {
      // Single tabbable element (input); keep focus trapped inside the dialog.
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[activeIdx];
      if (entry) select(entry);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-void/70 pt-[15vh] backdrop-blur-xs"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-seafloor shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search…"
              aria-label="Search commands"
              role="combobox"
              aria-expanded
              aria-controls="palette-listbox"
              aria-activedescendant={
                results[activeIdx] ? `palette-opt-${results[activeIdx].id}` : undefined
              }
              className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-foam outline-none placeholder:text-deep"
            />
            <ul
              id="palette-listbox"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="max-h-80 overflow-y-auto p-2"
            >
              {results.map((entry, i) => (
                <li
                  key={entry.id}
                  id={`palette-opt-${entry.id}`}
                  role="option"
                  aria-selected={i === activeIdx}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(entry)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm",
                    i === activeIdx ? "bg-trench text-foam" : "text-mist",
                  )}
                >
                  <span>{entry.label}</span>
                  <span className="font-mono text-[11px] text-deep">
                    {entry.hint}
                  </span>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-deep" aria-live="polite">
                  No matching commands
                </li>
              )}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-deep">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
