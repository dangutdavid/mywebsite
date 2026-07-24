import { describe, expect, it } from "vitest";
import { contactSchema, sanitiseForEmail } from "@/lib/contact";

describe("contact validation", () => {
  it("accepts a valid enquiry", () => {
    const result = contactSchema.safeParse({
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
    expect(result.success).toBe(true);
  });

  it("rejects honeypot spam and missing consent", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      organisation: "Spam",
      email: "bot@example.com",
      service: "Salesforce",
      summary: "This message is long enough to pass the summary validation.",
      timing: "Now",
      preferredContact: "Email",
      consent: false,
      website: "https://spam.test"
    });
    expect(result.success).toBe(false);
  });

  it("sanitises optional fields for email text", () => {
    const data = contactSchema.parse({
      name: "A User",
      organisation: "Org",
      email: "user@example.com",
      telephone: "",
      service: "Training",
      summary: "Please help with Salesforce training for a technical team.",
      timing: "Exploratory / not yet scheduled",
      budget: "",
      preferredContact: "Email",
      consent: true,
      website: ""
    });
    expect(sanitiseForEmail(data).telephone).toBe("Not provided");
  });
});

