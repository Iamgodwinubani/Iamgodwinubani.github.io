"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks, site } from "@/content/site";
import { AvailabilityBadge } from "./AvailabilityBadge";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [observed, setActive] = useState<string>("top");
  const isHome = pathname === "/";
  const active = isHome ? observed : pathname.startsWith("/work") ? "work" : "";
  const pendingScroll = useRef<string | null>(null);
  const scrollToIdRef = useRef<(id: string) => void>(() => {});

  // On the home page, close the menu first (releasing the scroll lock), then scroll.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    history.replaceState(null, "", id === "top" ? "/" : `#${id}`);
    if (open) {
      // Scroll happens once the scroll lock is released (see effect below).
      pendingScroll.current = id;
      setOpen(false);
    } else {
      scrollToId(id);
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    scrollToIdRef.current = scrollToId;
  });

  // Subtle background once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view (home page only)
  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      if (pendingScroll.current) {
        scrollToIdRef.current(pendingScroll.current);
        pendingScroll.current = null;
      }
    };
  }, [open]);

  // Close the menu when the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="label-mono fixed left-4 top-3 z-[70] -translate-y-20 rounded-full bg-fg px-4 py-2 text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="container-page flex h-[var(--nav-h)] items-center justify-between">
          <Link
            href="/#top"
            onClick={(e) => goTo(e, "top")}
            className="group flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.18em] text-fg"
            aria-label={`${site.name} — home`}
          >
            <span className="inline-block h-2 w-2 bg-accent transition-transform duration-500 ease-expo group-hover:rotate-45" aria-hidden />
            {site.wordmark}
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <span className="hidden lg:block">
              <AvailabilityBadge />
            </span>
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={(e) => goTo(e, link.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[14px] transition-colors duration-300 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-white/[0.06]"
                          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                          aria-hidden
                        />
                      ) : null}
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-5 bg-fg transition-transform duration-500 ease-expo ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              className={`absolute h-px w-5 bg-fg transition-transform duration-500 ease-expo ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-[var(--nav-h)] md:hidden"
          >
            <ul className="container-page flex flex-1 flex-col justify-center gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                  className="border-b border-line"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => goTo(e, link.id)}
                    className="flex items-baseline justify-between py-5 text-[2.5rem] font-medium tracking-[-0.04em] text-fg active:text-accent"
                  >
                    {link.label}
                    <span className="label-mono text-subtle">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="container-page flex flex-col gap-3 pb-10"
            >
              <AvailabilityBadge />
              <a href={`mailto:${site.email}`} className="text-[15px] text-muted">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
