import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { ContactForm } from "@/components/contact/ContactForm";
import { buttonClasses } from "@/components/ui/Button";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pt-32 md:pt-48">
      <div className="border-t border-line pt-6">
        <Reveal>
          <p className="label-mono text-muted">
            <span className="text-accent">06</span>
            <span className="mx-2 text-subtle">/</span>
            Get in touch
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="contact-title"
            className="mt-10 max-w-[13ch] text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.055em] text-fg md:mt-14"
          >
            Have something worth building<span className="text-accent">?</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <Reveal>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-muted md:text-xl">
              I&apos;m always interested in meaningful conversations, ambitious ideas, and opportunities to build
              something valuable.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={`mailto:${site.email}`} className={buttonClasses("primary")}>
              <span>Email me</span>
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden className="transition-transform duration-300 ease-expo group-hover:-translate-y-px group-hover:translate-x-0.5" />
            </a>
            <CopyEmail />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-14 border-t border-line">
              {[
                { label: "Email", value: site.email, href: `mailto:${site.email}` },
                { label: "Phone", value: site.phone, href: site.phoneHref },
                { label: "Location", value: site.location },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                  <dt className="label-mono shrink-0 text-subtle">{row.label}</dt>
                  <dd className="min-w-0 text-right text-[15px] text-fg sm:text-base">
                    {row.href ? (
                      <a href={row.href} className="break-all underline-offset-4 transition-colors hover:text-accent hover:underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
