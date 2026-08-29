import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ChevronLeftIcon } from "@/components/icons";
import type { CaseStudy } from "@/lib/caseStudies";

/**
 * Template compartido para /proyectos/[slug]. Reusa los mismos componentes,
 * paleta y ritmo de secciones (eyebrow + h2 + Container + Reveal,
 * alternando bg-surface/bg-bg con bg-dot-grid) que el resto del sitio —
 * nada de layout nuevo. Si un proyecto todavía no tiene case study completo
 * (Prodizzi), las secciones de texto/impacto se saltean y se muestra un
 * aviso simple en su lugar.
 */
export default function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudy }) {
  const { title, tagline, images, problem, solution, roleAndProcess, impact, ctaLine } = caseStudy;
  const hasContent = Boolean(problem || solution || roleAndProcess);

  // El header ya usó bg-surface, así que la primera sección de contenido
  // alterna a bg-bg — pero solo cuenta lo que realmente se renderiza, para
  // que el ritmo de alternancia no se rompa si a un proyecto le falta,
  // por ejemplo, la galería.
  let bgToggle = 0;
  const nextBg = () => (bgToggle++ % 2 === 0 ? "bg-bg" : "bg-surface");

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-surface bg-dot-grid pb-16 pt-20 sm:pt-24 lg:pb-20 lg:pt-28">
        <Container>
          <Reveal>
            <Link
              href="/#proyectos"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Volver
            </Link>

            <p className="mt-6 text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
              Caso de estudio
            </p>
            <h1 className="mt-2 font-heading text-[2rem] leading-tight font-semibold text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {tagline}
            </p>
          </Reveal>
        </Container>
      </section>

      {hasContent ? (
        <>
          {problem && (
            <TextSection bg={nextBg()} eyebrow="Antes" title="El problema">
              {problem}
            </TextSection>
          )}

          {solution && (
            <TextSection bg={nextBg()} eyebrow="Ahora" title="La solución">
              {solution}
            </TextSection>
          )}

          {images.length > 0 && (
            <section className={`${nextBg()} bg-dot-grid py-16 lg:py-24`}>
              <Container>
                <Reveal>
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
                    Por dentro
                  </p>
                  <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                    Galería
                  </h2>
                </Reveal>
                <Reveal delay={100} className="mt-10">
                  <ProjectCarousel images={images} title={title} />
                </Reveal>
              </Container>
            </section>
          )}

          {roleAndProcess && (
            <TextSection bg={nextBg()} eyebrow="Detrás de escena" title="Mi rol y proceso">
              {roleAndProcess}
            </TextSection>
          )}

          {impact.length > 0 && (
            <section className={`${nextBg()} bg-dot-grid py-16 lg:py-24`}>
              <Container>
                <Reveal>
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
                    En números
                  </p>
                  <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                    Impacto
                  </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                  {impact.map((stat, i) => (
                    <Reveal key={stat} delay={i * 80}>
                      <ImpactCard value={stat} />
                    </Reveal>
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      ) : (
        <section className={`${nextBg()} bg-dot-grid py-16 lg:py-24`}>
          <Container>
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Estoy preparando el caso de estudio completo de {title} — el problema, la
                solución y el proceso detrás. Mientras tanto, escribime si querés que te
                cuente más.
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      {/* CTA final */}
      <section className="bg-surface bg-dot-grid py-16 lg:py-24">
        <Container>
          <Reveal className="mx-auto max-w-[480px] text-left">
            <h2 className="font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl">
              {ctaLine}
            </h2>
            <WhatsAppButton className="mt-6 w-full" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function TextSection({
  bg,
  eyebrow,
  title,
  children,
}: {
  bg: "bg-surface" | "bg-bg";
  eyebrow: string;
  title: string;
  children: string;
}) {
  return (
    <section className={`${bg} bg-dot-grid py-16 lg:py-24`}>
      <Container>
        <Reveal>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {children}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function ImpactCard({ value }: { value: string }) {
  // Si el dato arranca con un número (ej. "~50 empleados gestionados"), se
  // separa para darle más peso visual — mismo texto, sin inventar nada.
  const match = value.match(/^(~?\d+)\s+(.+)$/);

  return (
    <div className="flex h-full flex-col justify-center rounded-xl bg-surface p-6 text-center shadow-sm sm:text-left">
      {match ? (
        <>
          <p className="font-heading text-3xl font-semibold text-brand sm:text-4xl">{match[1]}</p>
          <p className="mt-1 text-sm text-muted sm:text-base">{match[2]}</p>
        </>
      ) : (
        <p className="font-heading text-lg font-semibold text-ink sm:text-xl">{value}</p>
      )}
    </div>
  );
}
