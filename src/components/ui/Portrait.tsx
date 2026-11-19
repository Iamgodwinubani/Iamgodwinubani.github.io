import Image from "next/image";
import { site } from "@/content/site";

type PortraitProps = {
  className?: string;
  priority?: boolean;
  caption?: string;
  sizes?: string;
  /** Photo path; defaults to the main portrait in site.ts */
  src?: string | null;
  alt?: string;
  /** CSS object-position, to keep the subject in frame */
  position?: string;
};

/**
 * Portrait frame. Shows the photograph when one is set,
 * otherwise a deliberate, clearly-labelled placeholder (no generated faces).
 */
export function Portrait({
  className = "",
  priority,
  caption,
  sizes = "(min-width: 1024px) 30vw, 90vw",
  src = site.portrait,
  alt = site.portraitAlt,
  position = "50% 30%",
}: PortraitProps) {
  return (
    <figure className={`relative ${className}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-bg-2">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        ) : (
          <div
            role="img"
            aria-label="Portrait placeholder — photograph coming soon"
            className="absolute inset-0 flex flex-col justify-between p-5"
          >
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            {/* Corner crop marks */}
            {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
              <span key={c} className={`absolute h-4 w-4 border-fg/30 ${c}`} aria-hidden />
            ))}
            <span className="label-mono relative text-subtle">Portrait</span>
            <span
              aria-hidden
              className="relative self-center text-[clamp(4rem,10vw,7rem)] font-medium leading-none tracking-[-0.06em] text-fg/[0.08]"
            >
              GU
            </span>
            <span className="label-mono relative text-subtle">Photograph · 4:5</span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="label-mono mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-subtle">
          <span>{caption}</span>
          <span>{site.location}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
