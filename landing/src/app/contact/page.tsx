import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { CtaSection } from "@/components/landing/cta-section";
import { ContactForm } from "@/components/landing/contact-form";
import { contactChannels, maintainers } from "@/content/contact";

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

export default function ContactPage() {
  const segments = buildBreadcrumbSegments("/contact");

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs segments={segments} />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contact
          </h1>
          <p className="text-surface-400 text-lg">
            Questions, support, partnerships, or press — talk to the people who
            build OpenZync.
          </p>
        </div>
      </section>

      {/* Channel cards */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              const external = channel.external ?? false;
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="card-base bg-surface-900 p-6 flex flex-col gap-4 transition-colors hover:border-brand-500/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/10">
                    <Icon size={22} className="text-brand-300" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-text-primary mb-1">
                      {channel.label}
                    </h2>
                    <p className="text-sm text-brand-300 mb-1 break-all">
                      {channel.value}
                    </p>
                    <p className="text-sm text-surface-400">{channel.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maintainers */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Maintainers</h2>
          <p className="text-surface-400 text-lg mb-8">
            Builders and maintainers behind the project.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {maintainers.map((maintainer) => (
              <div key={maintainer.name} className="card-base bg-surface-900 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-800 text-sm font-bold text-text-primary">
                    {maintainer.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{maintainer.name}</p>
                    <p className="text-sm text-surface-400">{maintainer.role}</p>
                  </div>
                </div>
                <p className="text-sm text-surface-400 flex items-center gap-1.5 mb-4">
                  <MapPin size={14} className="text-surface-500" />
                  {maintainer.location}
                </p>
                <div className="flex items-center gap-2">
                  {maintainer.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${maintainer.name} on ${link.label}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-800 text-surface-400 transition-colors hover:text-brand-300 hover:bg-surface-700"
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Send us a message</h2>
          <div className="card-base bg-surface-900 p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-8">What happens next</h2>
          <ol className="space-y-4">
            {nextSteps.map((step, i) => (
              <li key={step} className="card-base bg-surface-900 p-6 flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-300">
                  {i + 1}
                </span>
                <p className="text-sm text-surface-400 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
