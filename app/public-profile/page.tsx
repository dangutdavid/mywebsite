import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { publicProfiles, researchHighlights, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Public Profile",
  description: "Public profile and research links used to support SkyDive website content.",
  path: "/public-profile"
});

export default function PublicProfilePage() {
  return (
    <>
      <CompactHero
        eyebrow="Evidence"
        title="Public profile"
        copy={`Public sources used to support professional claims for ${site.personName}. This page is intended as a transparent review surface before launch.`}
        tone="brand"
      />
      <CompactBand title="Professional sources" columns="md:grid-cols-[0.85fr_repeat(2,1fr)] lg:grid-cols-[0.85fr_repeat(4,1fr)]">
        {publicProfiles.map((profile) => (
          <CompactCell key={profile.href} title={profile.label} copy={profile.description} href={profile.href} />
        ))}
      </CompactBand>
      <CompactBand title="Research sources" className="bg-white" columns="md:grid-cols-[0.85fr_repeat(3,1fr)]">
        {researchHighlights.map((item) => (
          <CompactCell key={item.href} title={item.title} copy={item.description} footer={item.venue} href={item.href} />
        ))}
      </CompactBand>
    </>
  );
}
