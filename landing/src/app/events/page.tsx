import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { events, type EventItem } from "@/content/events";
import { CtaSection } from "@/components/landing/cta-section";
import { MonoMeta, SectionShell } from "@openzync/design-system";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Join the OpenZync community at events around the world — conferences, sprints, online meetups, and more.",
  alternates: { canonical: "/events" },
};

/** Parse event start date, handling range format "Month Day–Day, Year" and single date. */
function parseStartDate(dateStr: string): Date {
  const start = dateStr.split("–")[0]?.trim() ?? dateStr;
  if (!/\d{4}/.test(start)) {
    const yearMatch = dateStr.match(/(\d{4})/);
    return new Date(`${start}, ${yearMatch?.[1] ?? new Date().getFullYear()}`);
  }
  return new Date(start);
}

/** Compute the mono date column parts for an event. */
function eventDateParts(event: EventItem): { month: string; day: string; year: string } {
  const d = parseStartDate(event.date);
  if (isNaN(d.getTime())) return { month: "", day: "", year: "" };
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  };
}

/**
 * One event as a bordered instrument row. Past rows drop the row opacity
 * (opacity-60 faded text-muted to ~2.9:1); the title and day render in
 * text-muted instead and the month in text-dim, so the row still reads as
 * archived at full contrast.
 */
function EventRow({ event, past }: { event: EventItem; past: boolean }) {
  const { month, day, year } = eventDateParts(event);
  const isUpcoming = !past;

  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-6 rounded-xl border border-line bg-surface-900 p-6 transition-colors hover:border-signal-dim"
    >
      <div aria-hidden="true" className="w-16 shrink-0 font-mono">
        <p className={past ? "text-xs text-dim" : "text-xs text-signal-dim"}>{month}</p>
        <p
          className={
            past
              ? "text-2xl font-medium tabular-nums text-muted"
              : "text-2xl font-medium tabular-nums text-text"
          }
        >
          {day}
        </p>
        <p className="text-xs text-dim">{year}</p>
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className={
            past
              ? "text-base font-semibold text-muted"
              : "text-base font-semibold text-text"
          }
        >
          {event.title}
        </h3>
        <MonoMeta className="mt-1 block">{event.date}</MonoMeta>
        <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
        {isUpcoming ? (
          <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-signal">
            Learn more <ExternalLink size={12} aria-hidden="true" />
          </span>
        ) : null}
      </div>
    </a>
  );
}

/**
 * Events page — upcoming vs past as two bordered row lists. The upcoming/
 * past split is computed at request time from the parsed dates; past rows
 * keep their dimmed affordance.
 */
export default function EventsPage() {
  const segments = buildBreadcrumbSegments("/events");

  const now = new Date();
  const upcoming = events.filter((e) => {
    const d = parseStartDate(e.date);
    return d >= now || isNaN(d.getTime());
  });
  const past = events.filter((e) => {
    const d = parseStartDate(e.date);
    return d < now && !isNaN(d.getTime());
  });

  return (
    <>
      <section className="pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="tracking-[0.08em] mb-4 block">COMMUNITY — EVENTS</MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">
            Community events
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Meet the OpenZync community at events around the world. From
            conferences to online sprints — there&rsquo;s a place for everyone.
          </p>
        </div>
      </section>

      <SectionShell divider container="none">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl font-medium text-text md:text-3xl">
              Upcoming
            </h2>
            <MonoMeta className="tracking-[0.08em]">{String(upcoming.length).padStart(2, "0")} SCHEDULED</MonoMeta>
          </div>
          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-line bg-surface-900 p-10 text-center">
              <p className="text-lg text-text">No upcoming events right now.</p>
              <p className="mt-2 text-sm text-muted">
                Check back soon or{" "}
                <a href="mailto:hello@openzync.tech" className="text-signal transition-colors hover:text-signal-dim">
                  get in touch
                </a>{" "}
                to host your own.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {upcoming.map((event) => (
                <EventRow key={event.title} event={event} past={false} />
              ))}
            </div>
          )}
        </div>
      </SectionShell>

      {past.length > 0 ? (
        <SectionShell divider container="none">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h2 className="font-display text-2xl font-medium text-text md:text-3xl">
                Past
              </h2>
              <MonoMeta className="tracking-[0.08em]">{String(past.length).padStart(2, "0")} ARCHIVED</MonoMeta>
            </div>
            <div className="mt-6 space-y-4">
              {past.map((event) => (
                <EventRow key={event.title} event={event} past />
              ))}
            </div>
          </div>
        </SectionShell>
      ) : null}

      <SectionShell divider>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <MonoMeta className="tracking-[0.08em] mb-3 block">HOST — YOUR OWN</MonoMeta>
            <h2 className="font-display text-2xl font-medium text-text md:text-3xl">
              Host your own event.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Whether it&rsquo;s a meetup, workshop, or conference — we&rsquo;d
              love to support your community event. Reach out and we&rsquo;ll
              help promote it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="mailto:hello@openzync.tech"
              className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
            >
              Get in touch <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-text"
            >
              Read about past events on our blog <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </SectionShell>

      <CtaSection />
    </>
  );
}
