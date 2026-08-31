"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@/components/icons";

/**
 * Panel deslizante con una historia personal corta, disparado por
 * "Maximo." en el header (ver Nav.tsx). Mismo patrón de portal + Escape +
 * bloqueo de scroll que Lightbox.tsx, con el agregado de foco atrapado y
 * devuelto al trigger — acá sí hace falta: es un diálogo con texto para
 * leer, no una imagen que se cierra al toque.
 *
 * Entra en dos pasos (mount en estado "cerrado" → rAF → estado "abierto")
 * para que la transición realmente se vea; sin eso no hay from/to y
 * aparece directo. Eso es justo lo que pide prefers-reduced-motion, y ya
 * lo resuelve gratis la regla global de globals.css (transition-duration
 * a ~0), no hace falta duplicar la lógica acá.
 *
 * Contenido y trato tipográfico a propósito distintos de la sección
 * "Sobre mí" del cuerpo (About.tsx): acá no se repite la formación
 * académica (ya está ahí), no hay pull-quote con borde, y los tres
 * párrafos van al mismo tamaño — se lee como una carta corta, no como
 * texto editorial con jerarquía.
 */
export default function AboutPanel({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // Evita que la página de atrás scrollee mientras el panel está abierto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Sobre mí"
        className={`fixed inset-y-0 right-0 z-[110] w-[calc(100%-2rem)] max-w-[420px] overflow-y-auto bg-surface bg-dot-grid shadow-2xl transition-transform duration-300 ease-out md:w-[420px] ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg hover:text-ink"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <div className="px-6 pb-10 pt-20 sm:px-8">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            Quién soy
          </p>

          <div className="mt-4 space-y-6">
            <p className="text-base leading-[1.8] text-ink sm:text-lg">
              Soy de Mar del Plata, tomo mate mientras programo, y trabajo
              con la misma calma con la que lo tomo: sin apuro, pero sin
              soltar hasta que algo queda bien hecho.
            </p>
            <p className="text-base leading-[1.8] text-ink sm:text-lg">
              Para mí la creatividad sin responsabilidad es solo una buena
              idea que nunca llega a ningún lado. Por eso,{" "}
              <span className="font-semibold text-brand">
                cuando prometo un plazo, lo cumplo
              </span>{" "}
              — y si algo se atrasa, aviso antes de que me pregunten.
            </p>
            <p className="text-base leading-[1.8] text-ink sm:text-lg">
              No hay nadie más del otro lado de la pantalla: cada proyecto
              que tomo, lo llevo yo, de principio a fin.
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
