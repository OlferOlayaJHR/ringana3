"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Boxes,
  FileUp,
  Gauge,
  PackageSearch,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/maestro-productos", label: "Maestro productos", icon: Boxes },
  { href: "/cargue-archivos", label: "Cargue archivos", icon: FileUp },
  { href: "/movimientos", label: "Movimientos", icon: ClipboardList },
  { href: "/conciliacion", label: "Conciliacion", icon: ArrowLeftRight },
  { href: "/alertas", label: "Alertas", icon: AlertTriangle },
  { href: "/reportes-cortes", label: "Reportes y cortes", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[296px] shrink-0 border-r border-brand-border bg-white/95 px-5 py-6 backdrop-blur xl:block">
      <div className="rounded-2xl bg-brand-gradient p-5 text-white shadow-brand-soft">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">Louis x Ringana</p>
        <h1 className="mt-2 text-xl font-semibold leading-tight">Inventory Conciliation Suite</h1>
        <p className="mt-2 text-sm text-white/80">Control operativo y financiero con trazabilidad total.</p>
      </div>

      <nav className="mt-8 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-brand-navy text-white shadow-brand-panel"
                  : "text-brand-text-secondary hover:bg-brand-bg hover:text-brand-text",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-brand-border bg-brand-bg p-4">
        <div className="flex items-center gap-2 text-brand-text">
          <PackageSearch className="h-4 w-4 text-brand-indigo" />
          <p className="text-sm font-semibold">Corte activo</p>
        </div>
        <p className="mt-2 text-xl font-semibold text-brand-navy">31 Mar 2026</p>
        <p className="mt-1 text-xs text-brand-text-secondary">Ultima sincronizacion 08:20 AM</p>
      </div>
    </aside>
  );
}


