"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

/**
 * Nav sticky, solo desktop (≥768px, spec pide no agregar menú en mobile).
 * Fondo transparente hasta que se scrollea, después blur + color de fondo.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 hidden transition-colors duration-300 md:block ${
        scrolled ? "bg-surface/80 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <a
            href="#inicio"
            className="group font-heading text-lg font-semibold text-ink"
          >
            Maximo
            <span className="text-brand transition-transform duration-300 inline-block group-hover:rotate-[20deg]">
              .
            </span>
          </a>
          <ul className="flex items-center gap-8 text-sm font-medium text-muted">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group/link relative inline-block py-1 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover/link:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
