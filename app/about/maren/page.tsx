import { Button } from "@/components/button";
import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { StructuredData } from "@/components/structured-data";
import { certifications, education, experience, publicProfiles, researchHighlights, site, skills } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Maren",
  description: "Profile of Dr Maren David Dangut, Senior Salesforce Developer and Technical Lead.",
  path: "/about/maren"
});

export default function AboutMarenPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.personName,
          jobTitle: "Senior Salesforce Developer and Technical Lead",
          url: absoluteUrl("/about/maren"),
          sameAs: [site.linkedin]
        }}
      />
      <CompactHero
        eyebrow="Profile"
        title={`About ${site.personName}`}
        copy={`${site.personName} is a Senior Salesforce Developer and Technical Lead based in ${site.location}, with public professional activity across Salesforce AI, LWC, Apex, external AI services, training and applied machine-learning research.`}
        tone="brand"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">Discuss an engagement</Button>
          <Button href={site.linkedin} variant="secondary">
            Connect on LinkedIn
          </Button>
        </div>
      </CompactHero>

      <CompactBand
        title="Areas of expertise"
        copy="Capabilities drawn from supplied credentials and public professional activity."
        columns="md:grid-cols-[1fr_repeat(3,1fr)]"
      >
        {skills.slice(0, 9).map((skill) => (
          <CompactCell key={skill} title={skill} />
        ))}
      </CompactBand>

      <CompactBand
        title="Career timeline"
        className="bg-white"
        columns="md:grid-cols-[0.8fr_repeat(2,1fr)] lg:grid-cols-[0.8fr_repeat(3,1fr)]"
      >
        {experience.slice(0, 3).map((item) => (
          <CompactCell
            key={`${item.organisation}-${item.period}`}
            title={item.role}
            copy={item.summary}
            footer={`${item.organisation} / ${item.period}`}
          />
        ))}
      </CompactBand>

      <CompactBand
        title="Public profile signals"
        copy="Public links that support the professional positioning on this site."
        className="bg-cloud"
        columns="md:grid-cols-[0.8fr_repeat(2,1fr)] lg:grid-cols-[0.8fr_repeat(4,1fr)]"
      >
        {publicProfiles.map((profile) => (
          <CompactCell
            key={profile.href}
            title={profile.label}
            copy={profile.description}
            href={profile.href}
          />
        ))}
      </CompactBand>

      <CompactBand
        title="Research and applied AI"
        copy="Published work connects machine learning, predictive maintenance and rare-failure detection."
        className="bg-white"
        columns="md:grid-cols-[0.8fr_repeat(3,1fr)]"
      >
        {researchHighlights.map((item) => (
          <CompactCell
            key={item.href}
            title={item.title}
            copy={item.description}
            footer={item.venue}
            href={item.href}
          />
        ))}
      </CompactBand>

      <CompactBand title="Education and credentials" columns="md:grid-cols-[1fr_repeat(2,1fr)]">
        <CompactCell title="Education">
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CompactCell>
        <CompactCell title="Selected certifications" copy="Certification status should be verified immediately before publication.">
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate sm:grid-cols-2">
            {certifications.slice(0, 10).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CompactCell>
      </CompactBand>
    </>
  );
}
