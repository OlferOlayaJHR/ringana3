import Link from "next/link";
import { ArrowRight, Building2, LineChart, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Control unificado SIESA + bodega",
    description:
      "Consolidacion diaria de maestro, entradas, salidas y despachos tercerizados en una sola vista operativa.",
    icon: Building2,
  },
  {
    title: "Conciliacion con impacto economico",
    description:
      "Deteccion inmediata de diferencias de unidades y valor para priorizar acciones financieras y de abastecimiento.",
    icon: LineChart,
  },
  {
    title: "Trazabilidad para auditoria",
    description:
      "Historial por SKU, fechas de corte y estados de resolucion para soporte contable y operativo.",
    icon: ShieldCheck,
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-bg">
      <div className="pointer-events-none absolute inset-0 bg-mesh-grid" />
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-border bg-white/80 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-text-secondary">Louis Consulting</p>
            <p className="text-lg font-semibold text-brand-text">Ringana Inventory Control Suite</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-brand-border px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-bg"
            >
              Ver dashboard
            </Link>
            <Link
              href="/conciliacion"
              className="rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-indigo"
            >
              Ver conciliacion
            </Link>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-brand-gradient p-8 text-white shadow-brand-soft lg:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Mockup comercial de alta fidelidad</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight lg:text-5xl">
              Plataforma de control y conciliacion de inventarios para Ringana
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/82">
              Producto visual premium para demo ejecutiva: integra datos de SIESA y bodega externa, detecta
              inconsistencias de unidades y costos, y acelera decisiones operativas y financieras.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white/90"
              >
                Entrar al producto
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/reportes-cortes"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Revisar cortes historicos
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-brand-panel">
              <p className="text-xs uppercase tracking-[0.16em] text-brand-text-secondary">Resultado esperado</p>
              <p className="mt-3 text-3xl font-semibold text-brand-text">93.7% conciliado</p>
              <p className="mt-2 text-sm text-brand-text-secondary">
                Estado de inventario al corte de 31 marzo con diferencia valor controlada.
              </p>
            </div>
            <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-brand-panel">
              <p className="text-xs uppercase tracking-[0.16em] text-brand-text-secondary">Impacto</p>
              <p className="mt-3 text-3xl font-semibold text-brand-text">USD 1.3k</p>
              <p className="mt-2 text-sm text-brand-text-secondary">
                Brecha detectada para cierre operativo y conciliacion financiera.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-brand-border bg-white p-6 shadow-brand-panel">
                <div className="inline-flex rounded-xl bg-brand-bg p-2 text-brand-indigo">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-brand-text">{item.title}</h2>
                <p className="mt-2 text-sm text-brand-text-secondary">{item.description}</p>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}


