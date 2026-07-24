import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/section";
import { StructuredData } from "@/components/structured-data";
import { articles, caseStudies, engagementSteps, services, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: site.shortName,
  description: site.description,
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.name,
          url: absoluteUrl("/"),
          areaServed: "United Kingdom",
          founder: { "@type": "Person", name: site.personName },
          description: site.description
        }}
      />

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/skydive-technical-systems.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,34,53,.94)_0%,rgba(16,34,53,.76)_42%,rgba(16,34,53,.18)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_76%,rgba(8,127,130,.16),transparent_32%)]" />
        </div>
        <Container className="relative min-h-[260px] py-10 sm:py-12 lg:min-h-[320px] lg:py-14">
          <div className="max-w-[620px] lg:ml-10">
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl lg:text-[2.75rem]">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-mist">
              Strategic advice and practical delivery from {site.personName}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" className="min-h-10 px-5 py-2.5">
                Discuss a project
              </Button>
              <Button
                href="/services"
                variant="secondary"
                className="min-h-10 border-white/40 bg-white/5 px-5 py-2.5 text-white hover:border-white hover:text-white"
              >
                View services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              ["Independent expertise", "Objective advice and delivery aligned to your goals."],
              ["Practical outcomes", "Solutions designed around how organisations really operate."],
              ["Trusted advisor", "Senior technical leadership and delivery experience."],
              ["Ecosystem aware", "Works across Salesforce, data platforms and partner ecosystems."]
            ].map(([title, copy], index) => (
              <FeatureStripItem
                key={title}
                icon={["people", "target", "shield", "network"][index]}
                title={title}
                copy={copy}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-cloud">
        <Container>
          <dl className="grid divide-y divide-line text-sm md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              ["Salesforce delivery", "Hands-on platform engineering, architecture review and maintainable implementation support."],
              ["Certified capability", "Active Salesforce credentials across architecture, development, administration and AI."],
              ["Registered company", "SkyDive Technologies and Consultancy Ltd is registered in England and Wales."],
              ["UK based", "Milton Keynes consultancy supporting public, education, research and partner organisations."]
            ].map(([title, label]) => (
              <div key={title} className="py-5 md:px-6 first:pl-0">
                <dt className="text-sm font-semibold text-navy">{title}</dt>
                <dd className="mt-2 leading-6 text-slate">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-b border-line bg-cloud">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-[1.1fr_repeat(4,1fr)] md:divide-x md:divide-y-0">
            <div className="py-5 pr-7">
              <h2 className="font-display text-2xl font-semibold text-navy">Core services</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                End-to-end support across strategy, architecture, delivery and adoption.
              </p>
              <Link href="/services" className="mt-4 inline-block text-sm font-semibold text-teal hover:text-navy">
                View all services
              </Link>
            </div>
            {services.slice(0, 4).map((service, index) => (
              <CompactService key={service.slug} service={service} icon={["cloud", "nodes", "cube", "people"][index]} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-[1fr_repeat(4,1fr)] md:divide-x md:divide-y-0">
            <div className="py-5 pr-7">
              <h2 className="font-display text-2xl font-semibold text-navy">How engagements work</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                A practical route from problem clarity to maintainable delivery.
              </p>
            </div>
            {engagementSteps.map((step, index) => (
              <article key={step.title} className="py-5 md:px-6">
                <p className="font-display text-2xl font-semibold text-teal">0{index + 1}</p>
                <h3 className="mt-3 text-sm font-semibold leading-5 text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-[0.8fr_1.35fr_1fr] md:divide-x md:divide-y-0">
            <div className="py-5 pr-7">
              <div className="grid aspect-[2.1/1] place-items-center bg-mist">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-navy text-2xl font-semibold text-mint">
                  MD
                </div>
              </div>
            </div>
            <div className="py-5 md:px-7">
              <h2 className="font-display text-2xl font-semibold text-navy">About {site.personName}</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                Senior Salesforce Developer and Technical Lead based in Milton Keynes, with public
                activity across Salesforce AI, LWC, Apex, external AI services, training and
                applied machine-learning research.
              </p>
              <Link href="/about/maren" className="mt-4 inline-block text-sm font-semibold text-teal hover:text-navy">
                Learn more about Maren
              </Link>
            </div>
            <div className="grid gap-4 py-5 md:pl-7">
              {["12 active Salesforce certifications", "Applied AI research background", "Registered UK company"].map(
                (item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <MiniIcon name={["award", "study", "building"][index]} />
                    <p className="text-sm font-medium text-slate">{item}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-cloud">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-[1fr_repeat(3,1fr)] md:divide-x md:divide-y-0">
            <div className="py-5 pr-6">
              <h2 className="font-display text-2xl font-semibold text-navy">Selected work</h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                Recent engagement themes across strategy, architecture and delivery.
              </p>
              <Link href="/work" className="mt-3 inline-block text-sm font-semibold text-teal hover:text-navy">
                View more work
              </Link>
            </div>
            {caseStudies.slice(0, 3).map((study) => (
              <CompactTextBlock
                key={study.slug}
                title={study.title}
                copy={study.context}
                footer={study.technologies.slice(0, 2).join(" / ")}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-[1fr_repeat(3,1fr)] md:divide-x md:divide-y-0">
            <div className="py-5 pr-6">
              <h2 className="font-display text-2xl font-semibold text-navy">Insights</h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                Practical perspectives on Salesforce, AI and data in delivery contexts.
              </p>
              <Link href="/insights" className="mt-3 inline-block text-sm font-semibold text-teal hover:text-navy">
                View all insights
              </Link>
            </div>
            {articles.map((article) => (
              <CompactTextBlock
                key={article.slug}
                title={article.title}
                copy={article.description}
                footer={article.date}
                href={`/insights/${article.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-teal text-white">
        <div className="absolute inset-y-0 right-0 w-1/3 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative grid gap-5 py-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold">Let&apos;s discuss your next project</h2>
            <p className="mt-1 text-sm text-mist">Book a no-obligation conversation to explore how SkyDive can help.</p>
          </div>
          <Button href="/contact" className="bg-white !text-teal hover:bg-mint">
            Discuss a project
          </Button>
        </Container>
      </section>
    </>
  );
}

function FeatureStripItem({ icon, title, copy }: { icon: string; title: string; copy: string }) {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 py-5 md:px-6">
      <MiniIcon name={icon} />
      <div>
        <h2 className="text-sm font-semibold text-navy">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-slate">{copy}</p>
      </div>
    </div>
  );
}

function CompactService({ service, icon }: { service: (typeof services)[number]; icon: string }) {
  return (
    <article className="grid grid-cols-[3rem_1fr] gap-4 py-5 md:px-6">
      <MiniIcon name={icon} />
      <div>
        <h3 className="text-sm font-semibold leading-5 text-navy">
          <Link href={`/services/${service.slug}`} className="hover:text-teal">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate">{service.summary}</p>
      </div>
    </article>
  );
}

function CompactTextBlock({
  title,
  copy,
  footer,
  href
}: {
  title: string;
  copy: string;
  footer: string;
  href?: string;
}) {
  const heading = <h3 className="text-sm font-semibold leading-5 text-navy">{title}</h3>;
  return (
    <article className="py-5 md:px-6">
      {href ? (
        <Link href={href} className="hover:text-teal">
          {heading}
        </Link>
      ) : (
        heading
      )}
      <p className="mt-2 text-sm leading-6 text-slate">{copy}</p>
      <p className="mt-3 text-xs font-semibold text-slate">{footer}</p>
    </article>
  );
}

function MiniIcon({ name }: { name: string }) {
  const common = "stroke-current";
  return (
    <span className="grid h-10 w-10 place-items-center text-teal" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="h-9 w-9" fill="none" strokeWidth="1.8">
        {name === "people" ? (
          <>
            <circle className={common} cx="12" cy="11" r="4" />
            <path className={common} d="M5 25c1.2-5 4-7 7-7s5.8 2 7 7M22 15a3.5 3.5 0 1 0 0-7M22 18c2.8.2 4.8 2.3 5.8 6" />
          </>
        ) : name === "target" ? (
          <>
            <circle className={common} cx="16" cy="16" r="11" />
            <circle className={common} cx="16" cy="16" r="5" />
            <path className={common} d="M16 3v6M16 23v6M3 16h6M23 16h6" />
          </>
        ) : name === "shield" ? (
          <path className={common} d="M16 4 26 8v7c0 6.4-4.1 10.5-10 13-5.9-2.5-10-6.6-10-13V8l10-4Z" />
        ) : name === "network" ? (
          <>
            <circle className={common} cx="16" cy="8" r="3" />
            <circle className={common} cx="8" cy="22" r="3" />
            <circle className={common} cx="24" cy="22" r="3" />
            <path className={common} d="M14.6 10.8 9.4 19.2M17.4 10.8l5.2 8.4M11 22h10" />
          </>
        ) : name === "cloud" ? (
          <path className={common} d="M10 23h13a5 5 0 0 0 .7-10 8 8 0 0 0-15-2.4A6.2 6.2 0 0 0 10 23Z" />
        ) : name === "nodes" ? (
          <>
            <circle className={common} cx="8" cy="8" r="3" />
            <circle className={common} cx="24" cy="10" r="3" />
            <circle className={common} cx="13" cy="24" r="3" />
            <path className={common} d="m10.7 9 10.6 1M9.3 10.7 12 21M22.2 12.5 15 22" />
          </>
        ) : name === "cube" ? (
          <path className={common} d="m16 4 10 5.5v13L16 28 6 22.5v-13L16 4Zm0 11.5 10-6M16 15.5l-10-6M16 15.5V28" />
        ) : name === "award" ? (
          <>
            <circle className={common} cx="16" cy="12" r="6" />
            <path className={common} d="m12 17-2 10 6-3 6 3-2-10" />
          </>
        ) : name === "study" ? (
          <path className={common} d="m4 12 12-6 12 6-12 6-12-6Zm5 4v6c4 3 10 3 14 0v-6" />
        ) : (
          <path className={common} d="M7 27V11l9-6 9 6v16M11 27v-9h10v9M10 13h12" />
        )}
      </svg>
    </span>
  );
}
