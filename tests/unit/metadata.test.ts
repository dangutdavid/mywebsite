import { describe, expect, it } from "vitest";
import { pageMetadata } from "@/lib/metadata";

describe("metadata", () => {
  it("generates page metadata with canonical URL", () => {
    const metadata = pageMetadata({ title: "Services", description: "Service page", path: "/services" });
    expect(metadata.title).toContain("Services");
    expect(metadata.alternates?.canonical).toContain("/services");
  });
});

