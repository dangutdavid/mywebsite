import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { contactSchema } from "@/lib/contact";
import { isDatabaseConfigured } from "@/lib/database";
import { saveLead } from "@/lib/leads";

describe("lead capture", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reports disabled mode when DATABASE_URL is not configured", async () => {
    vi.stubEnv("DATABASE_URL", "");
    const input = contactSchema.parse({
      name: "Maren Dangut",
      organisation: "Example Ltd",
      email: "maren@example.com",
      telephone: "",
      service: "Salesforce engineering and architecture",
      summary: "We need a review of our Salesforce architecture and integration approach.",
      timing: "Within 1-3 months",
      budget: "",
      preferredContact: "Email",
      consent: true,
      website: ""
    });
    const request = new NextRequest("http://127.0.0.1:3002/contact");

    await expect(saveLead(input, request)).resolves.toMatchObject({
      ok: true,
      mode: "disabled"
    });
  });

  it("detects when a database URL is configured", () => {
    vi.stubEnv("DATABASE_URL", "postgres://skydive:password@127.0.0.1:5434/skydive");

    expect(isDatabaseConfigured()).toBe(true);
  });
});

