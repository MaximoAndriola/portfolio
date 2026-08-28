import Container from "@/components/ui/Container";

/**
 * Footer — mobile centrado y apilado; desktop flex justify-between.
 * Ver CLAUDE.md § "Footer": minimalista, sin links de redes extra.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface py-8">
      <Container>
        <div className="flex flex-col items-center gap-1 text-center text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
          <p>Maximo · Desarrollador de software</p>
          <p>
            Mar del Plata, Argentina · {year}
          </p>
        </div>
      </Container>
    </footer>
  );
}
