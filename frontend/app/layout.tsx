import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SaintGrove - Desarrollo de Software y Marketing Digital en Cali",
  description: "Especialistas en desarrollo web, software a medida, branding y campañas publicitarias. Transformamos ideas en soluciones digitales que impulsan tu negocio.",
  keywords: ["desarrollo web", "software a medida", "marketing digital", "branding", "Cali", "Colombia"],
  authors: [{ name: "SaintGrove" }],
  openGraph: {
    title: "SaintGrove - Transformamos Ideas en Soluciones Digitales",
    description: "Desarrollo web, software a medida, branding y campañas publicitarias en Cali, Colombia.",
    url: "https://saintgrove.net",
    siteName: "SaintGrove",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaintGrove - Desarrollo de Software y Marketing Digital",
    description: "Transformamos ideas en soluciones digitales que impulsan tu negocio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
