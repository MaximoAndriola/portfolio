import Container from "@/components/ui/Container";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import DashboardIllustration from "@/components/DashboardIllustration";
import { ArrowDownIcon } from "@/components/icons";

/**
 * Hero — mobile apilado en una columna, desktop dos columnas 60/40.
 * Ver CLAUDE.md § "Hero — layout específico".
 */
export default function Hero() {
  return (
    <section className="bg-surface pb-16 pt-20 sm:pt-24 lg:pb-32 lg:pt-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[60%_40%] lg:gap-8">
          <div>
            <span
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-[0.8125rem] text-ink"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              Primera versión lista en 5 a 7 días
            </span>

            <h1
              className="animate-fade-up mt-5 font-heading text-[2.25rem] leading-[1.15] font-semibold text-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.1]"
              style={{ animationDelay: "90ms" }}
            >
              ¡Hola! Soy Maximo
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              Desarrollo páginas web y sistemas a medida para que tu negocio
              ahorre tiempo y deje de depender de planillas sueltas.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              style={{ animationDelay: "270ms" }}
            >
              <WhatsAppButton className="w-full sm:w-auto" />
              <a
                href="#proyectos"
                className="group hidden items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink lg:inline-flex"
              >
                Ver proyectos
                <ArrowDownIcon
                  className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-y-0.5"
                  strokeWidth="2.25"
                />
              </a>
            </div>
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <DashboardIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}
