"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/events";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  onToggle?: (question: string, isOpen: boolean) => void;
}

/**
 * FAQ accordion rendered as instrument rows: hairline dividers instead of
 * per-item cards, a mono index per question, signal-dim chevron. Disclosure
 * behavior is unchanged — one item open at a time, native button semantics
 * (click + keyboard), single-open state, analytics on open.
 */
export function Accordion({ items, onToggle }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-muted">
        No FAQ entries yet.
      </p>
    );
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => {
                const nextOpen = isOpen ? null : i;
                setOpenIndex(nextOpen);
                if (nextOpen !== null) {
                  trackEvent("faq_interaction", { faq_question: item.question });
                }
                onToggle?.(item.question, nextOpen === i);
              }}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              className="flex w-full items-center gap-4 py-5 text-left"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 font-mono text-xs text-dim"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-medium text-text">
                {item.question}
              </span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={cn(
                  "shrink-0 text-signal-dim transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div id={`faq-answer-${i}`} className="pb-5 pl-12 pr-8">
                <p className="text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
