import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileWhatsAppFab from "@/components/MobileWhatsAppFab";

// Tipografía — ver CLAUDE.md § "Tipografía y escala".
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const TITLE = "Maximo Andriola — Desarrollo de software en Mar del Plata";
const DESCRIPTION =
  "Desarrollo páginas web y sistemas a medida para que tu negocio ahorre tiempo y deje de depender de planillas sueltas.";

// Dominio propio todavía sin registrar (ver CLAUDE.md § "Dominio") — mientras
// tanto se resuelve solo en Vercel (VERCEL_URL) o localhost en desarrollo,
// así og:image/twitter:image quedan con una URL absoluta válida sin
// hardcodear un dominio que todavía no existe.
const SITE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Maximo Andriola",
    // Mismo sistema visual del hero: fondo con dot-grid, nombre, lema e
    // ilustración abstracta simplificada. Ver public/og-image.png.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maximo Andriola — Transformo ineficiencias operativas en procesos escalables",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased">
        {/* Nav, footer y el FAB de WhatsApp viven acá (no en cada page) para
            que se compartan entre el home y las páginas de caso de estudio
            en /proyectos/[slug]. */}
        <Nav />
        {children}
        <Footer />
        <MobileWhatsAppFab />
      </body>
    </html>
  );
}
