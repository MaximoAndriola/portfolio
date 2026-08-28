import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
