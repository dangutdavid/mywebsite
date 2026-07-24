import type { ContactInput } from "@/lib/contact";
import { sanitiseForEmail } from "@/lib/contact";

export type EmailResult = {
  ok: boolean;
  mode: "development" | "provider";
  message: string;
};

export async function sendContactEmail(input: ContactInput): Promise<EmailResult> {
  const provider = process.env.CONTACT_EMAIL_PROVIDER || "development";
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const key = process.env.CONTACT_PROVIDER_API_KEY;
  const safe = sanitiseForEmail(input);

  if (provider === "development") {
    console.info("Development contact submission", safe);
    return {
      ok: true,
      mode: "development",
      message: "Submission captured in development mode. Configure an email provider before launch."
    };
  }

  if (!to || !from || !key) {
    return {
      ok: false,
      mode: "provider",
      message: "Email provider is configured but required credentials are missing."
    };
  }

  return {
    ok: false,
    mode: "provider",
    message:
      "Provider adapter placeholder reached. Add the selected provider API call before production launch."
  };
}

