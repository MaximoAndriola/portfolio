import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 auto-agrega un bloque a CLAUDE.md/AGENTS.md en cada `next dev`
  // para agentes de IA. Lo desactivamos: CLAUDE.md ya es nuestro propio doc
  // de spec versionado, no queremos que una herramienta lo edite solo.
  agentRules: false,
};

export default nextConfig;
