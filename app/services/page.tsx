import { Button } from "@/components/button";
import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { engagementSteps, services } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description: "Salesforce, AI, data, integration, technical leadership and training services from SkyDive.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <CompactHero
        eyebrow="Service offer"
        title="Services"
        copy="Senior technical support for organisations that need Salesforce, AI, data and integrated systems to work reliably in real operating conditions."
        tone="brand"
      >
        <Button href="/contact">Request a consultation</Button>
      </CompactHero>

      <CompactBand
        title="Service families"
        copy="Each service can be shaped as advisory, delivery, review or interim technical leadership."
        columns="md:grid-cols-[1fr_repeat(2,1fr)] lg:grid-cols-[1fr_repeat(5,1fr)]"
      >
        {services.map((service) => (
          <CompactCell
            key={service.slug}
            title={service.title}
            copy={service.summary}
            href={`/services/${service.slug}`}
            footer={service.technologies.slice(0, 3).join(" / ")}
          />
        ))}
      </CompactBand>

      <CompactBand title="Typical client problems" className="bg-white" columns="md:grid-cols-[1fr_repeat(2,1fr)]">
        <CompactCell
          title="Delivery needs senior architecture support"
          copy="A Salesforce programme has grown complex and needs clearer platform decisions, code quality and ownership."
        />
        <CompactCell
          title="AI and data need operational shape"
          copy="Ideas need practical governance, guardrails, integration patterns and a route into useful workflows."
        />
      </CompactBand>

      <CompactBand title="Delivery principles" columns="md:grid-cols-[1fr_repeat(3,1fr)]">
        <CompactCell title="Problem first" copy="Start with operating needs before choosing technology." />
        <CompactCell title="Maintainable delivery" copy="Build with documentation, review discipline and handover in mind." />
        <CompactCell title="Clear communication" copy="Translate decisions for technical teams and senior stakeholders." />
      </CompactBand>

      <CompactBand title="Engagement route" className="bg-white" columns="md:grid-cols-[1fr_repeat(4,1fr)]">
        {engagementSteps.map((step, index) => (
          <CompactCell key={step.title} title={`0${index + 1}. ${step.title}`} copy={step.description} />
        ))}
      </CompactBand>
    </>
  );
}
