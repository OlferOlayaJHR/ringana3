import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Ringana Inventory Conciliation",
  description: "Mockup enterprise para control y conciliacion de inventarios Ringana.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}


