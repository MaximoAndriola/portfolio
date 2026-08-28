import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { AutomationIcon, BoltIcon, SystemIcon, WebIcon } from "@/components/icons";

const SERVICES = [
  {
    icon: WebIcon,
    title: "Páginas web",
    description: "Para que tu negocio aparezca en Google y tus clientes te encuentren.",
  },
  {
    icon: SystemIcon,
    title: "Sistemas a medida",
    description:
      "Para gestionar stock, ventas, turnos o lo que tu negocio necesite, sin depender de un cuaderno o un Excel.",
  },
  {
    icon: AutomationIcon,
    title: "Automatizaciones",
    description: "Para tareas repetitivas que te hacen perder tiempo todos los días.",
  },
  {
    icon: BoltIcon,
    title: "Entregas rápidas",
    description:
      "Gracias a herramientas de inteligencia artificial que uso en mi flujo de trabajo.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Conversamos",
    description: "Me contás qué necesita tu negocio, sin costo ni compromiso.",
  },
  {
    n: "02",
    title: "Te paso una propuesta",
    description: "Plazo y precio claro, antes de arrancar.",
  },
  {
    n: "03",
    title: "Construyo y te mantengo al tanto",
    description: "Vas viendo el avance real, no recién al final.",
  },
];

/**
 * Servicios — mobile 1 columna, desktop grid 2x2.
 * Ver CLAUDE.md § "Servicios — layout específico".
 */
export default function Services() {
  return (
    <section className="bg-bg bg-dot-grid py-16 lg:py-28">
      <Container>
        <Reveal>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            Qué puedo hacer por vos
          </p>
          <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            Servicios
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="h-full rounded-xl bg-surface p-8 shadow-sm transition-all duration-200 md:hover:-translate-y-0.5 md:hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                  <service.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mini-proceso "Cómo trabajo" — sin tarjetas, para que se lea como
            un sub-bloque distinto de la grid de servicios de arriba. */}
        <div className="mt-16 lg:mt-24">
          <Reveal>
            <h3 className="font-heading text-xl font-semibold text-ink sm:text-2xl">
              Cómo trabajo
            </h3>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="flex items-start gap-4 sm:block">
                  <span className="font-heading text-2xl font-semibold text-brand/30 sm:text-3xl">
                    {step.n}
                  </span>
                  <div className="sm:mt-3">
                    <h4 className="font-heading text-base font-semibold text-ink">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
