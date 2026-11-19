import { expertise } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="container-page pt-32 md:pt-48">
      <SectionHeader id="expertise-title" index="03" label="Expertise" title="Where I create value." />

      <ol className="mt-16 border-b border-line md:mt-24">
        {expertise.map((item, i) => (
          <Reveal as="li" key={item.title} delay={0.04 * i} className="group relative border-t border-line">
            {/* Accent rule that draws in on hover */}
            <span
              className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100"
              aria-hidden
            />
            <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-12">
              <span className="label-mono text-subtle transition-colors duration-300 group-hover:text-accent md:col-span-1">
                {item.index}
              </span>
              <h3 className="text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-fg transition-transform duration-500 ease-expo md:col-span-5 md:group-hover:translate-x-2">
                {item.title}
              </h3>
              <p className="max-w-md text-pretty text-[17px] leading-relaxed text-muted md:col-span-4">{item.body}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 md:col-span-2 md:flex-col md:items-end md:text-right" aria-label={`${item.title} keywords`}>
                {item.keywords.map((k) => (
                  <li key={k} className="label-mono text-subtle">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
