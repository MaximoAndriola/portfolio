import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import BrowserFrame from "@/components/ui/BrowserFrame";

/**
 * Muestra la captura real si el archivo ya existe en /public, o un
 * placeholder prolijo con la misma proporción si todavía no fue subida.
 * Ver CLAUDE.md § "Assets e imágenes": no bloquear el desarrollo por esto.
 */
export default function ProjectMedia({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  return (
    <BrowserFrame>
      <div className="relative aspect-[16/10] w-full bg-bg">
        {exists ? (
          <Image src={src} alt={alt} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
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
        )}
      </div>
    </BrowserFrame>
  );
}
