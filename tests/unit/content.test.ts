import { describe, expect, it } from "vitest";
import {
  articles,
  caseStudies,
  certifications,
  engagementSteps,
  publicProfiles,
  researchHighlights,
  services,
  site
} from "@/content/site";

describe("structured content", () => {
  it("contains the PRD service families", () => {
    expect(services).toHaveLength(5);
    expect(services.map((service) => service.slug)).toContain("salesforce-engineering-and-architecture");
    expect(services.every((service) => service.summary.length > 40)).toBe(true);
  });

  it("marks incomplete case studies for review", () => {
    expect(caseStudies.every((study) => study.status === "needsReview")).toBe(true);
    expect(caseStudies.map((study) => study.result).join(" ")).not.toMatch(/\d+%|£|saved/i);
  });

  it("keeps sensitive private facts out of public content", () => {
    const publicContent = JSON.stringify({
      site,
      services,
      caseStudies,
      certifications,
      articles,
      publicProfiles,
      researchHighlights,
      engagementSteps
    });
    expect(publicContent).not.toMatch(/1985|UTR|tax reference|Indefinite Leave|passport/i);
  });

  it("tracks public profile and research evidence", () => {
    expect(publicProfiles.length).toBeGreaterThanOrEqual(4);
    expect(researchHighlights.length).toBeGreaterThanOrEqual(3);
    expect(publicProfiles.every((profile) => profile.href.startsWith("https://"))).toBe(true);
    expect(researchHighlights.every((item) => item.href.startsWith("https://"))).toBe(true);
  });

  it("describes a complete engagement model", () => {
    expect(engagementSteps).toHaveLength(4);
    expect(engagementSteps.every((step) => step.title.length > 6 && step.description.length > 40)).toBe(true);
  });
});
