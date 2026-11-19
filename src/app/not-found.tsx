import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="label-mono text-accent">404</p>
      <h1 className="mt-6 max-w-[12ch] text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.05em] text-fg">
        This page hasn&apos;t been built.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10">
        <ButtonLink href="/" variant="secondary" icon={<ArrowLeft size={16} strokeWidth={1.75} aria-hidden />}>
          Back home
        </ButtonLink>
      </div>
    </section>
  );
}
