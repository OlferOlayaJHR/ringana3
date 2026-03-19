"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CalendarClock, Search } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";

function titleFromPath(pathname: string) {
  if (pathname === "/dashboard") return "Dashboard ejecutivo";
  if (pathname === "/maestro-productos") return "Maestro de productos";
  if (pathname === "/cargue-archivos") return "Cargue de archivos";
  if (pathname === "/movimientos") return "Movimientos de inventario";
  if (pathname === "/conciliacion") return "Conciliacion SIESA vs Bodega";
  if (pathname === "/alertas") return "Alertas e inconsistencias";
  if (pathname === "/reportes-cortes") return "Reportes y fechas de corte";
  if (pathname.startsWith("/productos/")) return "Detalle de producto";
  return "Ringana inventory";
}

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-brand-border/80 bg-white/90 px-6 py-4 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-text-secondary">Plataforma operativa</p>
          <h2 className="text-xl font-semibold text-brand-text">{titleFromPath(pathname)}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-text-secondary lg:flex">
            <Search className="h-4 w-4" />
            Buscar SKU, lote o reporte
          </div>
          <Link
            href="/conciliacion"
            className="rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-indigo"
          >
            Revisar diferencias
          </Link>
          <button className="rounded-xl border border-brand-border p-2 text-brand-text-secondary transition hover:bg-brand-bg" aria-label="Notificaciones">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge tone="info">Sincronizacion activa</StatusBadge>
        <StatusBadge tone="success">Conciliado 93.7%</StatusBadge>
        <StatusBadge tone="warning">4 alertas abiertas</StatusBadge>
        <span className="inline-flex items-center gap-1 text-xs text-brand-text-secondary">
          <CalendarClock className="h-3.5 w-3.5" />
          Corte operativo: 31 marzo 2026
        </span>
      </div>
    </header>
  );
}


