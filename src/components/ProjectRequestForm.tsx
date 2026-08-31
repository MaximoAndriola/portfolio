"use client";

import { useState } from "react";
import { ArrowDownIcon, SpinnerIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = ["Páginas web", "Sistemas a medida", "Automatizaciones", "Otro"];

const INPUT_CLASS =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none sm:text-base";
const LABEL_CLASS = "block text-sm font-medium text-ink";

/**
 * Bloque secundario debajo del CTA de WhatsApp — colapsado por default a
 * propósito, para no competirle visualmente (ver CLAUDE.md § "Reglas
 * estrictas": WhatsApp es el CTA principal en toda la página). Un link de
 * texto lo despliega inline; nada de modal ni de navegar a otra página.
 *
 * Truco del grid-rows para el acordeón (0fr → 1fr + overflow-hidden en el
 * hijo) en vez de max-height con un valor mágico: anima a la altura real
 * del contenido sin medirla a mano. inert en el wrapper cuando está
 * cerrado saca los campos del orden de tabulación mientras son
 * invisibles — si no, quedan alcanzables con Tab aunque no se vean.
 */
export default function ProjectRequestForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
          // Honeypot — un humano nunca lo completa porque no lo ve. El
          // descarte silencioso pasa server-side, ver /api/contact.
          website: data.get("website"),
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-8 border-t border-ink/10 pt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="project-request-panel"
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-ink"
      >
        ¿Preferís dejar los detalles por escrito?
        <ArrowDownIcon
          className="h-4 w-4 -rotate-90 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth="2.25"
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div id="project-request-panel" inert={!open} className="pt-6">
            {status === "success" ? (
              <p className="rounded-xl bg-surface px-4 py-4 text-sm leading-relaxed text-ink">
                ¡Listo! Recibí tu mensaje — te voy a contactar a la
                brevedad.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot: invisible para una persona, no para un bot que
                    completa todos los inputs del form. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />

                <div>
                  <label htmlFor="name" className={LABEL_CLASS}>
                    Nombre y apellido
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={`mt-1.5 ${INPUT_CLASS}`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>
                    Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`mt-1.5 ${INPUT_CLASS}`}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={LABEL_CLASS}>
                    Teléfono / WhatsApp{" "}
                    <span className="font-normal text-muted">(opcional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`mt-1.5 ${INPUT_CLASS}`}
                  />
                </div>

                <div>
                  <label htmlFor="service" className={LABEL_CLASS}>
                    Tipo de servicio
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className={`mt-1.5 ${INPUT_CLASS}`}
                  >
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Contame tu proyecto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={20}
                    rows={4}
                    className={`mt-1.5 resize-none ${INPUT_CLASS}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "submitting" && (
                    <SpinnerIcon className="h-4 w-4 animate-spin" />
                  )}
                  {status === "submitting" ? "Enviando..." : "Enviar"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-600">
                    Uy, algo falló al enviar tu mensaje. Probá de nuevo o
                    escribime directo por WhatsApp.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
