import { describe, it, expect } from "vitest";
import { siteConfig, navItems, breadcrumbLabels, footerLinks, footerSocialLinks } from "@/content/site-config";
import { features, categories } from "@/content/features";
import { statsData } from "@/content/stats";
import { faqItems } from "@/content/faq";
import { events } from "@/content/events";
import { latestRelease } from "@/content/releases";
import { audienceTabs } from "@/content/audience-tabs";
import { versionTimelines } from "@/content/version-support";
import { caseStudies } from "@/content/case-studies";
import { blogCategories } from "@/content/blog";

describe("site-config.ts", () => {
  it("has required siteConfig fields", () => {
    expect(siteConfig.name).toBe("OpenZync");
    expect(siteConfig.url).toBe("https://openzync.tech");
    expect(siteConfig.links.github).toContain("github.com");
  });

  it("navItems has the expected top-level labels", () => {
    const labels = navItems.map((n) => n.label);
    expect(labels).toContain("Why OpenZync");
    expect(labels).toContain("Get Started");
    expect(labels).toContain("News & Updates");
    expect(labels).toContain("Company");
  });

  it("every navItem with children has valid href or children", () => {
    for (const item of navItems) {
      if (item.children) {
        for (const child of item.children) {
          expect(child.href).toBeTruthy();
          expect(child.label).toBeTruthy();
        }
      }
    }
  });

  it("breadcrumbLabels maps known paths", () => {
    expect(breadcrumbLabels["/"]).toBe("Home");
    expect(breadcrumbLabels["/blog"]).toBe("Blog");
    expect(breadcrumbLabels["/features"]).toBe("Features");
    expect(breadcrumbLabels["/faq"]).toBe("FAQ");
  });

  it("footerLinks has expected sections", () => {
    expect(footerLinks.product.length).toBeGreaterThan(0);
    expect(footerLinks.company.length).toBeGreaterThan(0);
    expect(footerLinks.legal.length).toBeGreaterThan(0);
    expect(footerLinks.updates.length).toBeGreaterThan(0);
  });

  it("footerSocialLinks has GitHub and LinkedIn", () => {
    const labels = footerSocialLinks.map((s) => s.label);
    expect(labels).toContain("GitHub");
    expect(labels).toContain("LinkedIn");
  });
});

describe("features.ts", () => {
  it("has 11 features", () => {
    expect(features).toHaveLength(11);
  });

  it("every feature has required fields", () => {
    for (const f of features) {
      expect(f.title).toBeTruthy();
      expect(f.description).toBeTruthy();
      expect(f.icon).toBeTruthy();
      expect(["graph", "memory", "llm", "tools", "observability"]).toContain(
        f.category,
      );
    }
  });

  it("categories match feature categories", () => {
    const categoryKeys = categories.map((c) => c.key);
    const featureCategories = [...new Set(features.map((f) => f.category))];
    for (const cat of featureCategories) {
      expect(categoryKeys).toContain(cat);
    }
  });
});

describe("stats.ts", () => {
  it("has 4 stat items", () => {
    expect(statsData).toHaveLength(4);
  });

  it("every stat has value, label, description", () => {
    for (const s of statsData) {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
      expect(s.description).toBeTruthy();
    }
  });
});

describe("faq.ts", () => {
  it("has FAQ items with questions and answers", () => {
    expect(faqItems.length).toBeGreaterThan(0);
    for (const item of faqItems) {
      expect(item.question).toBeTruthy();
      expect(item.answer).toBeTruthy();
      expect(item.question).toContain("?");
    }
  });

  it("covers key topics", () => {
    const questions = faqItems.map((f) => f.question);
    expect(questions.some((q) => q.includes("OpenZync"))).toBe(true);
    expect(questions.some((q) => q.includes("open source"))).toBe(true);
    expect(questions.some((q) => q.includes("self-host"))).toBe(true);
  });
});

describe("events.ts", () => {
  it("exports events array", () => {
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it("every event has title, date, description, href", () => {
    for (const e of events) {
      expect(e.title).toBeTruthy();
      expect(e.date).toBeTruthy();
      expect(e.description).toBeTruthy();
      expect(e.href).toBeTruthy();
    }
  });
});

describe("releases.ts", () => {
  it("latestRelease has all required fields", () => {
    expect(latestRelease.version).toBeTruthy();
    expect(latestRelease.title).toBeTruthy();
    expect(latestRelease.date).toBeTruthy();
    expect(latestRelease.description).toBeTruthy();
    expect(latestRelease.downloadUrl).toBeTruthy();
  });
});

describe("audience-tabs.ts", () => {
  it("has 3 audience tabs", () => {
    expect(audienceTabs).toHaveLength(3);
  });

  it("each tab has label, heading, description and links", () => {
    for (const tab of audienceTabs) {
      expect(tab.label).toBeTruthy();
      expect(tab.heading).toBeTruthy();
      expect(tab.description).toBeTruthy();
      expect(tab.links.length).toBeGreaterThan(0);
    }
  });
});

describe("version-support.ts", () => {
  it("has version timelines", () => {
    expect(versionTimelines.length).toBeGreaterThan(0);
  });

  it("each timeline has version, releaseDate, maintenanceEnd, securityEnd", () => {
    for (const t of versionTimelines) {
      expect(t.version).toBeTruthy();
      expect(t.releaseDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(t.maintenanceEnd).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(t.securityEnd).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("case-studies.ts", () => {
  it("has 7 case studies", () => {
    expect(caseStudies).toHaveLength(7);
  });

  it("each case study has required fields", () => {
    for (const cs of caseStudies) {
      expect(cs.title).toBeTruthy();
      expect(cs.slug).toBeTruthy();
      expect(cs.excerpt).toBeTruthy();
      expect(cs.overview).toBeTruthy();
      expect(cs.challenge).toBeTruthy();
      expect(cs.solution).toBeTruthy();
      expect(cs.takeaways.length).toBeGreaterThan(0);
    }
  });
});

describe("blog.ts categories", () => {
  it("has 4 blog categories", () => {
    expect(blogCategories).toHaveLength(4);
  });

  it("each category has key and label", () => {
    const validKeys = ["engineering", "community", "releases", "tutorials"];
    for (const cat of blogCategories) {
      expect(validKeys).toContain(cat.key);
      expect(cat.label).toBeTruthy();
    }
  });
});
