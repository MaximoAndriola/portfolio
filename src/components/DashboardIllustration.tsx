/**
 * Elemento de firma del hero: composición abstracta de tarjetas superpuestas
 * en CSS puro (sin imágenes externas) que sugiere un dashboard, sin datos ni
 * texto real. Ver CLAUDE.md § "Elemento de firma".
 *
 * En mobile se esconde la tarjeta de gráfico de barras y quedan 2 tarjetas
 * (lista + progreso) en vez de 3, como pide el spec, reusando el mismo
 * markup en vez de duplicar el componente.
 */
export default function DashboardIllustration() {
  return (
    <div
      className="relative h-56 w-full sm:h-64 lg:h-[380px]"
      role="img"
      aria-label="Ilustración abstracta de un panel de control, representando software a medida"
    >
      {/* Tarjeta trasera: gráfico de barras chico — solo desktop/tablet */}
      <div
        className="absolute right-0 top-2 hidden w-[62%] -rotate-3 rounded-xl bg-surface p-4 shadow-lg sm:block lg:top-4 lg:p-5"
        aria-hidden="true"
      >
        <div className="mb-3 h-2 w-1/3 rounded-full bg-bg" />
        <div className="flex h-16 items-end gap-2 lg:h-24">
          <div className="h-[45%] w-full rounded-t-sm bg-brand/30" />
          <div className="h-[70%] w-full rounded-t-sm bg-brand/50" />
          <div className="h-[55%] w-full rounded-t-sm bg-brand/40" />
          <div className="h-[90%] w-full rounded-t-sm bg-accent" />
          <div className="h-[65%] w-full rounded-t-sm bg-brand/60" />
        </div>
      </div>

      {/* Tarjeta media: lista de 3 líneas */}
      <div
        className="absolute left-0 top-6 w-[66%] rotate-2 rounded-xl bg-surface p-4 shadow-lg sm:top-10 sm:w-[58%] lg:top-16 lg:w-[56%] lg:p-5"
        aria-hidden="true"
      >
        <div className="mb-3.5 h-2 w-2/5 rounded-full bg-bg" />
        <div className="space-y-2.5">
          <div className="h-2 w-full rounded-full bg-bg" />
          <div className="h-2 w-4/5 rounded-full bg-bg" />
          <div className="h-2 w-3/5 rounded-full bg-bg" />
        </div>
      </div>

      {/* Tarjeta frontal: mini barra de progreso */}
      <div
        className="absolute bottom-1 left-[12%] w-[58%] -rotate-1 rounded-xl bg-surface p-4 shadow-xl sm:bottom-3 sm:left-[18%] sm:w-[50%] lg:bottom-6 lg:left-[20%] lg:p-5"
        aria-hidden="true"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2 w-1/4 rounded-full bg-bg" />
          <div className="h-2 w-6 rounded-full bg-accent/60" />
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-bg">
          <div className="h-full w-3/5 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
