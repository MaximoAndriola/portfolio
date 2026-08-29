import { getProjectImages, type ProjectImage } from "@/lib/projectImages";

export type CaseStudy = {
  slug: string;
  title: string;
  /** Bajada corta del header de la página de caso de estudio. */
  tagline: string;
  /** Copy del teaser en la sección Proyectos del home (subtítulo, descripción, nota). */
  homeSubtitle: string;
  homeDescription: string;
  homeNote: string;
  reversed: boolean;
  images: ProjectImage[];
  /** Vacíos = todavía no hay case study completo (ver Prodizzi). */
  problem: string;
  solution: string;
  /** Fila por fila del comparativo Antes/Después. Vacío = se salta la sección. */
  beforeAfter: { before: string; after: string }[];
  /**
   * Pasos numerados de "Cómo funciona". Vacío = se salta la sección — solo
   * la usan proyectos donde tiene sentido explicar un flujo paso a paso
   * (por ahora, Prodizzi; Civil Control no la lleva).
   */
  howItWorks: string[];
  roleAndProcess: string;
  /** headline/subline = columna editorial grande; stats = riel de números. */
  impact: { headline: string; subline: string; stats: { value: string; label: string }[] };
  ctaLine: string;
  /** Si es false, el home no linkea a /proyectos/<slug> todavía. */
  hasFullCaseStudy: boolean;
};

const CIVIL_CONTROL_ALT: Record<string, string> = {
  "civil-control-1.png":
    "Panel principal de módulos de Civil Control: personal, vehículos, taller, clientes e informes",
  "civil-control-2.png":
    "Centro de informes de Civil Control con reportes disponibles por categoría",
  "civil-control-3.png":
    "Reporte de egresos de Civil Control con montos y sectores anonimizados",
  "civil-control-4.png": "Configuración de roles y permisos por módulo en Civil Control",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "civil-control",
    title: "Civil Control",
    tagline: "Sistema de gestión integral para ESEA S.A.",
    homeSubtitle: "Sistema de gestión para ESEA S.A.",
    homeDescription:
      "Sistema de gestión integral que la empresa usa a diario para manejar personal, flota de vehículos, seguros, ventas y compras, todo centralizado, sin planillas sueltas.",
    homeNote: "Capturas con datos de ejemplo por confidencialidad del cliente",
    reversed: false,
    images: getProjectImages({
      folder: "civil-control",
      prefix: "civil-control",
      label: "Civil Control",
      altByFile: CIVIL_CONTROL_ALT,
    }),
    problem:
      "Antes de Civil Control, ESEA S.A. gestionaba personal, vehículos, seguros, ventas y compras en múltiples hojas de Excel separadas entre sí, sin normalizar. Los vencimientos de seguros y documentación se controlaban con anotaciones a mano, sin ningún tipo de alerta automática. Armar un reporte de ganancias y pérdidas sectorizado por área implicaba horas de cálculo manual cada vez que se necesitaba.",
    solution:
      "Civil Control centraliza cada área de la empresa —personal, flota de vehículos, seguros, ventas y compras— como partes de un mismo sistema, no como planillas aisladas. Envía notificaciones automáticas por mail ante vencimientos próximos, y genera reportes detallados y sectorizados con unos pocos clicks, en lugar de horas de cálculo manual. Es un sistema multi-tenant, preparado para adaptarse a la operación de distintas empresas, no limitado al caso de una sola flota — en ESEA S.A. hoy gestiona alrededor de 50 empleados y 60 vehículos.",
    // Textos cortos a propósito: van dentro de tarjetitas chicas en el
    // díptico Antes/Después, no en filas de oración completa.
    beforeAfter: [
      { before: "Excels sin normalizar", after: "Sistema único y centralizado" },
      { before: "Vencimientos a mano, sin alertas", after: "Notificaciones automáticas por mail" },
      { before: "Horas de cálculo manual", after: "Reportes en segundos" },
      { before: "Información dispersa", after: "Visión completa del negocio" },
    ],
    howItWorks: [],
    roleAndProcess:
      "El desarrollo arrancó en agosto de 2025. Empecé liderando el backend y la API, y con el tiempo tomé el desarrollo completo del proyecto de punta a punta. La primera versión estable se lanzó en abril de 2026, y desde entonces el sistema sigue recibiendo actualizaciones con nuevas funcionalidades.",
    impact: {
      headline: "Un sistema, listo para escalar a cualquier empresa",
      subline:
        "Es multi-tenant: no depende de la operación de una sola flota, está preparado para adaptarse a cómo trabaja cada empresa.",
      stats: [
        { value: "~50", label: "empleados" },
        { value: "~60", label: "vehículos" },
        { value: "Abril 2026", label: "en uso activo" },
      ],
    },
    ctaLine: "¿Necesitás algo parecido para tu negocio? Escribime.",
    hasFullCaseStudy: true,
  },
  {
    slug: "prodizzi",
    title: "Prodizzi",
    tagline: "Detección automática de cobros duplicados y errores en resúmenes bancarios",
    homeSubtitle: "Mi proyecto propio",
    homeDescription:
      "Una app que analiza tus resúmenes bancarios y detecta automáticamente cobros duplicados o movimientos sospechosos, y te arma el texto listo para hacer el reclamo al banco.",
    // Sin nota — la de Civil Control existe porque es info real (datos de
    // ejemplo por confidencialidad); acá no hay nada que aclarar todavía.
    homeNote: "",
    reversed: true,
    images: getProjectImages({ folder: "prodizzi", prefix: "prodizzi", label: "Prodizzi" }),
    problem:
      "La idea de Prodizzi nació de un caso concreto: en mi propio resumen bancario apareció un cobro duplicado por una entrada de cine, que el sistema que estaba desarrollando reconoció automáticamente. Ese momento fue el que me confirmó que no era solo una idea interesante — era una herramienta realmente útil, porque ese tipo de error pasa desapercibido todo el tiempo cuando se revisa un resumen a simple vista.",
    solution:
      "Prodizzi analiza resúmenes bancarios en PDF de bancos y billeteras argentinas (Brubank, Mercado Pago, Cuenta DNI/Banco Provincia), detecta automáticamente cobros duplicados y movimientos sospechosos, y genera el texto del reclamo listo para enviar — vos decidís cuándo y cómo mandarlo, el sistema nunca actúa por su cuenta.",
    // Prodizzi es un proyecto propio, en desarrollo activo, sin cliente ni
    // "antes" corporativo que comparar — por eso no lleva el díptico
    // Antes/Después que sí tiene Civil Control.
    beforeAfter: [],
    howItWorks: [
      "Subís tu resumen en PDF",
      "El sistema extrae y clasifica cada movimiento",
      "Detecta duplicados y casos a verificar automáticamente",
      "Te arma el texto de reclamo, listo para copiar y enviar",
    ],
    roleAndProcess:
      "Prodizzi es mi proyecto propio, desarrollado en solitario de punta a punta: backend, frontend, motor de detección y toda la arquitectura. El desarrollo arrancó el 6 de agosto de 2025, y lleva completados 5 sprints, cubriendo el motor de detección completo, el frontend, el sistema de suscripciones, y el flujo de onboarding.",
    impact: {
      // Los 4 datos pedidos no se dividen en headline/subline/stats de
      // forma explícita: se reparten para mantener el mismo tratamiento
      // editorial que Civil Control (texto grande + riel de números) sin
      // perder ninguno de los 4 hechos.
      headline: "Motor de detección con IA integrada",
      subline: "Compatible con resúmenes de Brubank, Mercado Pago y Cuenta DNI (Banco Provincia).",
      stats: [
        { value: "102", label: "tests automatizados" },
        { value: "5", label: "sprints completados" },
      ],
    },
    ctaLine: "¿Necesitás algo parecido para tu negocio? Escribime.",
    hasFullCaseStudy: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
