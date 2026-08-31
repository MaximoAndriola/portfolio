import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Sobre mí — sección nueva entre el hero y servicios, no definida en el
 * wireframe original de CLAUDE.md. Queda en bg-surface (blanco), igual que
 * el hero: juntos leen como un bloque de "presentación", y recién Servicios
 * (gris) rompe la alternancia — más natural que forzar gris acá y perder el
 * contraste con Servicios inmediatamente después.
 */
export default function About() {
  return (
    <section id="sobre-mi" className="bg-surface bg-dot-grid py-16 lg:py-28">
      <Container>
        <Reveal>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            Quién soy
          </p>
          <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            Sobre mí
          </h2>
          {/* Editorial, no un bloque corrido: lede grande, cuerpo, un
              pull-quote con borde y color de marca, cuerpo de nuevo.
              text-ink en el lede (no muted) a propósito — es el único
              párrafo pensado para "engancha primero", el resto es texto
              de apoyo. space-y-5 da el ritmo vertical entre los cuatro
              sin repetir mt- en cada uno. */}
          <div className="mt-5 max-w-2xl space-y-5">
            <p className="text-[1.125rem] font-medium leading-relaxed text-ink sm:text-[1.25rem]">
              Soy desarrollador full-stack de Mar del Plata. Me recibí en
              Administración de Empresas y también en Programación — dos
              títulos que en general no van juntos, pero que para mí
              terminaron siendo el mismo camino.
            </p>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Construyo software a medida —desde páginas web hasta sistemas
              de gestión completos— con una mirada que viene de haber
              estudiado también cómo funciona una organización por dentro.
              No solo escribo código: entiendo primero el problema real de
              un negocio, y recién después empiezo a programar.
            </p>
            <p className="border-l-[3px] border-brand pl-5 font-heading text-[1.0625rem] font-medium leading-relaxed text-brand sm:pl-6">
              Esa combinación es la que más valor le da a lo que hago: el
              sistema que construyo se ajusta a cómo trabajás de verdad, no
              al revés.
            </p>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Hoy además estoy construyendo mi propio producto, Prodizzi,
              aplicando esa misma lógica: identificar un problema real y
              resolverlo con tecnología.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
