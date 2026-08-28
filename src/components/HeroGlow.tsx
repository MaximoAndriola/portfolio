/**
 * 2-3 formas circulares grandes y difuminadas detrás de la ilustración del
 * dashboard, con una deriva lenta en loop. Solo se usa en el hero.
 *
 * Puramente CSS (sin JS): las animaciones ya respetan prefers-reduced-motion
 * a través de la regla global en globals.css, que fuerza duration ~0 y un
 * solo ciclo, dejándolas en su posición de reposo.
 */
export default function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-[-15%] overflow-visible" aria-hidden="true">
      <div className="animate-drift-a absolute left-[6%] top-[4%] h-56 w-56 rounded-full bg-brand/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="animate-drift-b absolute right-[4%] top-[30%] h-48 w-48 rounded-full bg-accent/10 blur-3xl sm:h-64 sm:w-64" />
      <div className="animate-drift-c absolute bottom-[2%] left-[24%] h-44 w-44 rounded-full bg-brand/[0.08] blur-3xl sm:h-56 sm:w-56" />
    </div>
  );
}
