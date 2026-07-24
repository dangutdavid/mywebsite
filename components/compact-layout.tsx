import Link from "next/link";
import { Container } from "@/components/section";
import { cn } from "@/lib/utils";

export function CompactHero({
  eyebrow,
  title,
  copy,
  children,
  tone = "light"
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  children?: React.ReactNode;
  tone?: "light" | "brand";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line",
        tone === "brand" ? "bg-navy text-white" : "bg-white"
      )}
    >
      {tone === "brand" ? (
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(30deg,rgba(94,213,210,.2)_1px,transparent_1px),radial-gradient(circle,rgba(241,171,44,.65)_2px,transparent_3px)] [background-size:84px_84px,132px_96px]" />
      ) : (
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-line bg-[radial-gradient(circle,rgba(8,127,130,.12)_1px,transparent_1px)] [background-size:18px_18px] md:block" />
      )}
      <Container className="relative grid gap-6 py-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <div>
          {eyebrow ? (
            <p className={cn("text-sm font-semibold uppercase tracking-[0.14em]", tone === "brand" ? "text-mint" : "text-teal")}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className={cn("mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl", tone === "brand" ? "text-white" : "text-navy")}>
            {title}
          </h1>
        </div>
        <div>
          <p className={cn("max-w-3xl text-base leading-7", tone === "brand" ? "text-mist" : "text-slate")}>{copy}</p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export function CompactBand({
  title,
  copy,
  href,
  linkLabel,
  children,
  className,
  columns = "md:grid-cols-[1fr_repeat(3,1fr)]"
}: {
  title: string;
  copy?: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
  className?: string;
  columns?: string;
}) {
  return (
    <section className={cn("border-b border-line bg-cloud", className)}>
      <Container>
        <div className={cn("grid divide-y divide-line md:divide-x md:divide-y-0", columns)}>
          <div className="py-6 pr-6">
            <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
            {copy ? <p className="mt-2 text-sm leading-6 text-slate">{copy}</p> : null}
            {href && linkLabel ? (
              <Link href={href} className="mt-3 inline-block text-sm font-semibold text-teal hover:text-navy">
                {linkLabel}
              </Link>
            ) : null}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

export function CompactCell({
  title,
  copy,
  footer,
  href,
  children
}: {
  title: string;
  copy?: string;
  footer?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  const external = href?.startsWith("http");
  const heading = <h3 className="text-sm font-semibold leading-5 text-navy">{title}</h3>;
  return (
    <article className="py-6 md:px-6">
      {href ? (
        <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="hover:text-teal">
          {heading}
        </Link>
      ) : (
        heading
      )}
      {copy ? <p className="mt-2 text-sm leading-6 text-slate">{copy}</p> : null}
      {children}
      {footer ? <p className="mt-3 text-xs font-semibold text-slate">{footer}</p> : null}
    </article>
  );
}
