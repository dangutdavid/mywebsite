import { afterEach, describe, expect, it, vi } from "vitest";
import { buildLeadEmailHtml, buildLeadEmailText, sendContactEmail } from "@/lib/email";
import { contactSchema, sanitiseForEmail } from "@/lib/contact";

const input = contactSchema.parse({
  name: "Maren Dangut",
  organisation: "SkyDive <script>",
  email: "dangutdavid@gmail.com",
  telephone: "",
  service: "AI and data solutions",
  summary: "Please help with a Salesforce AI lead workflow.",
  timing: "Within 1-3 months",
  budget: "800",
  preferredContact: "Email",
  consent: true,
  website: ""
});

describe("lead notification email", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("builds a readable text email", () => {
    const text = buildLeadEmailText(sanitiseForEmail(input));

    expect(text).toContain("New SkyDive website enquiry");
    expect(text).toContain("dangutdavid@gmail.com");
    expect(text).toContain("AI and data solutions");
  });

  it("escapes HTML content", () => {
    const html = buildLeadEmailHtml(sanitiseForEmail(input));

    expect(html).toContain("SkyDive &lt;script&gt;");
    expect(html).not.toContain("SkyDive <script>");
  });

  it("uses development mode without external email calls", async () => {
    vi.stubEnv("CONTACT_EMAIL_PROVIDER", "development");

    await expect(sendContactEmail(input)).resolves.toMatchObject({
      ok: true,
      mode: "development"
    });
  });

  it("sends through Resend when configured", async () => {
    vi.stubEnv("CONTACT_EMAIL_PROVIDER", "resend");
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "dangutdavid@gmail.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "SkyDive Leads <onboarding@resend.dev>");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_123" })
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendContactEmail(input)).resolves.toMatchObject({
      ok: true,
      mode: "resend"
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-key" })
      })
    );
  });
});

