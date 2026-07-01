import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "⚽ Máquina do Tempo do Futebol",
  description:
    "Reescreva os momentos mais traumáticos da história do futebol mundial. Sorteie lendas, monte sua linha do tempo e mude o placar.",
  openGraph: {
    title: "Máquina do Tempo do Futebol",
    description:
      "Volte no tempo e reescreva o 7×1, o Maracanazo e as maiores tragédias do futebol.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0e1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`dark ${display.variable} ${sans.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
