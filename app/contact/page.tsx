import Link from "next/link";
import { CompactHero } from "@/components/compact-layout";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact SkyDive Technologies and Consultancy about a project, advisory need, training request or partnership discussion.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <CompactHero
        eyebrow="Contact"
        title="Contact SkyDive"
        copy="Share the project context, service area, timing and preferred contact route. Please do not include secrets, source code or sensitive personal data in this form."
        tone="brand"
      />
      <section className="border-b border-line bg-cloud">
        <Container className="grid gap-8 py-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="border-r-0 border-line lg:border-r lg:pr-8">
            <h2 className="font-display text-2xl font-semibold text-navy">Alternative route</h2>
            <p className="mt-3 text-sm leading-6 text-slate">
              Connect with {site.personName} on{" "}
              <Link href={site.linkedin} className="font-semibold text-teal hover:text-navy">
                LinkedIn
              </Link>
              . A public company email can be added once the preferred launch address is confirmed.
            </p>
            <dl className="mt-6 space-y-3 text-sm text-slate">
              <div>
                <dt className="font-semibold text-navy">Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Company number</dt>
                <dd>{site.companyNumber}</dd>
              </div>
            </dl>
          </aside>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
