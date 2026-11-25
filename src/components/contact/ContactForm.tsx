"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { site } from "@/content/site";
import { buildMailto, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { buttonClasses } from "@/components/ui/Button";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "mailto"; href: string }
  | { kind: "error"; message: string };

/**
 * Optional form service endpoint (e.g. Formspree: https://formspree.io/f/xxxxxx).
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT at build time to send messages directly;
 * without it, the form opens the visitor's email app with the message filled in.
 */
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };

const FIELDS: { name: keyof ContactInput; label: string; type?: string; autoComplete?: string; textarea?: boolean; half?: boolean }[] = [
  { name: "name", label: "Name", autoComplete: "name", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
  { name: "subject", label: "Subject" },
  { name: "message", label: "Message", textarea: true },
];

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const update = (name: keyof ContactInput, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateContact(next));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length > 0) {
      const first = FIELDS.find((f) => found[f.name]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    if (honeypot) return;

    // No form service configured: hand off to the visitor's email app.
    if (!CONTACT_ENDPOINT) {
      const href = buildMailto(site.email, values);
      setStatus({ kind: "mailto", href });
      window.location.href = href;
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _replyto: values.email }),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus({ kind: "sent" });
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus({
        kind: "error",
        message: `Your message couldn't be sent right now. Please try again, or email me directly at ${site.email}.`,
      });
    }
  };

  const sending = status.kind === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative" aria-describedby="form-status">
      <div className="grid gap-x-6 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const err = touched[f.name] ? errors[f.name] : undefined;
          const id = `contact-${f.name}`;
          const common = {
            id,
            name: f.name,
            value: values[f.name],
            required: true,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": err ? `${id}-error` : undefined,
            onChange: (e: { target: { value: string } }) => update(f.name, e.target.value),
            onBlur: () => {
              setTouched((t) => ({ ...t, [f.name]: true }));
              setErrors(validateContact(values));
            },
            className:
              "peer w-full resize-none border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-2 text-[17px] text-fg placeholder:text-subtle transition-colors duration-300 focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-0 aria-[invalid=true]:border-danger",
          };
          return (
            <div key={f.name} className={`group relative pb-8 ${f.half ? "" : "sm:col-span-2"}`}>
              <label htmlFor={id} className="label-mono block text-subtle transition-colors group-focus-within:text-accent">
                {f.label}
              </label>
              {f.textarea ? (
                <textarea {...common} rows={5} placeholder="Tell me about the idea, product, or opportunity." />
              ) : (
                <input
                  {...common}
                  type={f.type ?? "text"}
                  autoComplete={f.autoComplete}
                  placeholder={f.name === "name" ? "Your name" : f.name === "email" ? "you@company.com" : "What's it about?"}
                />
              )}
              {err ? (
                <p id={`${id}-error`} className="absolute bottom-2 left-0 text-[13px] text-danger">
                  {err}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot (hidden from people and assistive tech) */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className={buttonClasses("primary", "sm:min-w-[200px]")}>
          {sending ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
          <span>{sending ? "Sending…" : "Send message"}</span>
          {!sending ? <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden className="transition-transform duration-300 ease-expo group-hover:-translate-y-px group-hover:translate-x-0.5" /> : null}
        </button>
        <p className="text-[13px] text-subtle">All fields are required.</p>
      </div>

      <div id="form-status" role="status" aria-live="polite" className="mt-6 min-h-6">
        <AnimatePresence mode="wait">
          {status.kind === "sent" && (
            <Notice key="sent" tone="ok" icon={<Check size={16} aria-hidden />}>
              Thank you — your message has been sent. I&apos;ll get back to you soon.
            </Notice>
          )}
          {status.kind === "mailto" && (
            <Notice key="mailto" tone="ok" icon={<Mail size={16} aria-hidden />}>
              Your email app should now open with your message ready to send. If it didn&apos;t,{" "}
              <a href={status.href} className="underline underline-offset-4">
                open it here
              </a>{" "}
              or write to{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
              .
            </Notice>
          )}
          {status.kind === "error" && (
            <Notice key="error" tone="error">
              {status.message}
            </Notice>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Notice({ tone, icon, children }: { tone: "ok" | "error"; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 border-l-2 py-1 pl-4 text-[15px] leading-relaxed ${
        tone === "ok" ? "border-accent text-fg" : "border-danger text-fg"
      }`}
    >
      {icon ? <span className={`mt-1 ${tone === "ok" ? "text-accent" : "text-danger"}`}>{icon}</span> : null}
      <p>{children}</p>
    </motion.div>
  );
}
