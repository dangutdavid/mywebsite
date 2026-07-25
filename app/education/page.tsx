import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { education, researchHighlights } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Education",
  description: "Education and research summary for Dr Maren David Dangut Ph.D.",
  path: "/education"
});

export default function EducationPage() {
  return (
    <>
      <CompactHero
        eyebrow="Academic background"
        title="Education"
        copy="Education and applied research background across computer science, cyber security, data science and AI."
        tone="brand"
      />
      <CompactBand title="Education" columns="md:grid-cols-[0.85fr_repeat(3,1fr)]">
        {education.map((item) => (
          <CompactCell key={item} title={item} />
        ))}
      </CompactBand>
      <CompactBand title="Research highlights" className="bg-white" columns="md:grid-cols-[0.85fr_repeat(3,1fr)]">
        {researchHighlights.map((item) => (
          <CompactCell key={item.href} title={item.title} copy={item.description} footer={item.venue} href={item.href} />
        ))}
      </CompactBand>
    </>
  );
}
