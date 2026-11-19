"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        // Move focus back to the top of the document for keyboard users
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-3 text-[13px] text-muted transition-colors hover:text-fg"
    >
      Back to top
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-[border-color,transform] duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:border-fg/40">
        <ArrowUp size={14} strokeWidth={1.75} aria-hidden />
      </span>
    </button>
  );
}
