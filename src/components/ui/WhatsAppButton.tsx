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
 * Texto/ícono en text-ink (no blanco): blanco sobre #25D366 da 1.98:1 de
 * contraste, muy por debajo del 4.5:1 que pide WCAG AA. Con ink (#14171F)
 * el contraste sube a ~9:1 sin tocar el verde de marca.
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
      className={`group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-xl bg-whatsapp font-semibold text-ink shadow-sm transition-all duration-200 hover:bg-whatsapp-hover hover:shadow-md active:scale-[0.98] ${sizeClasses} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      {children}
    </a>
  );
}
