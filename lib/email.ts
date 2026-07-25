import type { ContactInput } from "@/lib/contact";
import { sanitiseForEmail } from "@/lib/contact";

export type EmailResult = {
  ok: boolean;
  mode: "development" | "resend";
  message: string;
};

type ResendResponse = {
  id?: string;
  message?: string;
  name?: string;
  error?: string;
};

export async function sendContactEmail(input: ContactInput): Promise<EmailResult> {
  const provider = process.env.CONTACT_EMAIL_PROVIDER || "development";
  const to = process.env.CONTACT_TO_EMAIL || "dangutdavid@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "SkyDive Leads <onboarding@resend.dev>";
  const key = process.env.RESEND_API_KEY || process.env.CONTACT_PROVIDER_API_KEY;
  const safe = sanitiseForEmail(input);

  if (provider === "development") {
    console.info("Development contact submission", safe);
    return {
      ok: true,
      mode: "development",
      message: "Submission captured in development mode. Configure an email provider before launch."
    };
  }

  if (provider !== "resend") {
    return {
      ok: false,
      mode: "resend",
      message: "Unknown email provider. Set CONTACT_EMAIL_PROVIDER to development or resend."
    };
  }

  if (!to || !from || !key) {
    return {
      ok: false,
      mode: "resend",
      message: "Email notification is configured but required Resend settings are missing."
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: safe.email,
      subject: `New SkyDive lead: ${safe.organisation} / ${safe.service}`,
      text: buildLeadEmailText(safe),
      html: buildLeadEmailHtml(safe)
    })
  });
  const data = (await response.json().catch(() => ({}))) as ResendResponse;

  if (!response.ok) {
    console.error("Resend email failed", data);
    return {
      ok: false,
      mode: "resend",
      message: "The enquiry was saved, but the notification email could not be sent."
    };
  }

  return {
    ok: true,
    mode: "resend",
    message: "Thank you. Your enquiry has been received."
  };
}

type SafeContact = ReturnType<typeof sanitiseForEmail>;

export function buildLeadEmailText(safe: SafeContact) {
  return [
    "New SkyDive website enquiry",
    "",
    `Name: ${safe.name}`,
    `Organisation: ${safe.organisation}`,
    `Email: ${safe.email}`,
    `Telephone: ${safe.telephone}`,
    `Service: ${safe.service}`,
    `Timing: ${safe.timing}`,
    `Budget: ${safe.budget}`,
    `Preferred contact: ${safe.preferredContact}`,
    "",
    "Project summary:",
    safe.summary
  ].join("\n");
}

export function buildLeadEmailHtml(safe: SafeContact) {
  const rows = [
    ["Name", safe.name],
    ["Organisation", safe.organisation],
    ["Email", safe.email],
    ["Telephone", safe.telephone],
    ["Service", safe.service],
    ["Timing", safe.timing],
    ["Budget", safe.budget],
    ["Preferred contact", safe.preferredContact]
  ];

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#102235;line-height:1.55">
      <h1 style="font-size:22px;margin:0 0 16px">New SkyDive website enquiry</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="border:1px solid #d8e3df;background:#f8fbfa;padding:10px 12px;text-align:left;width:180px">${escapeHtml(label)}</th>
                <td style="border:1px solid #d8e3df;padding:10px 12px">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h2 style="font-size:16px;margin:22px 0 8px">Project summary</h2>
      <p style="white-space:pre-line;border:1px solid #d8e3df;background:#f8fbfa;padding:12px;max-width:680px">${escapeHtml(safe.summary)}</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
