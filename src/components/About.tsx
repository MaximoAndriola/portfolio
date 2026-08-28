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
            Soy desarrollador full-stack, vivo en Mar del Plata y me dedico a
            construir software a medida: desde páginas web simples hasta
            sistemas de gestión completos. Vengo del mundo del desarrollo de
            sistemas complejos (trabajé en un ERP con varios módulos para una
            empresa real), y hoy también estoy construyendo mi propio
            producto, Prodizzi. Me gusta entender primero el problema real de
            cada negocio antes de escribir una sola línea de código.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
