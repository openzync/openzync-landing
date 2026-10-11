import { MonoMeta } from "@openzync/design-system";

/**
 * Section block for long-form legal pages (privacy, terms) in the
 * instrument-log style: mono section index, hairline row rule, Fraunces
 * H2, Plex Sans body. Copy is passed through untouched — this component
 * owns presentation only.
 */
export function LegalSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <MonoMeta className="mb-2 block">{index} &mdash;</MonoMeta>
      <h2 className="mb-4 font-display text-2xl font-medium text-text">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_li]:list-disc [&_strong]:text-text [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
