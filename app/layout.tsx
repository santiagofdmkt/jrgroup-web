import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotonWhatsApp from "@/components/BotonWhatsApp";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "JR Group | Prepagas y coberturas médicas",
  description:
    "Compará prepagas y elegí la mejor cobertura médica para vos y tu familia. Asesoramiento gratis y sin compromiso.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BotonWhatsApp />
      </body>
    </html>
  );
}