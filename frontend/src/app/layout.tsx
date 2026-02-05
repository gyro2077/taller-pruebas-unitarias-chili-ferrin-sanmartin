import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Core Bancario - Dashboard",
  description: "Sistema de gestión de Socios y Cuentas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
