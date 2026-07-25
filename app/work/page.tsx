import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { caseStudies, experience } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description: "Selected experience and confidentiality-safe work themes for SkyDive and Dr Maren David Dangut Ph.D.",
  path: "/work"
});

export default function WorkPage() {
  return (
    <>
      <CompactHero
        eyebrow="Work"
        title="Work and experience"
        copy="Experience and engagement themes are separated from SkyDive's commercial offer. Case-study wording remains deliberately cautious until client permissions and final wording are approved."
        tone="brand"
      />

      <CompactBand
        title="Experience highlights"
        columns="md:grid-cols-[0.85fr_repeat(2,1fr)] lg:grid-cols-[0.85fr_repeat(3,1fr)]"
      >
        {experience.slice(0, 3).map((item) => (
          <CompactCell
            key={`${item.role}-${item.organisation}`}
            title={item.role}
            copy={item.summary}
            footer={`${item.organisation} / ${item.period}`}
          />
        ))}
      </CompactBand>

      <CompactBand
        title="Case-study candidates"
        copy="Draft examples written without client-confidential detail."
        className="bg-white"
        columns="md:grid-cols-[0.85fr_repeat(3,1fr)]"
      >
        {caseStudies.slice(0, 3).map((study) => (
          <CompactCell
            key={study.slug}
            title={study.title}
            copy={study.context}
            footer={study.status === "needsReview" ? "Draft: needs owner review" : study.result}
          />
        ))}
      </CompactBand>
    </>
  );
}
