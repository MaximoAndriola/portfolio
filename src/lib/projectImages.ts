import fs from "node:fs";
import path from "node:path";

export type ProjectImage = { src: string; alt: string };

type GetProjectImagesOptions = {
  /** Carpeta dentro de public/images, ej. "civil-control". */
  folder: string;
  /** Prefijo de archivo a buscar: <prefix>-<n>.(png|jpg|jpeg|webp). */
  prefix: string;
  /** Nombre legible para el alt genérico de fallback. */
  label: string;
  /** Alt a medida por nombre de archivo — si falta, usa el fallback genérico. */
  altByFile?: Record<string, string>;
  /** Archivos a excluir a propósito (ej. por datos sensibles). */
  exclude?: string[];
};

/**
 * Escanea public/images/<folder> buscando <prefix>-<n>.<ext> y arma la
 * lista ordenada numéricamente (2 antes que 10). No hardcodea una cantidad
 * fija: si mañana se suma civil-control-5.png, aparece solo. Si la carpeta
 * no existe o no hay archivos que matcheen, devuelve [] — el carrusel
 * entonces muestra el placeholder "Captura próximamente".
 */
export function getProjectImages({
  folder,
  prefix,
  label,
  altByFile = {},
  exclude = [],
}: GetProjectImagesOptions): ProjectImage[] {
  const dir = path.join(process.cwd(), "public", "images", folder);
  if (!fs.existsSync(dir)) return [];

  const pattern = new RegExp(`^${prefix}-(\\d+)\\.(png|jpe?g|webp)$`, "i");
  const excluded = new Set(exclude);

  return fs
    .readdirSync(dir)
    .filter((file) => pattern.test(file) && !excluded.has(file))
    .map((file) => ({ file, n: parseInt(file.match(pattern)![1], 10) }))
    .sort((a, b) => a.n - b.n)
    .map(({ file, n }) => ({
      src: `/images/${folder}/${file}`,
      alt: altByFile[file] ?? `Captura ${n} de ${label}`,
    }));
}
