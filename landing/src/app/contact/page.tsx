import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { CtaSection } from "@/components/landing/cta-section";
import { ContactForm } from "@/components/landing/contact-form";
import { contactChannels, maintainers } from "@/content/contact";
import { MonoMeta, SectionShell } from "@openzync/design-system";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the OpenZync team — product questions, support, partnerships, press, and the maintainers behind the project.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  "We reply within two business days.",
  "Urgent or code-related? Open a GitHub issue for the fastest response.",
  "Found a security problem? Report it privately via a GitHub security advisory.",
];

/**
 * Contact page — two instrument columns: the form on the left, channels,
 * maintainers, and what-happens-next on the right. All form logic lives in
 * ContactForm; this page owns no state.
 */
export default function ContactPage() {
  const segments = buildBreadcrumbSegments("/contact");

  return (
    <>
      <section className="pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="tracking-[0.08em] mb-4 block">CONTACT — OPENZYNC</MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">
            Contact
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Questions, support, partnerships, or press — talk to the people who
            build OpenZync.
          </p>
        </div>
      </section>

      <SectionShell divider>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* ── Left: the form ─────────────────────────────────────────── */}
          <div>
            <MonoMeta className="tracking-[0.08em] mb-3 block">01 — MESSAGE</MonoMeta>
            <h2 className="font-display text-2xl font-medium text-text md:text-3xl">
              Send us a message.
            </h2>
            <div className="mt-8 rounded-xl border border-line bg-surface-900 p-6 md:p-8">
              <ContactForm />
            </div>
          </div>

          {/* ── Right: channels, maintainers, next steps ───────────────── */}
          <div className="space-y-16">
            <section aria-labelledby="channels-heading">
              <MonoMeta className="tracking-[0.08em] mb-3 block">02 — CHANNELS</MonoMeta>
              <h2
                id="channels-heading"
                className="font-display text-2xl font-medium text-text md:text-3xl"
              >
                Direct lines.
              </h2>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {contactChannels.map((channel) => {
                  const Icon = channel.icon;
                  const external = channel.external ?? false;
                  return (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="flex items-start gap-4 py-5 transition-colors hover:bg-panel-raised"
                      >
                        <Icon size={16} className="mt-0.5 shrink-0 text-signal-dim" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-text">{channel.label}</p>
                          <p className="mt-0.5 font-mono text-xs text-signal break-all">
                            {channel.value}
                          </p>
                          <p className="mt-1 text-sm text-muted">{channel.description}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section aria-labelledby="maintainers-heading">
              <MonoMeta className="tracking-[0.08em] mb-3 block">03 — MAINTAINERS</MonoMeta>
              <h2
                id="maintainers-heading"
                className="font-display text-2xl font-medium text-text md:text-3xl"
              >
                Who you&rsquo;ll reach.
              </h2>
              <ul className="mt-8 space-y-4">
                {maintainers.map((maintainer) => (
                  <li
                    key={maintainer.name}
                    className="rounded-xl border border-line bg-surface-900 p-6"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-panel-raised font-mono text-xs text-signal-dim"
                      >
                        {maintainer.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-text">{maintainer.name}</p>
                        <p className="text-sm text-muted">{maintainer.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin size={14} className="text-dim" aria-hidden="true" />
                      {maintainer.location}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      {maintainer.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${maintainer.name} on ${link.label}`}
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-panel-raised text-muted transition-colors hover:border-signal-dim hover:text-text"
                          >
                            <Icon size={16} />
                          </a>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="next-heading">
              <MonoMeta className="tracking-[0.08em] mb-3 block">04 — WHAT HAPPENS NEXT</MonoMeta>
              <h2
                id="next-heading"
                className="font-display text-2xl font-medium text-text md:text-3xl"
              >
                After you send.
              </h2>
              <ol className="mt-8 divide-y divide-line border-y border-line">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4 py-5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-6 shrink-0 font-mono text-xs text-dim"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </SectionShell>

      <CtaSection />
    </>
  );
}
