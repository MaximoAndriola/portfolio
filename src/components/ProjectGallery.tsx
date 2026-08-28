"use client";

import { useState } from "react";
import Image from "next/image";
import BrowserFrame from "@/components/ui/BrowserFrame";

type GalleryImage = { src: string; alt: string };

/**
 * Igual que ProjectMedia pero para un proyecto con varias capturas reales:
 * mismo frame tipo "ventana de navegador", con selector de puntos abajo
 * para pasar entre imágenes (crossfade), sin flechas ni carrusel pesado —
 * prioriza verse prolijo con pocas capturas antes que un componente
 * complejo.
 */
export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <BrowserFrame>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className={`pointer-events-none object-cover transition-opacity duration-500 ease-out md:group-hover:scale-105 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 border-t border-bg bg-surface py-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver: ${img.alt}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? "w-5 bg-brand" : "w-1.5 bg-brand/25 hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      )}
    </BrowserFrame>
  );
}
