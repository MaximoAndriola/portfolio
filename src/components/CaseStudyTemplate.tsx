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
  const { title, tagline, images, problem, solution, beforeAfter, roleAndProcess, impact, ctaLine } =
    caseStudy;
  const hasContent = Boolean(problem || solution || roleAndProcess || beforeAfter.length > 0);
  const hasImpact = Boolean(impact.headline || impact.stats.length > 0);

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

          {beforeAfter.length > 0 && (
            <section className={`${nextBg()} bg-dot-grid py-16 lg:py-24`}>
              <Container>
                <Reveal>
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
                    El cambio
                  </p>
                  <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                    Antes / Después
                  </h2>
                </Reveal>

                {/* Díptico: el desorden se lee en la composición (tarjetas
                    tiradas y rotadas vs. columna prolija), no con flechas
                    repetidas entre cada ítem. */}
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <Reveal>
                    <div className="rounded-2xl bg-bg p-8 lg:p-10">
                      <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
                        Antes
                      </p>
                      <div className="mt-10">
                        {beforeAfter.map((row, i) => (
                          <MessyCard key={row.before} text={row.before} index={i} />
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={120}>
                    <div className="rounded-2xl bg-brand/[0.04] p-8 lg:p-10">
                      <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-brand">
                        Después
                      </p>
                      <div className="mt-10 flex flex-col gap-3">
                        {beforeAfter.map((row) => (
                          <TidyCard key={row.after} text={row.after} />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </Container>
            </section>
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

          {hasImpact && (
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

                {/* Editorial, no cards: columna de texto grande + riel de
                    números con una sola línea de guía continua. */}
                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[60%_40%] lg:gap-12">
                  {impact.headline && (
                    <Reveal>
                      <p className="max-w-xl font-heading text-2xl font-semibold leading-tight text-ink sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
                        {impact.headline}
                      </p>
                      {impact.subline && (
                        <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                          {impact.subline}
                        </p>
                      )}
                    </Reveal>
                  )}

                  {impact.stats.length > 0 && (
                    <Reveal delay={120}>
                      <div className="flex flex-col border-l border-brand/20 pl-6 sm:pl-8">
                        {impact.stats.map((stat, i) => (
                          <div key={stat.label} className={i > 0 ? "mt-8" : ""}>
                            <p className="font-heading text-4xl font-semibold text-brand sm:text-5xl">
                              {stat.value}
                            </p>
                            <p className="mt-1 text-sm text-muted sm:text-base">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  )}
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

// Rotación/offset fijos por índice (no Math.random(): en un server component
// eso rendiría distinto en server y cliente y rompería la hidratación).
// Valores dentro de -6° a 8° como pide el spec.
const MESSY_ROTATIONS = [-5, 7, -3, 6];
const MESSY_OFFSETS_X = [4, -10, 12, -6];

function MessyCard({ text, index }: { text: string; index: number }) {
  const rotation = MESSY_ROTATIONS[index % MESSY_ROTATIONS.length];
  const offsetX = MESSY_OFFSETS_X[index % MESSY_OFFSETS_X.length];

  return (
    <div
      className="relative w-[70%] max-w-[240px] rounded-lg bg-surface p-3.5 shadow-md"
      style={{
        transform: `rotate(${rotation}deg) translateX(${offsetX}px)`,
        marginTop: index === 0 ? 0 : "-1.25rem",
        zIndex: index + 1,
      }}
    >
      {/* Label arriba (no abajo): la tarjeta siguiente tapa el borde
          inferior de esta al solaparse, así que lo que se pisa son las
          líneas decorativas, nunca el texto legible. */}
      <p className="text-xs font-medium text-muted">{text}</p>
      {/* Mini "filas de datos" — mismo motivo que la ilustración del hero. */}
      <div className="mt-2.5 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-bg" />
        <div className="h-1.5 w-4/5 rounded-full bg-bg" />
        <div className="h-1.5 w-3/5 rounded-full bg-bg" />
      </div>
    </div>
  );
}

function TidyCard({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-brand/25 bg-surface p-3.5 shadow-sm">
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-brand/15" />
        <div className="h-1.5 w-4/5 rounded-full bg-brand/15" />
        <div className="h-1.5 w-3/5 rounded-full bg-brand/15" />
      </div>
      <p className="mt-2.5 text-xs font-semibold text-brand">{text}</p>
    </div>
  );
}

