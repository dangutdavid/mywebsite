import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionIntro({
  title,
  copy,
  className
}: {
  title: string;
  copy?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <h2 className="font-display text-3xl font-semibold tracking-normal text-navy sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-lg leading-8 text-slate">{copy}</p> : null}
    </div>
  );
}

