"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("a, button")
        ).filter((node) => !node.hasAttribute("disabled"));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
          <span className="relative grid h-10 w-10 place-items-center" aria-hidden="true">
            <svg viewBox="0 0 44 44" className="h-10 w-10">
              <path d="M5 7 39 4 24 16 18 38 15 20 5 7Z" fill="#087f82" />
              <path d="M11 9 36 6 23 14 17 33 15 18 11 9Z" fill="#5ed5d2" opacity=".72" />
            </svg>
          </span>
          <span>
            <span className="block font-display text-2xl font-semibold leading-6 text-navy">{site.shortName}</span>
            <span className="block text-[11px] leading-4 text-slate">Technologies and Consultancy Ltd</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary navigation">
          {site.nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent py-5 text-xs font-semibold text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal",
                  active && "border-teal text-navy"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex min-h-9 items-center rounded-sm bg-teal px-5 py-2 text-xs font-semibold text-white hover:bg-[#066d70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Discuss a project
          </Link>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-navy/40 lg:hidden" role="presentation">
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="ml-auto min-h-screen w-full max-w-sm bg-white p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-navy">{site.shortName}</span>
              <button
                type="button"
                onClick={closeMenu}
                className="min-h-11 rounded-md border border-line px-4 text-sm font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Close
              </button>
            </div>
            <nav className="mt-8 grid gap-2" aria-label="Mobile primary navigation">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-md px-3 py-3 text-base font-semibold text-navy hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
