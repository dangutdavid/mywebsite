import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { skills } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Skills and technologies",
  description: "Salesforce, AI, data, integration and delivery skills represented by SkyDive.",
  path: "/skills"
});

export default function SkillsPage() {
  return (
    <>
      <CompactHero
        eyebrow="Capability"
        title="Skills and technologies"
        copy="A public-safe summary of Salesforce, AI, data, integration and delivery skills from the professional profile and public activity."
        tone="brand"
      />
      <CompactBand title="Capability map" columns="md:grid-cols-[0.85fr_repeat(3,1fr)]">
        {skills.map((skill) => (
          <CompactCell key={skill} title={skill} />
        ))}
      </CompactBand>
    </>
  );
}
