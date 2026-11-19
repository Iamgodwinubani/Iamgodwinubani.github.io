"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { approach } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Approach() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="approach" aria-labelledby="approach-title" className="container-page pt-32 md:pt-48">
      <SectionHeader id="approach-title" index="05" label="Approach" title="From problem to product." />

      <ol ref={ref} className="relative mt-16 grid gap-0 md:mt-24 md:grid-cols-4">
        {/* Progress rail — horizontal on desktop, vertical on mobile */}
        <span className="absolute left-[5px] top-0 h-full w-px bg-line md:left-0 md:h-px md:w-full" aria-hidden />
        <motion.span
          style={reduce ? undefined : { scaleX: scale }}
          className="absolute left-0 top-0 hidden h-px w-full origin-left bg-accent md:block"
          aria-hidden
        />
        <motion.span
          style={reduce ? undefined : { scaleY: scale }}
          className="absolute left-[5px] top-0 h-full w-px origin-top bg-accent md:hidden"
          aria-hidden
        />

        {approach.map((step, i) => (
          <Reveal as="li" key={step.title} delay={0.08 * i} className="relative pb-14 pl-10 md:pb-0 md:pl-0 md:pr-8 md:pt-12">
            <span
              className="absolute left-0 top-1.5 h-[11px] w-[11px] border border-accent bg-bg md:-top-[5px]"
              aria-hidden
            />
            <span className="label-mono text-accent">{step.index}</span>
            <h3 className="mt-4 text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.045em] text-fg md:mt-8">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xs text-pretty text-[17px] leading-relaxed text-muted md:mt-6">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
