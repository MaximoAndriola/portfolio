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
  roleAndProcess: string;
  /** featured = la celda grande del bento; items = las 3 celdas chicas. */
  impact: { featured: string; items: string[] };
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
    beforeAfter: [
      {
        before: "Múltiples Excels desordenados y sin normalizar entre sí",
        after:
          "Un sistema único que conecta personal, flota, seguros, ventas y compras como una sola unidad",
      },
      {
        before: "Vencimientos controlados a mano, sin ningún tipo de alerta",
        after: "Notificaciones automáticas por mail antes de que algo venza",
      },
      {
        before: "Horas de cálculo manual para armar un reporte de ganancias y pérdidas",
        after: "Reportes sectorizados generados en segundos, con un par de clicks",
      },
      {
        before: "Información dispersa, sin una vista completa de la empresa",
        after: "Un solo lugar con visión real y centralizada de toda la operación",
      },
    ],
    roleAndProcess:
      "El desarrollo arrancó en agosto de 2025. Empecé liderando el backend y la API, y con el tiempo tomé el desarrollo completo del proyecto de punta a punta. La primera versión estable se lanzó en abril de 2026, y desde entonces el sistema sigue recibiendo actualizaciones con nuevas funcionalidades.",
    impact: {
      featured: "Sistema multi-tenant, preparado para adaptarse a distintas empresas",
      items: [
        "~50 empleados gestionados",
        "~60 vehículos bajo control",
        "En producción desde abril 2026",
      ],
    },
    ctaLine: "¿Necesitás algo parecido para tu negocio? Escribime.",
    hasFullCaseStudy: true,
  },
  {
    slug: "prodizzi",
    title: "Prodizzi",
    tagline: "Mi proyecto propio",
    homeSubtitle: "Mi proyecto propio",
    homeDescription:
      "Una app que analiza tus resúmenes bancarios y detecta automáticamente cobros duplicados o movimientos sospechosos, y te arma el texto listo para hacer el reclamo al banco.",
    // Sin nota — la de Civil Control existe porque es info real (datos de
    // ejemplo por confidencialidad); acá no hay nada que aclarar todavía.
    homeNote: "",
    reversed: true,
    images: getProjectImages({ folder: "prodizzi", prefix: "prodizzi", label: "Prodizzi" }),
    // Todavía sin case study completo — copy pendiente en un próximo prompt.
    problem: "",
    solution: "",
    beforeAfter: [],
    roleAndProcess: "",
    impact: { featured: "", items: [] },
    ctaLine: "¿Tenés un proyecto en mente? Escribime.",
    hasFullCaseStudy: false,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
