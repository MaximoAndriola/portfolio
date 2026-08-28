"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BrowserFrame from "@/components/ui/BrowserFrame";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { ProjectImage } from "@/lib/projectImages";

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Carrusel de capturas para un proyecto, dentro del mismo frame tipo
 * "ventana de navegador" de siempre (BrowserFrame no se toca).
 *
 * - Cantidad de imágenes dinámica: recibe la lista ya armada por
 *   getProjectImages, no hay un número hardcodeado en ningún lado.
 * - 0 imágenes -> placeholder "Captura próximamente" (mismo que antes).
 * - 1 imagen -> se muestra fija, sin flechas/puntos/autoplay.
 * - 2+ imágenes -> autoplay cada AUTOPLAY_MS con slide suave, flechas,
 *   puntos, swipe en touch. Se pausa con hover (desktop) o al tocar
 *   (mobile). Respeta prefers-reduced-motion: no arranca el autoplay y
 *   muestra la primera imagen fija (la navegación manual sigue andando).
 */
export default function ProjectCarousel({ images, title }: { images: ProjectImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Lazy initializer (no un efecto): esto no afecta nada del render/markup,
  // solo la condición del autoplay más abajo, así que no hay riesgo de
  // mismatch de hidratación entre server y cliente.
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const touchStartX = useRef<number | null>(null);

  const count = images.length;

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused, reducedMotion]);

  if (count === 0) {
    return (
      <BrowserFrame>
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-bg text-muted">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className="h-8 w-8 opacity-50"
            aria-hidden="true"
          >
            <rect x="3" y="4.5" width="18" height="15" rx="2" />
            <circle cx="9" cy="10" r="1.75" />
            <path d="m21 16-5.5-5.5-9.5 9.5" />
          </svg>
          <span className="text-sm">Captura próximamente</span>
        </div>
      </BrowserFrame>
    );
  }

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true); // en mobile, tocar pausa el autoplay definitivamente
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <BrowserFrame>
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-bg"
        style={{ touchAction: "pan-y" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Capturas de ${title}`}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ width: `${count * 100}%`, transform: `translateX(-${index * (100 / count)}%)` }}
        >
          {images.map((img) => (
            <div key={img.src} className="relative h-full shrink-0" style={{ width: `${100 / count}%` }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={img === images[0]}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink opacity-70 shadow-sm transition-opacity duration-200 hover:bg-surface md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink opacity-70 shadow-sm transition-opacity duration-200 hover:bg-surface md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-2 border-t border-bg bg-surface py-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver imagen ${i + 1} de ${count}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-5 bg-brand" : "w-1.5 bg-brand/25 hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      )}
    </BrowserFrame>
  );
}
