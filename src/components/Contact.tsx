import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ProjectRequestForm from "@/components/ProjectRequestForm";
import { CONTACT } from "@/lib/constants";
import { MailIcon, LinkedInIcon } from "@/components/icons";

/**
 * Contacto — bloque centrado (max-width 480px), no full width. WhatsApp
 * como CTA grande arriba; mail y LinkedIn como links secundarios más chicos.
 * Ver CLAUDE.md § "Contacto — layout específico".
 */
export default function Contact() {
  return (
    <section id="contacto" className="bg-bg bg-dot-grid py-16 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[480px] text-left">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
            Contacto
          </p>
          <h2 className="mt-2 font-heading text-[1.75rem] leading-tight font-semibold text-ink sm:text-4xl">
            Contame tu proyecto y te paso un presupuesto
          </h2>
          <p className="mt-3 text-sm text-muted">
            Sin compromiso. Te respondo a la brevedad.
          </p>

          <WhatsAppButton location="contacto" className="mt-6 w-full" />

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
            >
              <MailIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
            >
              <LinkedInIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
              LinkedIn
            </a>
          </div>

          <ProjectRequestForm />
        </Reveal>
      </Container>
    </section>
  );
}
