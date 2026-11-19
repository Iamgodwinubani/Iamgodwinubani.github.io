import Image from "next/image";
import type { Project } from "@/content/projects";
import { VisualFrame } from "./VisualFrame";
import { QuentavoVisual } from "./visuals/QuentavoVisual";
import { RelyvoVisual } from "./visuals/RelyvoVisual";
import { BalnexaVisual } from "./visuals/BalnexaVisual";
import { AuvetraVisual } from "./visuals/AuvetraVisual";

const VISUALS = {
  quentavo: { view: "Payment flows", Component: QuentavoVisual },
  relyvo: { view: "Event deliveries", Component: RelyvoVisual },
  balnexa: { view: "Reconciliation", Component: BalnexaVisual },
  auvetra: { view: "Risk review", Component: AuvetraVisual },
} as const;

/** Renders a real screenshot when provided, otherwise the product's illustrative composition. */
export function ProjectVisual({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  if (project.screenshot) {
    return (
      <div className={`relative aspect-[3/2] w-full overflow-hidden border border-line bg-bg-2 ${className ?? ""}`}>
        <Image
          src={project.screenshot}
          alt={`${project.name} product interface`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const { view, Component } = VISUALS[project.slug];
  return (
    <VisualFrame title={project.name} view={view} color={project.color} className={className}>
      <Component />
    </VisualFrame>
  );
}
