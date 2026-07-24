import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { Container } from "@/components/section";
import { services } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${service.slug}` });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,34,53,.96)_0%,rgba(16,34,53,.82)_45%,rgba(16,34,53,.28)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_72%,rgba(8,127,130,.18),transparent_30%)]" />
        </div>
        <Container className="relative grid min-h-[320px] gap-8 py-10 md:grid-cols-[0.95fr_1.05fr] md:items-end lg:py-14">
          <div className="max-w-[650px] lg:ml-10">
            <Link href="/services" className="text-sm font-semibold uppercase tracking-[0.14em] text-mint hover:text-white">
              Services
            </Link>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-mist">{service.summary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" className="min-h-10 px-5 py-2.5">
                Enquire about this service
              </Button>
              <Button
                href="/services"
                variant="secondary"
                className="min-h-10 border-white/40 bg-white/5 px-5 py-2.5 text-white hover:border-white hover:text-white"
              >
                View all services
              </Button>
            </div>
          </div>
          <div className="grid gap-3 md:justify-self-end">
            {service.technologies.slice(0, 4).map((technology, index) => (
              <div
                key={technology}
                className="grid min-h-14 w-full grid-cols-[3rem_1fr] items-center border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-sm md:w-[360px]"
              >
                <span className="font-display text-lg font-semibold text-mint">0{index + 1}</span>
                <span className="text-sm font-semibold text-white">{technology}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            <ServiceSignal title="Best fit" items={service.audience} />
            <ServiceSignal title="Typical pressure" items={service.problems} />
            <ServiceSignal title="Expected outputs" items={service.deliverables} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-cloud">
        <Container>
          <div className="grid divide-y divide-line lg:grid-cols-[0.82fr_1.18fr] lg:divide-x lg:divide-y-0">
            <div className="py-8 pr-8">
              <h2 className="font-display text-3xl font-semibold text-navy">Delivery shape</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                A focused route that clarifies what should be designed, built, reviewed and documented before delivery gets heavier.
              </p>
              <Button href="/contact" className="mt-6">
                Start a conversation
              </Button>
            </div>
            <div className="grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
              <ListPanel title="Included" items={service.includes} accent="teal" />
              <ListPanel title="Boundaries" items={service.excludes} accent="amber" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid divide-y divide-line lg:grid-cols-[0.82fr_1.18fr] lg:divide-x lg:divide-y-0">
            <div className="py-8 pr-8">
              <h2 className="font-display text-3xl font-semibold text-navy">Working evidence</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                The engagement should leave usable artefacts, not just advisory notes. Outputs are written for decision-makers and implementation teams.
              </p>
            </div>
            <div className="grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
              <ListPanel title="Deliverables" items={service.deliverables} accent="teal" />
              <ListPanel title="Technology context" items={service.technologies} accent="navy" compact />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-cloud">
        <Container>
          <div className="grid divide-y divide-line md:grid-cols-[1fr_repeat(3,1fr)] md:divide-x md:divide-y-0">
            <div className="py-6 pr-7">
              <h2 className="font-display text-2xl font-semibold text-navy">Related services</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                Connected support across architecture, AI, integration and delivery leadership.
              </p>
            </div>
            {relatedServices.map((item) => (
              <article key={item.slug} className="py-6 md:px-6">
                <h3 className="text-sm font-semibold leading-5 text-navy">
                  <Link href={`/services/${item.slug}`} className="hover:text-teal">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate">{item.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-teal text-white">
        <div className="absolute inset-y-0 right-0 w-1/3 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative grid gap-5 py-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold">Discuss {service.title}</h2>
            <p className="mt-1 text-sm text-mist">Share the project context and what needs to work better.</p>
          </div>
          <Button href="/contact" className="bg-white !text-teal hover:bg-mint">
            Discuss a project
          </Button>
        </Container>
      </section>
    </>
  );
}

function ServiceSignal({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="py-6 md:px-6">
      <div className="flex items-start gap-4">
        <ServiceGlyph />
        <div>
          <h2 className="text-sm font-semibold text-navy">{title}</h2>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate">
            {items.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ListPanel({
  title,
  items,
  accent,
  compact = false
}: {
  title: string;
  items: string[];
  accent: "teal" | "amber" | "navy";
  compact?: boolean;
}) {
  const accentClass = accent === "teal" ? "text-teal" : accent === "amber" ? "text-amber" : "text-navy";
  return (
    <article className="py-8 md:px-7">
      <p className={`text-sm font-semibold uppercase tracking-[0.12em] ${accentClass}`}>{title}</p>
      <ul className={compact ? "mt-4 flex flex-wrap gap-2" : "mt-4 space-y-3 text-sm leading-6 text-slate"}>
        {items.map((item) => (
          <li
            key={item}
            className={
              compact
                ? "rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate"
                : "grid grid-cols-[1rem_1fr] gap-3"
            }
          >
            {compact ? (
              item
            ) : (
              <>
                <span className={`mt-2 h-1.5 w-1.5 rounded-full ${accent === "amber" ? "bg-amber" : "bg-teal"}`} />
                <span>{item}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ServiceGlyph() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center text-teal" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 4 26 9.5v13L16 28 6 22.5v-13L16 4Z" />
        <path d="M16 15.5 26 9.5M16 15.5 6 9.5M16 15.5V28" />
      </svg>
    </span>
  );
}
