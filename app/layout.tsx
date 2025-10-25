import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roots - Innovación desde la raíz",
  description:
    "Transformamos ideas en soluciones que generan impacto. Desarrollamos MVPs funcionales y escalables.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
