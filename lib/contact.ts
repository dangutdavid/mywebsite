import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  organisation: z.string().trim().min(2, "Enter your organisation."),
  email: z.string().trim().email("Enter a valid work email address."),
  telephone: z.string().trim().max(40, "Use a shorter telephone number.").optional().or(z.literal("")),
  service: z.string().trim().min(1, "Choose a service area."),
  summary: z.string().trim().min(20, "Please include at least 20 characters about the enquiry."),
  timing: z.string().trim().min(1, "Choose a desired timing."),
  budget: z.string().trim().optional().or(z.literal("")),
  preferredContact: z.string().trim().min(1, "Choose a preferred contact method."),
  consent: z.boolean().refine((value) => value, {
    message: "Confirm that SkyDive may use these details to respond."
  }),
  website: z.string().max(0, "Spam protection rejected this submission.").optional().or(z.literal("")),
  turnstileToken: z.string().trim().optional().or(z.literal(""))
});

export type ContactInput = z.infer<typeof contactSchema>;

export function sanitiseForEmail(input: ContactInput) {
  return {
    name: input.name,
    organisation: input.organisation,
    email: input.email,
    telephone: input.telephone || "Not provided",
    service: input.service,
    summary: input.summary,
    timing: input.timing,
    budget: input.budget || "Not provided",
    preferredContact: input.preferredContact
  };
}

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string) {
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 60000);
  const maxHits = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((value) => now - value < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length <= maxHits;
}
