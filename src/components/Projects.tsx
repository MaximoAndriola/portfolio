import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ArrowDownIcon } from "@/components/icons";
import { CASE_STUDIES } from "@/lib/caseStudies";

/**
 * Proyectos — mobile imagen arriba + texto abajo; desktop zigzag para que
 * cada caso se lea distinto. Ver CLAUDE.md § "Proyectos — layout específico".
 *
 * Usa la misma fuente de datos que /proyectos/[slug] (src/lib/caseStudies)
 * para no duplicar título, imágenes ni copy entre el teaser del home y la
 * página de caso de estudio completa.
 */
export default function Projects() {
  return (
    <section id="proyectos" className="bg-surface bg-dot-grid py-16 lg:py-28">
      <Container>
        <Reveal>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            Lo que ya construí
          </p>
          <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            Proyectos
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-16 lg:mt-14 lg:gap-24">
          {CASE_STUDIES.map((project) => (
            <Reveal key={project.slug}>
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={project.reversed ? "lg:order-2" : ""}>
                  <ProjectCarousel images={project.images} title={project.title} />
                </div>
                <div className={project.reversed ? "lg:order-1" : ""}>
                  <h3 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand">{project.homeSubtitle}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    {project.homeDescription}
                  </p>
                  {project.homeNote && (
                    <p className="mt-4 text-sm italic text-muted/80">({project.homeNote})</p>
                  )}

                  {project.hasFullCaseStudy && (
                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-ink"
                    >
                      Ver caso completo
                      <ArrowDownIcon
                        className="h-4 w-4 -rotate-90 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth="2.25"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
