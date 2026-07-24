import { LegalNotice } from "@/components/legal-layout";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "Privacy information for SkyDive website enquiries.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <LegalNotice
      title="Privacy notice"
      description="Privacy information for visitors who submit an enquiry through the SkyDive website."
      items={[
        `${site.name} collects enquiry details only when a visitor submits the contact form.`,
        "The contact form asks for information needed to respond to the enquiry and does not require sensitive personal data.",
        "Form content is validated server-side and should not be sent to analytics providers.",
        "Newsletter or marketing consent must be collected separately and must not use pre-ticked boxes.",
        "A final legal review is required before production launch."
      ]}
    />
  );
}
