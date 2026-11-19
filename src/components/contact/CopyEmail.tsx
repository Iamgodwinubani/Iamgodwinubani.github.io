"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";

export function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <button type="button" onClick={copy} className={buttonClasses("secondary")}>
      {state === "copied" ? (
        <Check size={15} strokeWidth={1.75} className="text-accent" aria-hidden />
      ) : (
        <Copy size={15} strokeWidth={1.75} aria-hidden />
      )}
      <span>{state === "copied" ? "Email copied" : state === "failed" ? "Copy failed — select manually" : "Copy email"}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
