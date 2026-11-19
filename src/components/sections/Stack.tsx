import { stack } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Stack() {
  // Running item number across groups (01, 02, …)
  const offsets = stack.map((_, gi) => stack.slice(0, gi).reduce((n, g) => n + g.items.length, 0));

  return (
    <section id="technology" aria-labelledby="technology-title" className="container-page pt-32 md:pt-48">
      <SectionHeader id="technology-title" index="04" label="Technology" title="Tools I work with." />

      <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
        {stack.map((group, gi) => (
          <Reveal key={group.group} delay={0.05 * gi} className="bg-bg p-6 md:p-8">
            <h3 className="label-mono text-muted">{group.group}</h3>
            <ul className="mt-10 space-y-0.5">
              {group.items.map((item, ii) => {
                const n = String(offsets[gi] + ii + 1).padStart(2, "0");
                return (
                  <li
                    key={item}
                    className="group flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"
                  >
                    <span className="text-[19px] font-medium tracking-[-0.02em] text-fg transition-transform duration-500 ease-expo group-hover:translate-x-1">
                      {item}
                    </span>
                    <span className="label-mono text-subtle transition-colors duration-300 group-hover:text-accent">{n}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
