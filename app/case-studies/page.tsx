import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { caseStudies } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Case studies",
  description: "Confidentiality-safe draft case-study candidates for SkyDive.",
  path: "/case-studies"
});

export default function CaseStudiesPage() {
  return (
    <>
      <CompactHero
        eyebrow="Evidence"
        title="Case studies"
        copy="Confidentiality-safe case-study candidates. Naming, evidence, metrics and final publication wording should be approved by the relevant owner before launch."
        tone="brand"
      />
      <CompactBand
        title="Draft candidates"
        copy="Written conservatively until permission and measurable outcomes are confirmed."
        columns="md:grid-cols-[0.85fr_repeat(3,1fr)]"
      >
        {caseStudies.map((study) => (
          <CompactCell
            key={study.slug}
            title={study.title}
            copy={study.context}
            footer={study.status === "needsReview" ? "Needs owner review" : study.result}
          >
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal">Role</p>
            <p className="mt-1 text-sm leading-6 text-slate">{study.role}</p>
          </CompactCell>
        ))}
      </CompactBand>
    </>
  );
}
