import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { AutomationIcon, BoltIcon, SystemIcon, WebIcon } from "@/components/icons";

const SERVICES = [
  {
    icon: WebIcon,
    title: "Páginas web",
    description: "Pensadas para convertir visitas en clientes, no solo para estar en internet.",
  },
  {
    icon: SystemIcon,
    title: "Sistemas a medida",
    description: "Para dejar atrás el cuaderno y el Excel, y tener el control real de tu negocio.",
  },
  {
    icon: AutomationIcon,
    title: "Automatizaciones",
    description: "Para recuperar las horas que hoy perdés en tareas repetitivas.",
  },
  {
    icon: BoltIcon,
    title: "Entregas rápidas",
    description: "Gracias a inteligencia artificial en mi flujo de trabajo, sin resignar calidad.",
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
    description: "Alcance, plazo y precio claros, antes de arrancar.",
  },
  {
    n: "03",
    title: "Construyo y te mantengo al tanto",
    description: "Vas viendo avances reales durante todo el proceso, no recién al final.",
  },
  {
    n: "04",
    title: "Te acompaño después de la entrega",
    description:
      "Ajustes, soporte y mantenimiento para que todo siga funcionando como el primer día.",
  },
];

// "Sistemas a medida" es el servicio de mayor valor/complejidad — se separa
// del resto para llevar más espacio y jerarquía tipográfica, en vez de
// quedar como una tarjeta más entre cuatro iguales.
const FEATURED_SERVICE = SERVICES.find((s) => s.title === "Sistemas a medida")!;
const OTHER_SERVICES = SERVICES.filter((s) => s !== FEATURED_SERVICE);

/**
 * Servicios — mismo criterio editorial que "Impacto" en el caso de estudio
 * de Civil Control: nada de grid de cards parejas. Un servicio destacado
 * con más peso visual (card grande) + el resto como lista editorial
 * compacta sobre un riel (border-l), sin cajas. Ver
 * CLAUDE.md § "Servicios — layout específico".
 */
export default function Services() {
  return (
    <section id="servicios" className="bg-bg bg-dot-grid py-16 lg:py-28">
      <Container>
        <Reveal>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            Qué puedo hacer por vos
          </p>
          <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            Servicios
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[60%_40%] lg:gap-12">
          <Reveal>
            <div className="group h-full rounded-2xl bg-surface p-8 shadow-sm transition-all duration-200 sm:p-10 md:hover:-translate-y-0.5 md:hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 transition-colors duration-200 md:group-hover:bg-brand/15">
                <FEATURED_SERVICE.icon className="h-7 w-7 text-brand transition-transform duration-200 md:group-hover:scale-110" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold text-ink sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
                {FEATURED_SERVICE.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                {FEATURED_SERVICE.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col border-l border-brand/20 pl-6 sm:pl-8">
              {OTHER_SERVICES.map((service, i) => (
                <div key={service.title} className={i > 0 ? "mt-8" : ""}>
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 shrink-0 text-brand/70" />
                    <h4 className="font-heading text-base font-semibold text-ink sm:text-lg">
                      {service.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mini-proceso "Cómo trabajo" — sin tarjetas, para que se lea como
            un sub-bloque distinto de la grid de servicios de arriba. */}
        <div className="mt-16 lg:mt-24">
          <Reveal>
            <h3 className="font-heading text-xl font-semibold text-ink sm:text-2xl">
              Cómo trabajo
            </h3>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="group flex items-start gap-4 sm:block">
                  <span className="font-heading text-2xl font-semibold text-brand/30 transition-colors duration-200 group-hover:text-brand/50 sm:text-3xl">
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
