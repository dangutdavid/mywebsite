import { Button } from "@/components/button";
import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Company",
  description: "SkyDive Technologies and Consultancy Ltd company overview and operating model.",
  path: "/company"
});

export default function CompanyPage() {
  return (
    <>
      <CompactHero
        eyebrow="Company"
        title="Company overview"
        copy={`${site.name} is a UK technology consultancy focused on Salesforce engineering, AI-enabled workflows, data solutions, systems integration and technical delivery.`}
        tone="brand"
      >
        <Button href="/contact">Start a conversation</Button>
      </CompactHero>

      <CompactBand title="Operating model" columns="md:grid-cols-[1fr_repeat(3,1fr)]">
        <CompactCell
          title="Mission"
          copy="Help organisations design, build and improve connected digital services that are maintainable, secure and aligned to real operating needs."
        />
        <CompactCell
          title="Engagement routes"
          copy="Discovery, delivery, review, interim leadership, training or advisory engagements with clients and delivery partners."
        />
        <CompactCell
          title="Delivery principles"
          copy="Clear communication, evidence-backed claims, responsible use of data and practical governance across technical decisions."
        />
      </CompactBand>

      <CompactBand title="Legal identity" className="bg-white" columns="md:grid-cols-[1fr_repeat(2,1fr)]">
        <CompactCell title={site.name} copy={`Registered in ${site.jurisdiction}.`} />
        <CompactCell
          title={`Company number ${site.companyNumber}`}
          copy="Registered-office disclosure and any additional legal details should be verified before launch."
        />
      </CompactBand>
    </>
  );
}
