"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "@/components/icons";
import type { ProjectImage } from "@/lib/projectImages";

type LightboxProps = {
  images: ProjectImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Modal a pantalla completa para ampliar una captura. Se monta vía portal
 * en document.body para no depender del stacking context del carrusel
 * (BrowserFrame, transforms de hover, etc.) — así el fondo oscuro siempre
 * cubre toda la pantalla sin importar dónde vive el carrusel en el DOM.
 */
export default function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const count = images.length;
  const goNext = () => onIndexChange((index + 1) % count);
  const goPrev = () => onIndexChange((index - 1 + count) % count);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && count > 1) goNext();
      if (e.key === "ArrowLeft" && count > 1) goPrev();
    };
    document.addEventListener("keydown", onKeyDown);

    // Evita que la página de atrás scrollee mientras el lightbox está abierto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  const image = images[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface/15 text-surface shadow-sm transition-colors hover:bg-surface/25"
      >
        <XIcon className="h-5 w-5" />
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/15 text-surface shadow-sm transition-colors hover:bg-surface/25 sm:left-6"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}

      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1600}
          height={1000}
          className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain shadow-2xl"
        />
      </div>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Imagen siguiente"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/15 text-surface shadow-sm transition-colors hover:bg-surface/25 sm:right-6"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}

      {count > 1 && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-surface/70">
          {index + 1} / {count}
        </p>
      )}
    </div>,
    document.body
  );
}
