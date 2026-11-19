"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content into view once, when it enters the viewport. */
export function Reveal({ delay = 0, y = 24, as = "div", children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
