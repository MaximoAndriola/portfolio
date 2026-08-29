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

export const metadata: Metadata = {
  title: "Maximo Andriola — Desarrollo de software en Mar del Plata",
  description:
    "Desarrollo páginas web y sistemas a medida para que tu negocio ahorre tiempo y deje de depender de planillas sueltas.",
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
