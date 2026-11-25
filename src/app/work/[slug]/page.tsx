import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.category}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}/`,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  // Params resolve inside Suspense so navigation can show the shell instantly.
  return (
    <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <article className="pt-[calc(var(--nav-h)+40px)] md:pt-[calc(var(--nav-h)+64px)]">
      <div className="container-page">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
            All work
          </Link>
        </Reveal>

        {/* Title block */}
        <header className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <p className="label-mono flex items-center gap-3">
                <span className="text-subtle">Project {project.index}</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden />
                <span style={{ color: project.color }}>{project.category}</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[clamp(3.5rem,12vw,11rem)] font-medium leading-[0.9] tracking-[-0.06em] text-fg">
                {project.name}
                <span style={{ color: project.color }}>.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="self-end md:col-span-4">
            <p className="text-pretty text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>
          </Reveal>
        </header>

        {/* Visual */}
        <Reveal delay={0.2} className="mt-14 md:mt-20">
          <ProjectVisual project={project} priority />
          <p className="label-mono mt-3 text-subtle">
            {project.screenshot ? `${project.name} website` : "Image coming soon"}
          </p>
        </Reveal>

        {/* Details */}
        <div className="mt-20 grid gap-14 md:mt-32 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 md:grid-cols-1">
              <div>
                <dt className="label-mono text-subtle">Category</dt>
                <dd className="mt-2 text-[15px] text-fg">{project.category}</dd>
              </div>
              <div>
                <dt className="label-mono text-subtle">Role</dt>
                <dd className="mt-2 text-[15px] text-fg">{project.role}</dd>
              </div>
              <div>
                <dt className="label-mono text-subtle">Status</dt>
                <dd className="mt-2 flex items-center gap-2 text-[15px] text-fg">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.color }} aria-hidden />
                  {project.status}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-subtle">Areas</dt>
                <dd className="mt-2 text-[15px] text-fg">{project.tags.join(", ")}</dd>
              </div>
              {project.link ? (
                <div className="col-span-2 md:col-span-1">
                  <dt className="label-mono text-subtle">Website</dt>
                  <dd className="mt-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[15px] text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                      Visit {project.name}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <h2 className="label-mono text-subtle">Overview</h2>
            </Reveal>
            <div className="mt-6 space-y-6">
              {project.overview.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className={`text-pretty leading-[1.45] tracking-[-0.02em] ${i === 0 ? "text-2xl text-fg md:text-[2rem]" : "text-lg text-muted md:text-xl"}`}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Focus areas */}
        <section aria-labelledby="focus-title" className="mt-24 md:mt-36">
          <Reveal>
            <h2 id="focus-title" className="label-mono border-t border-line pt-6 text-subtle">
              What it focuses on
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {project.focus.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.05 * i} className="group bg-bg p-7 md:p-10">
                <span className="label-mono" style={{ color: project.color }}>
                  0{i + 1}
                </span>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-fg md:mt-16 md:text-3xl">{item.title}</h3>
                <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <Reveal className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-line pt-10 md:mt-36 md:flex-row md:items-center">
          <p className="max-w-lg text-pretty text-2xl font-medium tracking-[-0.03em] text-fg md:text-3xl">
            Want to talk about {project.name} or something similar?
          </p>
          <ButtonLink href="/#contact" icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />}>
            Get in touch
          </ButtonLink>
        </Reveal>

        {/* Prev / next */}
        <nav aria-label="More projects" className="mt-20 grid border-t border-line sm:grid-cols-2">
          {[
            { label: "Previous", p: prev },
            { label: "Next", p: next },
          ].map(({ label, p }, i) => (
            <Link
              key={label}
              href={`/work/${p.slug}`}
              className={`group flex flex-col gap-3 py-10 ${i === 1 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-10 sm:text-right" : "sm:pr-10"}`}
            >
              <span className="label-mono text-subtle">{label} project</span>
              <span className="text-4xl font-medium tracking-[-0.045em] text-fg transition-colors duration-300 md:text-5xl" >
                <span className="transition-colors duration-300 group-hover:text-[var(--hover)]" style={{ ["--hover" as string]: p.color }}>
                  {p.name}
                </span>
              </span>
              <span className="text-[14px] text-muted">{p.category}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
