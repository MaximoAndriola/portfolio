"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AboutPanel from "@/components/AboutPanel";

// Rutas absolutas con ancla (no "#servicios" a secas): así el nav funciona
// igual desde el home que desde una página de caso de estudio, sin
// depender de estar ya parado en "/".
const LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#contacto", label: "Contacto" },
];

/**
 * Nav sticky. La lista de links sigue siendo solo desktop (≥768px, spec
 * pide no agregar menú en mobile) — pero el header en sí ahora es visible
 * en todos los tamaños porque "Maximo." (trigger de AboutPanel) es un
 * elemento único y persistente, no parte del menú. Fondo transparente
 * hasta que se scrollea, después blur + color de fondo.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // En un dispositivo sin hover real (mobile), el toque no tiene forma de
  // "mostrar antes" la animación del punto como sí pasa en desktop al
  // pasar el mouse — por eso ahí se retrasa un toque la apertura del panel,
  // lo justo para que se alcance a ver el punto dibujando el subrayado
  // antes de que el panel tape todo. En desktop (hover: hover) abre directo,
  // total el hover ya mostró la animación antes del click.
  const openAbout = () => {
    const canHover =
      typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
    if (canHover) {
      setAboutOpen(true);
    } else {
      setTimeout(() => setAboutOpen(true), 220);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-surface/80 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <button
            type="button"
            onClick={openAbout}
            aria-label="Sobre mí"
            className="maximo-trigger relative inline-block font-heading text-lg font-semibold text-ink"
          >
            Maximo
            <span className="maximo-dot" aria-hidden="true" />
          </button>

          <ul className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group/link relative inline-block py-1 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover/link:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} />}
    </header>
  );
}
