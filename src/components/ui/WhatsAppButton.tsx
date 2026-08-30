"use client";

import { track } from "@vercel/analytics";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons";

type WhatsAppButtonProps = {
  size?: "lg" | "md";
  className?: string;
  children?: React.ReactNode;
  /**
   * Dónde vive este botón (hero, contacto, cta final de un caso de
   * estudio...) — viaja como propiedad del evento "whatsapp_click" en
   * Vercel Analytics para poder ver, no solo cuánta gente clickea, sino
   * desde qué parte del sitio.
   */
  location: string;
};

/**
 * CTA principal de toda la página. El verde de WhatsApp es la única
 * excepción a la paleta de marca — ver CLAUDE.md § "Paleta".
 *
 * Texto blanco sobre #1DA851 (~3.1:1 de contraste): decisión explícita del
 * cliente por sobre el criterio de WCAG AA estricto (4.5:1) — ver historial,
 * quedó documentado que se optó a propósito por mantener texto blanco.
 *
 * whatsapp-cta (globals.css) agrega el grano fino y un pulso de sombra muy
 * sutil en idle, compartida con MobileWhatsAppFab para no duplicar esa
 * lógica. El grano vive en un span interno aparte (whatsapp-cta__grain)
 * — ver el comentario en globals.css sobre por qué no puede compartir
 * overflow:hidden con el botón que lleva el pulso de sombra.
 */
export default function WhatsAppButton({
  size = "lg",
  className = "",
  children = "Escribime por WhatsApp",
  location,
}: WhatsAppButtonProps) {
  const sizeClasses =
    size === "lg"
      ? "px-7 py-4 text-base sm:text-lg"
      : "px-5 py-3 text-sm sm:text-base";

  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location })}
      className={`whatsapp-cta group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-xl bg-whatsapp font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-whatsapp-hover hover:shadow-lg active:scale-[1.02] active:shadow-lg ${sizeClasses} ${className}`}
    >
      <span aria-hidden="true" className="whatsapp-cta__grain" />
      <WhatsAppIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      {children}
    </a>
  );
}
