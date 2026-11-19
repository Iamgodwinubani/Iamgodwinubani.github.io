import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-fg">{site.wordmark}</p>
          <p className="mt-4 max-w-sm text-pretty text-2xl font-medium leading-snug tracking-[-0.03em] text-fg md:text-3xl">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="label-mono text-subtle">Navigate</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="text-[15px] text-muted transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label-mono text-subtle">Contact</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-muted transition-colors hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="text-muted transition-colors hover:text-fg">
                {site.phone}
              </a>
            </li>
            <li className="text-muted">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-8 sm:flex-row sm:items-center">
        <p className="text-[13px] text-subtle">© 2026 Godwin Ubani. All rights reserved.</p>
        <BackToTop />
      </div>
    </footer>
  );
}
