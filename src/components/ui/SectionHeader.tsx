import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
};

/** Editorial section opener: numbered label, large headline, optional intro. */
export function SectionHeader({ index, label, title, intro, id }: SectionHeaderProps) {
  return (
    <header className="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:gap-6">
      <Reveal className="md:col-span-3">
        <p className="label-mono text-muted">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-subtle">/</span>
          {label}
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2
            id={id}
            className="text-balance text-[clamp(2.5rem,6.4vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-fg"
          >
            {title}
          </h2>
        </Reveal>
        {intro ? (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
