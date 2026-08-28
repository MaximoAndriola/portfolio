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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Soy desarrollador full-stack de Mar del Plata. Construyo software
            a medida — desde páginas web hasta sistemas de gestión completos —
            con una mirada que viene de haber trabajado también en la
            administración y gestión de organizaciones. Esa combinación es la
            que más valor le da a lo que hago: no solo escribo código,
            entiendo cómo funciona un negocio por dentro antes de tocar una
            línea, así el sistema que construyo se ajusta a cómo trabajás de
            verdad, no al revés. Hoy además estoy construyendo mi propio
            producto, Prodizzi, aplicando esa misma lógica: identificar un
            problema real y resolverlo con tecnología.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
