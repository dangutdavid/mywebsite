import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { certifications } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Certifications",
  description: "Selected Salesforce certifications listed in the supplied CV, subject to launch verification.",
  path: "/certifications"
});

export default function CertificationsPage() {
  return (
    <>
      <CompactHero
        eyebrow="Credentials"
        title="Certifications"
        copy="The supplied CV lists 12 active Salesforce certifications. Status should be verified immediately before publication."
        tone="brand"
      />
      <CompactBand title="Salesforce certifications" columns="md:grid-cols-[0.85fr_repeat(3,1fr)]">
        {certifications.map((certification) => (
          <CompactCell key={certification} title={certification} footer="Listed in supplied CV" />
        ))}
      </CompactBand>
    </>
  );
}
