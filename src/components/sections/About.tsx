import { about } from "@/content/profile";
import { site } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Portrait } from "@/components/ui/Portrait";

export function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" aria-labelledby="about-title" className="container-page pt-32 md:pt-48">
      <SectionHeader id="about-title" index="02" label="About" title="More than just writing code." />

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--nav-h)+32px)]">
            <Portrait
              caption="Godwin Ubani"
              className="max-w-sm md:max-w-none"
              src={site.portraitAbout}
              alt={site.portraitAboutAlt}
              position="72% 50%"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="text-pretty text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.035em] text-fg">
              {lead}
            </p>
          </Reveal>

          <div className="mt-10 space-y-6 md:mt-14">
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl md:leading-[1.6]">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <blockquote className="mt-14 border-l-2 border-accent py-1 pl-6 md:mt-20 md:pl-8">
              <p className="text-pretty text-2xl font-medium leading-snug tracking-[-0.03em] text-fg md:text-[2rem]">
                {about.closing}
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <dl className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:mt-24">
              {about.facts.map((f) => (
                <div key={f.label} className="bg-bg p-5">
                  <dt className="label-mono text-subtle">{f.label}</dt>
                  <dd className="mt-3 text-pretty text-[15px] leading-snug text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
