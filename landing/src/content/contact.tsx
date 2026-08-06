// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Contact Data
// ═══════════════════════════════════════════════════════════════════════════════

import type { ComponentType } from "react";
import { Mail, GitFork, BookOpen } from "lucide-react";
import { LinkedInIcon } from "@/components/landing/brand-icons";

export interface ContactChannel {
  label: string;
  value: string;
  description: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  external?: boolean;
}

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: "hello@openzync.tech",
    description: "Replies within two business days.",
    href: "mailto:hello@openzync.tech",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/openzync/openzync-core",
    description: "File issues or join discussions.",
    href: "https://github.com/openzync/openzync-core",
    icon: GitFork,
    external: true,
  },
  {
    label: "Documentation",
    value: "docs.openzync.tech",
    description: "API reference and guides.",
    href: "https://docs.openzync.tech/en/latest/",
    icon: BookOpen,
    external: true,
  },
];

export const contactTopics = [
  "Product question",
  "Support",
  "Sales & enterprise",
  "Partnership",
  "Press",
  "Other",
] as const;

export interface MaintainerLink {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export interface Maintainer {
  initials: string;
  name: string;
  role: string;
  location: string;
  links: MaintainerLink[];
}

export const maintainers: Maintainer[] = [
  {
    initials: "RS",
    name: "Rohan Shaw",
    role: "AI Engineer @TheLinkAI",
    location: "Kolkata, India",
    links: [
      { label: "Email", href: "mailto:rohnsha0@gmail.com", icon: Mail },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/rohnsha0/",
        icon: LinkedInIcon,
      },
      { label: "GitHub", href: "https://github.com/rohnsha0/", icon: GitFork },
    ],
  },
  {
    initials: "NP",
    name: "Nikita Prasad",
    role: "AI Engineer @TheLinkAI",
    location: "Kolkata, India",
    //  no email on file — omit the link entirely, do not render a placeholder
    links: [
      { label: "GitHub", href: "https://github.com/Nikita2812/", icon: GitFork },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nikita-prasad2812/",
        icon: LinkedInIcon,
      },
    ],
  },
];
