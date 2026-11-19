import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/projects/ProjectVisual";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="container-page pt-32 md:pt-48">
      <SectionHeader
        id="work-title"
        index="01"
        label="Selected work"
        title="Things I've built."
        intro="A selection of technology products I've brought to life."
      />

      <ol className="mt-16 md:mt-24">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={project.slug} className="border-t border-line first:border-t-0">
              <Link
                href={`/work/${project.slug}`}
                className="group/card grid gap-8 py-12 outline-offset-8 md:grid-cols-12 md:gap-6 md:py-20"
                aria-label={`${project.name} — ${project.category}. View project`}
              >
                {/* Text */}
                <Reveal
                  className={`flex flex-col justify-between gap-10 md:col-span-5 ${
                    flip ? "md:order-2 md:col-start-8" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="label-mono text-subtle">{project.index}</span>
                      <span className="h-px w-8 bg-line-strong transition-[width,background-color] duration-500 ease-expo group-hover/card:w-14" aria-hidden />
                      <span className="label-mono" style={{ color: project.color }}>
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[clamp(2.75rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] text-fg">
                      {project.name}
                    </h3>
                    <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">{project.summary}</p>
                  </div>

                  <div className="flex flex-col gap-8">
                    <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
                      {project.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-3 py-1 text-[12.5px] text-muted">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-[15px] font-medium text-fg">
                      <span className="relative">
                        View project
                        <span
                          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-expo group-hover/card:scale-x-100"
                          style={{ background: project.color }}
                          aria-hidden
                        />
                      </span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform duration-500 ease-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Reveal>

                {/* Visual */}
                <Reveal
                  delay={0.1}
                  className={`md:col-span-7 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-6"}`}
                >
                  <div className="overflow-hidden transition-transform duration-700 ease-expo group-hover/card:-translate-y-1">
                    <ProjectVisual
                      project={project}
                      className="transition-[border-color] duration-500 group-hover/card:border-line-strong"
                    />
                  </div>
                </Reveal>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
