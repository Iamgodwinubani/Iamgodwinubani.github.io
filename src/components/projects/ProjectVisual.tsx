import Image from "next/image";
import type { Project } from "@/content/projects";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Product image at its natural proportions, in a thin frame.
 * Falls back to a labelled placeholder when a project has no image yet.
 */
export function ProjectVisual({
  project,
  className = "",
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: ProjectVisualProps) {
  const shot = project.screenshot;

  if (!shot) {
    return (
      <div
        role="img"
        aria-label={`${project.name} — image coming soon`}
        className={`bg-grid relative flex aspect-[3/2] w-full items-center justify-center border border-line bg-bg-2 ${className}`}
      >
        <span className="text-[clamp(2rem,6vw,4rem)] font-medium tracking-[-0.05em]" style={{ color: project.color }}>
          {project.name}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden border border-line bg-bg-2 ${className}`}>
      <Image
        src={shot.src}
        alt={`${project.name} website — ${project.category}`}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full transition-transform duration-700 ease-expo group-hover/card:scale-[1.015]"
      />
    </div>
  );
}
