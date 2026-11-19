import type { ReactNode } from "react";

type VisualFrameProps = {
  title: string;
  view: string;
  color: string;
  children: ReactNode;
  className?: string;
};

/**
 * Shared frame for the illustrative product compositions.
 * Clearly labelled as illustrative so it is never mistaken for a real screenshot.
 */
export function VisualFrame({ title, view, color, children, className = "" }: VisualFrameProps) {
  return (
    <div
      className={`relative flex aspect-[3/2] w-full flex-col overflow-hidden border border-line bg-bg-2 ${className}`}
      style={{ ["--product" as string]: color }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="label-mono flex items-center gap-2 text-muted">
          <span className="h-1.5 w-1.5" style={{ background: color }} aria-hidden />
          {title}
          <span className="hidden text-subtle sm:inline">/ {view}</span>
        </span>
        <span className="label-mono text-subtle">Illustrative</span>
      </div>
      <div className="bg-grid relative flex-1">{children}</div>
    </div>
  );
}
