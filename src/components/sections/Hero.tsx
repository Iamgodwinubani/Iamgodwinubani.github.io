"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Portrait } from "@/components/ui/Portrait";
import { LocalTime } from "@/components/ui/LocalTime";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE = ["I", "build", "things", "that", "move", "ideas", "forward"];

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="relative pt-[calc(var(--nav-h)+40px)] md:pt-[calc(var(--nav-h)+72px)]">
      <div className="container-page">
        {/* Intro label */}
        <motion.p {...fade(0.1)} className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          {site.roles.map((role, i) => (
            <span key={role} className="flex items-center gap-3">
              {role.toUpperCase()}
              {i < site.roles.length - 1 ? <span className="text-subtle" aria-hidden>/</span> : null}
            </span>
          ))}
        </motion.p>

        {/* Headline */}
        <h1
          id="hero-title"
          className="mt-8 max-w-[14ch] text-[clamp(3.1rem,10.2vw,10rem)] font-medium leading-[0.92] tracking-[-0.055em] text-fg md:mt-10"
        >
          <span className="sr-only">I build things that move ideas forward.</span>
          <span aria-hidden>
            {HEADLINE.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="inline-block"
                  initial={reduce ? { opacity: 0 } : { y: "105%" }}
                  animate={reduce ? { opacity: 1 } : { y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.06 }}
                >
                  {word}
                  {i === HEADLINE.length - 1 ? <span className="text-accent">.</span> : null}
                </motion.span>
                {i < HEADLINE.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        </h1>

        {/* Lower composition */}
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col justify-between gap-12 md:col-span-7 lg:col-span-6">
            <div>
              <motion.p
                {...fade(0.75)}
                className="max-w-[34rem] text-pretty text-lg leading-relaxed text-muted md:text-[1.375rem] md:leading-[1.5]"
              >
                I build technology products, digital experiences, and businesses at the intersection of{" "}
                <span className="text-fg">software, innovation, and entrepreneurship.</span>
              </motion.p>

              <motion.div {...fade(0.85)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/#work" icon={<ArrowDownRight size={16} strokeWidth={1.75} aria-hidden />}>
                  Explore my work
                </ButtonLink>
                <ButtonLink href="/#contact" variant="secondary" icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />}>
                  Get in touch
                </ButtonLink>
              </motion.div>
            </div>

            {/* Meta strip */}
            <motion.dl {...fade(1)} className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 text-[14px] sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="label-mono text-subtle">Location</dt>
                <dd className="mt-2 flex items-center gap-2 text-fg">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  Based in {site.location}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-subtle">Local time</dt>
                <dd className="mt-2 text-fg">
                  <LocalTime />
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <dt className="label-mono text-subtle">Products</dt>
                <dd className="mt-2 text-fg">{projects.map((p) => p.name).join(" · ")}</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
            className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
          >
            <Portrait priority caption={site.fullName} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 90vw" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
