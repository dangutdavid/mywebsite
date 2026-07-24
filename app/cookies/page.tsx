import { LegalNotice } from "@/components/legal-layout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cookie notice",
  description: "Cookie information for the SkyDive website.",
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <LegalNotice
      title="Cookie notice"
      description="Cookie information for the current SkyDive website MVP."
      items={[
        "The MVP does not load non-essential analytics cookies by default.",
        "If analytics, embedded booking tools or marketing pixels are enabled before launch, cookie controls and provider-specific wording must be added before those scripts run.",
        "Analytics should remain privacy-conscious and should not receive contact-form message content.",
        "A final cookie review is required before production launch."
      ]}
    />
  );
}
