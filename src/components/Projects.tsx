import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ProjectMedia from "@/components/ProjectMedia";

const PROJECTS = [
  {
    title: "Civil Control",
    subtitle: "Sistema de gestión para ESEA",
    description:
      "Sistema de gestión integral que la empresa usa a diario para manejar personal, flota de vehículos, seguros, ventas y compras, todo centralizado, sin planillas sueltas.",
    note: "Capturas con datos de ejemplo por confidencialidad del cliente",
    image: "/images/civil-control/civil-control-1.png",
    reversed: false,
  },
  {
    title: "Prodizzi",
    subtitle: "Mi proyecto propio",
    description:
      "Una app que analiza tus resúmenes bancarios y detecta automáticamente cobros duplicados o movimientos sospechosos, y te arma el texto listo para hacer el reclamo al banco.",
    note: "Capturas propias, acá podés mostrar todo lo que quieras",
    image: "/images/prodizzi/prodizzi-1.png",
    reversed: true,
  },
];

/**
 * Proyectos — mobile imagen arriba + texto abajo; desktop zigzag para que
 * cada caso se lea distinto. Ver CLAUDE.md § "Proyectos — layout específico".
 */
export default function Projects() {
  return (
    <section id="proyectos" className="bg-surface py-16 lg:py-28">
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
          {PROJECTS.map((project) => (
            <Reveal key={project.title}>
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={project.reversed ? "lg:order-2" : ""}>
                  <ProjectMedia src={project.image} alt={`Captura de ${project.title}`} />
                </div>
                <div className={project.reversed ? "lg:order-1" : ""}>
                  <h3 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand">{project.subtitle}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm italic text-muted/80">({project.note})</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
