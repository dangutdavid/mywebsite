import { LegalNotice } from "@/components/legal-layout";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of use",
  description: "Terms of use for the SkyDive website.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <LegalNotice
      title="Terms of use"
      description={`Terms for using the ${site.shortName} website.`}
      items={[
        `This website provides general information about ${site.name} and ${site.personName}.`,
        "Website content is not legal, financial or professional advice for a specific project unless agreed in writing.",
        "Case-study, certification and company details should be reviewed before publication and updated when facts change.",
        "No project engagement is formed by browsing the website or submitting an enquiry form.",
        "A final legal review is required before production launch."
      ]}
    />
  );
}
