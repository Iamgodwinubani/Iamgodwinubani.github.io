import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 text-[15px] font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-accent",
  secondary: "border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.04]",
  ghost: "px-0 text-fg hover:text-accent",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
};

/** Link styled as a button. Icon nudges on hover. */
export function ButtonLink({ variant = "primary", className, icon, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...rest}>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-px">
          {icon}
        </span>
      ) : null}
    </Link>
  );
}
