import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-7 sm:px-6 md:grid-cols-[1.2fr_0.6fr_0.6fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
            <svg viewBox="0 0 44 44" className="h-9 w-9" aria-hidden="true">
              <path d="M5 7 39 4 24 16 18 38 15 20 5 7Z" fill="#5ed5d2" />
            </svg>
            <span>
              <span className="block font-display text-2xl font-semibold leading-6">{site.shortName}</span>
              <span className="block text-[11px] text-mist">Technologies and Consultancy Ltd</span>
            </span>
          </Link>
          <p className="mt-5 text-xs text-mist">© 2026 {site.name}. All rights reserved.</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="space-y-2 text-xs text-mist">
            {site.nav.slice(0, 3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer secondary navigation">
          <ul className="space-y-2 text-xs text-mist">
            {site.nav.slice(3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/public-profile" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
                Public profile
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <ul className="space-y-2 text-xs text-mist">
            <li>{site.location}</li>
            <li>Company number {site.companyNumber}</li>
            <li>Registered in {site.jurisdiction}</li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-5 text-xs text-mist">
            <li><Link href="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms and conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
