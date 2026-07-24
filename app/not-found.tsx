import Link from "next/link";
import { Button } from "@/components/button";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section className="bg-white">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-teal">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy">Page not found</h1>
        <p className="mt-5 text-lg leading-8 text-slate">
          The page may have moved or may not be part of the current SkyDive website.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Return home</Button>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-line px-5 py-3 text-sm font-semibold text-navy hover:border-teal hover:text-teal">
            Contact SkyDive
          </Link>
        </div>
      </div>
    </Section>
  );
}

