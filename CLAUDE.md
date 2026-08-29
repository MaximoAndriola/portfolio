# CLAUDE.md — Landing personal de Maximo

## Quién soy
Soy Maximo, desarrollador full-stack de Mar del Plata, Argentina. Construyo
software a medida para empresas y pymes: sistemas de gestión, páginas web, y
herramientas propias impulsadas por IA (como Prodizzi, ver abajo).

## Objetivo de esta landing
Página de una sola pantalla (single-page) pensada para gente que llega
escaneando un QR desde una tarjeta física que reparto en negocios de mi
ciudad. El público NO es técnico: son dueños de pymes, comercios,
profesionales independientes. El objetivo único de la página es que me
escriban por WhatsApp.

## Estructura obligatoria (de arriba hacia abajo)
1. **Hero**: nombre + una frase clara de qué resuelvo (sin jerga técnica) +
   badge de plazo de entrega + botón grande y visible de WhatsApp.
2. **Servicios**: 3-4 bullets de qué puedo hacer, en lenguaje de resultado
   para el negocio, no de tecnología (nada de "stack", "backend", "API" acá).
3. **Proyectos** (dos bloques, mismo formato cada uno):
   - Civil Control (ERP para ESEA S.A.)
   - Prodizzi (proyecto propio)
4. **Contacto**: WhatsApp (CTA repetido), mail, y LinkedIn como referencia
   secundaria — no como acción principal.
5. **Footer** simple: nombre, ciudad, año.

## Tono
Hablarle al dueño de un negocio, no a un reclutador ni a otro programador.
Cercano pero profesional. Frases cortas. Cero jerga técnica en el copy
visible.

## Reglas estrictas
- NUNCA usar datos reales de ESEA S.A. (nombres, montos, patentes, clientes) en
  ningún texto ni imagen. Las capturas de Civil Control ya vienen editadas
  o con datos de ejemplo — no generar ni sugerir contenido con datos reales.
- El CTA principal en TODA la página es WhatsApp. LinkedIn y mail son
  secundarios.
- Diseño mobile-first: la enorme mayoría entra desde el QR con el celular.
- Sin formularios largos. Nada que agregue fricción antes del WhatsApp.

## Identidad visual y layout responsive (seguir esto exactamente — no improvisar)

Esta página ES la demostración de lo que sé construir. Un dueño de pyme
que la vea tiene que pensar "quiero algo así para mi negocio". Por eso el
resultado no puede leerse como una landing genérica armada con un template
— tiene que sentirse diseñada a medida y ejecutada con precisión.

### Paleta
- Fondo base: `#F5F6F8` (gris muy claro, frío — NO usar crema/beige)
- Fondo alterno de sección: `#FFFFFF` (para alternar secciones y generar
  separación visual sin usar líneas divisorias)
- Texto principal: `#14171F` (casi negro, tono azulado)
- Color de marca: `#1D4E89` (azul profundo — confianza/tecnología)
- Acento: `#E8A33D` (ámbar cálido, solo para detalles chicos: eyebrows,
  bordes de badges, un acento en la ilustración del hero)
- Texto secundario: `#6B7280`
- Botón de WhatsApp: verde oficial `#25D366` (única excepción a la
  paleta de marca — es instantáneamente reconocible como "acción de
  contacto", conviene mantenerlo así)

### Tipografía y escala
- Títulos: `Space Grotesk`, peso 600-700, uso moderado (nunca todo en
  mayúscula ni todo en negrita).
- Cuerpo: `Inter`. Cargar ambas con `next/font` (sin salto de layout).
- Escala tipográfica (mobile → desktop):
  - H1 (hero): `2.25rem/1.15` → `4rem/1.1`
  - H2 (título de sección): `1.75rem/1.2` → `2.5rem/1.15`
  - Body: `1rem/1.6` → `1.125rem/1.6`
  - Eyebrow/label: `0.8125rem`, uppercase, tracking amplio, en `#6B7280`
  - Badge/monospace: `0.8125rem`, fuente monospace del sistema

### Grid, breakpoints y espaciado
- Breakpoints estándar de Tailwind: `sm 640px / md 768px / lg 1024px / xl 1280px`.
- Contenedor central: `max-width: 1120px`, padding horizontal `24px` en
  mobile, `32px` en tablet, `48px` en desktop.
- Padding vertical entre secciones: `64px` en mobile, `112–128px` en
  desktop — el espacio generoso es lo que hace sentir "profesional" en
  vez de "apretado".
- Alineación de texto: **izquierda**, no centrada — un layout centrado en
  todo se lee como plantilla genérica; alineado a la izquierda con
  jerarquía clara se lee como estudio de diseño real.

### Hero — layout específico

**Mobile (< 1024px), apilado en una columna:**
```
┌───────────────────────────┐
│ [badge: 5-7 días]         │
│                           │
│ ¡Hola! Soy Maximo         │  ← H1, Space Grotesk
│                           │
│ Desarrollo páginas web... │  ← subtítulo
│                           │
│ [ Escribime por WhatsApp ]│  ← botón verde, ancho generoso
│                           │
│  ┌─────────────────────┐ │
│  │  ilustración         │ │  ← ver "Elemento de firma" abajo,
│  │  abstracta chica      │ │     versión simplificada
│  └─────────────────────┘ │
└───────────────────────────┘
```

**Desktop (≥ 1024px), dos columnas, 60/40:**
```
┌─────────────────────────────────────────────────────────┐
│  [badge: 5-7 días]                                       │
│                                                            │
│  ¡Hola! Soy Maximo              ┌───────────────────────┐ │
│  Desarrollo páginas web y       │                       │ │
│  sistemas a medida para que     │   ilustración          │ │
│  tu negocio ahorre tiempo...    │   abstracta del        │ │
│                                  │   "producto"           │ │
│  [Escribime por WhatsApp]       │   (ver abajo)          │ │
│  Ver proyectos ↓                └───────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Elemento de firma — ilustración abstracta de "producto"
Esto es lo que hace que la página no se sienta vivecodeada: en vez de una
foto o un ícono genérico, construir una composición de 3-4 tarjetas
superpuestas en SVG/CSS puro (sin imágenes externas), en tonos de la
paleta, representando de forma abstracta un dashboard: una tarjeta con
una mini barra de progreso, otra con 3 líneas simulando una lista, otra
con un gráfico de barras chico. Bordes redondeados (`12px`), sombras
suaves, ligera rotación/offset entre tarjetas para dar profundidad. Nada
de datos ni texto real ahí — es una composición geométrica, no un
screenshot. En mobile se muestra una versión más chica y simplificada
(2 tarjetas en vez de 3-4) debajo del CTA, nunca antes que el texto.

Esta ilustración es la única pieza "decorativa" de toda la página — el
resto se mantiene sobrio a propósito para que ésta se destaque.

### Servicios — layout específico
- **Mobile:** 1 columna, tarjetas apiladas, full width.
- **Desktop (≥ 768px):** grid de 2x2. Cada tarjeta: ícono simple (SVG
  trazo fino, no emoji, no ícono de librería genérica tipo Font Awesome),
  título corto, una línea de descripción. Padding generoso (`32px`),
  fondo blanco sobre el fondo gris de la sección, sombra sutil
  (`shadow-sm`), hover con leve elevación (`translateY(-2px)` +
  aumento de sombra) solo en desktop.

### Proyectos — layout específico
- **Mobile:** imagen arriba (o placeholder con la misma proporción),
  título y descripción debajo, todo full width, un bloque debajo del
  otro.
- **Desktop (≥ 1024px):** layout en zigzag — Civil Control con imagen a
  la izquierda y texto a la derecha; Prodizzi invertido (imagen a la
  derecha, texto a la izquierda). Esto rompe la monotonía de dos bloques
  idénticos apilados y ayuda a que cada proyecto se lea como un caso
  distinto, no como una lista repetida.
- Las imágenes (o placeholders) van dentro de un frame tipo "ventana de
  navegador": barra superior fina con 3 puntitos decorativos a la
  izquierda, borde redondeado (`12px`), sombra suave. Esto hace que
  incluso el placeholder se vea intencional y prolijo, no como una caja
  vacía.

### Contacto — layout específico
- **Mobile y desktop:** bloque centrado dentro del contenedor (no full
  width), `max-width: 480px`. Botón de WhatsApp grande arriba, mail y
  LinkedIn debajo como línks secundarios más chicos, con íconos de trazo
  fino, no botones con el mismo peso visual que el de WhatsApp.

### Footer
- **Mobile:** texto centrado, apilado.
- **Desktop:** `flex justify-between` — nombre/ciudad a la izquierda,
  nada más a la derecha (mantenerlo minimalista, no agregar links de
  redes que no están definidos).

### Motion (sutil, no decorativo de más)
- Al cargar: hero con fade + slight slide-up escalonado en sus elementos
  (badge → título → subtítulo → botón), delays cortos entre cada uno
  (~80-120ms).
- Al scrollear: cada sección aparece con un fade + slide-up leve al
  entrar en viewport (una sola vez, no repetido).
- Hover en tarjetas y botones: transición suave (150-200ms), nunca
  animaciones que se disparen solas de forma continua (nada de blobs
  flotando, nada de gradientes animados).
- Respetar siempre `prefers-reduced-motion: reduce`.

### Qué evitar explícitamente (para que no se vea genérico)
- Nada de gradiente morado/rosa/azul difuminado de fondo.
- Nada de emojis grandes como ilustración principal.
- Nada de iconografía de librerías default sin editar (Font Awesome
  "tal cual").
- Nada de texto centrado en todas las secciones.
- Nada de bordes con `border-radius` exagerado tipo "burbuja" (mantener
  `8-16px` consistente en toda la página).

## Stack técnico
Next.js (React, App Router) + TypeScript + Tailwind CSS. Deploy en Vercel.

Elegido pensando en dos cosas: estética rápida de lograr con Tailwind, y
escalabilidad futura — cuando se sume la sección de turnos/consultas
(formulario + notificación por mail a Maximo + confirmación al cliente),
se resuelve con una API route de Next.js dentro del mismo proyecto, sin
necesidad de otro backend.

## Configuración inicial del proyecto
```
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
Usar `npm` como package manager (no yarn/pnpm). Para previsualizar mientras
se trabaja: `npm run dev` y abrir `localhost:3000`.

## Assets e imágenes
Las capturas van en:
- `/public/images/civil-control/civil-control-1.png`, `civil-control-2.png`
  (agregar más numerando correlativo si hace falta)
- `/public/images/prodizzi/prodizzi-1.png`, `prodizzi-2.png`

**Si estos archivos todavía no existen cuando arranques a codear**: no
bloquear el resto del desarrollo por esto. Construir esa sección con cajas
placeholder prolijas (mismo tamaño/aspect-ratio que va a tener la imagen
real, con un texto tipo "Captura próximamente") y seguir avanzando con el
resto de la página. Usar siempre `next/image` para las imágenes reales.

## Datos de contacto (usar tal cual en el copy)
- WhatsApp: +54 9 223 424-3399 (personal, temporal — cambiar cuando haya
  número de empresa)
- Mail: maximoandriola2017@gmail.com (personal, temporal — cambiar cuando
  haya mail de empresa)
- LinkedIn: https://www.linkedin.com/in/maximo-andriola/

**Formato del link de WhatsApp (usar en TODOS los botones de WhatsApp):**
```
https://wa.me/5492234243399?text=Hola%20Maximo%2C%20vi%20tu%20p%C3%A1gina%20y%20quiero%20consultarte%20sobre%20un%20proyecto
```
(mensaje prellenado para bajar la fricción de "no sé qué escribir" que
frena a mucha gente antes de escribir)

## SEO y metadatos
- `<title>`: "Maximo Andriola — Desarrollo de software en Mar del Plata"
- `<meta description>`: una línea corta basada en el subtítulo del hero.
- Favicon simple: iniciales "MA" o un ícono tipo `</>`, lo que se pueda
  generar rápido como SVG.
- Idioma de la página: `es-AR`.

## Accesibilidad y responsive
- Mobile-first siempre (la mayoría entra desde el QR con el celular).
- Foco visible en todos los elementos interactivos (botones, links).
- Respetar `prefers-reduced-motion` si se agrega alguna animación.
- Botón de WhatsApp con tamaño de tap cómodo (mínimo 44x44px).

## Git y deploy
- **Importante: yo (Maximo) no voy a comitear nada manualmente durante esta
  sesión — voy a estar en el gimnasio, controlando esto desde el celular.
  El agente es responsable de ir haciendo commits a medida que avanza,
  sin esperar que se lo pida.** No dejar cambios sin comitear al final de
  cada bloque de trabajo terminado (por ejemplo: apenas el hero esté
  funcionando, comitear; no esperar a tener toda la página lista).
- Trabajar directo sobre `main`, sin ramas — es día uno de un proyecto
  solo, sin dominio ni clientes viendo la página todavía, así que no hay
  necesidad de gitflow ni de ramas por feature hoy.
- **Convención de mensajes de commit** (liviana, no estricta, tipo
  Conventional Commits):
  - `feat: ...` → algo nuevo (ej. `feat: agregar sección de servicios`)
  - `fix: ...` → corrección de un error (ej. `fix: corregir espaciado del hero en mobile`)
  - `style: ...` → ajustes puramente visuales (ej. `style: ajustar paleta de colores`)
  - `chore: ...` → setup, configuración, tareas sin código de producto (ej. `chore: setup inicial del proyecto`)
  - Commits chicos y frecuentes, no un commit gigante al final. Cada
    commit debe dejar el proyecto en un estado que compile/funcione — no
    comitear código a medio romper.
- Conectar el repo a Vercel una sola vez al principio (import desde
  GitHub) para que cada push genere una preview URL automática — así
  Maximo puede revisar el resultado desde el celular sin depender de
  tener `npm run dev` corriendo.
- Dominio: pendiente de registrar (`.com.ar` vía NIC Argentina + evaluar
  `.com` vía Namecheap/Cloudflare). Mientras tanto, usar el subdominio
  gratuito que asigna Vercel.

## Feature futura (no bloquea el lanzamiento de hoy)
Sección de "agendar turno/consulta": formulario con datos del cliente →
notificación por mail a Maximo → mail de confirmación automático al
cliente. Se puede resolver con una API route de Next.js + un servicio de
envío de mails (ej. Resend). No implementar hoy, pero tenerlo en mente al
estructurar el proyecto para que sumarlo después sea simple.

## Qué hacer ante decisiones no definidas acá
Si aparece algo que este documento no cubre (un texto, un detalle visual,
un comportamiento), elegir la opción más simple y razonable, dejar un
comentario corto en el código explicando la decisión, y seguir avanzando.
No frenar el trabajo esperando confirmación — es una sesión sin mucha
posibilidad de ida y vuelta.

## Checklist de "listo para hoy" (no es necesario terminar todo)
- [ ] Proyecto creado y corriendo en local
- [ ] Hero con nombre, subtítulo, badge de plazo, ilustración abstracta, y botón de WhatsApp (mobile apilado, desktop 60/40)
- [ ] Sección de servicios con los 4 bullets (mobile 1 columna, desktop grid 2x2)
- [ ] Bloques de Civil Control y Prodizzi en zigzag en desktop (con placeholders tipo "ventana de navegador" si faltan imágenes)
- [ ] Sección de contacto con los 3 datos reales, centrada y con jerarquía clara
- [ ] Verificado visualmente en al menos dos anchos: ~375px (mobile) y ~1440px (desktop)
- [ ] Deploy conectado a Vercel con preview URL funcionando

## Contenido de referencia
Ver `copy-landing.md` en este mismo repo para los textos ya redactados de
cada sección. Usar ese copy como base, no inventar textos nuevos salvo que
falte algo.
