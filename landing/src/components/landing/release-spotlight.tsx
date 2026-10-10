import { ArrowDown } from "lucide-react";
import { Badge, Button } from "@openzync/design-system";
import { latestRelease } from "@/content/releases";

/**
 * Release spotlight section — latest version highlight
 * with version badge + heading + install terminal + description + CTA.
 */
export function ReleaseSpotlight() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Version badge + heading */}
          <div className="mb-4">
            <Badge variant="brand" showDot={false}>v{latestRelease.version}</Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-text-primary mb-3">
            {latestRelease.title}
          </h2>

          {/* Description */}
          <p className="text-surface-400 leading-relaxed max-w-xl mx-auto mb-8">
            {latestRelease.description}
          </p>

          {/* Download CTA */}
          <a
            href={latestRelease.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" icon={<ArrowDown size={18} />} className="active:scale-[0.97] transition-transform duration-100">
              Download the latest version
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
