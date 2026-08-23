"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { INSTALL_CMD } from "@/lib/site";

/** Copy-to-clipboard install command chip. Shared by hero and exit act. */
export function InstallChip({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copyInstall = () => {
    navigator.clipboard
      ?.writeText(INSTALL_CMD)
      .then(() => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch((err: unknown) => console.error("copy failed", err));
  };

  return (
    <button
      type="button"
      onClick={copyInstall}
      aria-live="polite"
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-line bg-seafloor/60 px-5 py-2.5 font-mono text-xs text-mist transition-colors duration-300 hover:border-biolume/40 hover:text-foam",
        className,
      )}
    >
      <span>
        <span className="text-biolume">$</span> {INSTALL_CMD}
      </span>
      <span
        className={cn(
          "transition-colors duration-200",
          copied ? "text-biolume" : "text-deep group-hover:text-mist",
        )}
      >
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
