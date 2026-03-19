import Link from "next/link";
import { ArrowLeftRight, Filter, TriangleAlert } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { reconciliationRows } from "@/data/mock-data";
import { formatDateTime, formatDelta, formatMoney, formatPercent, formatUnits } from "@/lib/format";
import { summarizeReconciliation } from "@/lib/inventory";

export default function ReconciliationPage() {
  const summary = summarizeReconciliation(reconciliationRows);
  const sortedRows = [...reconciliationRows].sort((a, b) => Math.abs(b.valueDiff) - Math.abs(a.valueDiff));
  const variancePercent = (summary.diffValue / 105346.8) * 100;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-brand-border bg-white p-7 shadow-brand-panel">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-brand-gradient opacity-95 lg:block" />
        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-secondary">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Motor de conciliacion activo
            </div>
            <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-brand-text lg:text-4xl">
              Conciliacion SIESA vs Bodega: control de unidades y valor en una sola vista
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-brand-text-secondary">
              Esta pantalla concentra la diferencia operacional critica del negocio: valida stock, prioriza
              inconsistencias y traduce brechas a impacto economico para acelerar decisiones.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge tone="critical">{summary.criticalSkus} SKUs criticos</StatusBadge>
              <StatusBadge tone="warning">{summary.warningSkus} en seguimiento</StatusBadge>
              <StatusBadge tone="success">{formatPercent(summary.conciledRate)} conciliado</StatusBadge>
            </div>
          </div>

          <div className="relative rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur lg:bg-transparent">
            <p className="text-xs uppercase tracking-[0.16em] text-white/80">Impacto consolidado al corte</p>
            <p className="mt-3 text-4xl font-semibold">{formatMoney(summary.diffValue)}</p>
            <p className="mt-2 text-sm text-white/85">Variacion equivalente al {formatPercent(variancePercent)} del inventario valorizado.</p>
            <div className="mt-5 h-2.5 rounded-full bg-white/25">
              <div className="h-full rounded-full bg-white" style={{ width: `${Math.min(variancePercent * 18, 100)}%` }} />
            </div>
            <p className="mt-2 text-xs text-white/75">Objetivo interno: mantener brecha por debajo de 0.8%</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Diferencia unidades"
          value={formatUnits(summary.diffUnits)}
          helper="Suma absoluta entre ambas fuentes"
          tone="critical"
        />
        <KpiCard
          title="Diferencia valor"
          value={formatMoney(summary.diffValue)}
          helper="Impacto financiero pendiente"
          tone="critical"
        />
        <KpiCard
          title="Items conciliados"
          value={formatUnits(summary.conciledSkus)}
          helper="SKUs sin desviacion relevante"
          tone="success"
        />
        <KpiCard
          title="Ultimo sync"
          value="08:20"
          helper="Conector bodega en ejecucion"
        />
      </section>

      <Panel
        title="Matriz comparativa de conciliacion"
        subtitle="Comparacion SKU a SKU entre SIESA y bodega externa con priorizacion automatica"
        action={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-text-secondary hover:bg-brand-bg">
              <Filter className="h-3.5 w-3.5" />
              Filtrar criticos
            </button>
            <button className="rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-indigo">
              Exportar reporte
            </button>
          </div>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-brand-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Linea</th>
                <th>SIESA</th>
                <th>Bodega</th>
                <th>Diff uds</th>
                <th>Costo</th>
                <th>Diff valor</th>
                <th>Ult sync</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.sku} className="hover:bg-brand-bg/70">
                  <td className="font-semibold text-brand-navy">{row.sku}</td>
                  <td>{row.name}</td>
                  <td>{row.line}</td>
                  <td>{formatUnits(row.siesaUnits)}</td>
                  <td>{formatUnits(row.warehouseUnits)}</td>
                  <td className={row.unitDiff > 0 ? "text-rose-700" : row.unitDiff < 0 ? "text-amber-700" : "text-emerald-700"}>
                    {formatDelta(row.unitDiff)}
                  </td>
                  <td>{formatMoney(row.unitCost)}</td>
                  <td className={row.valueDiff > 0 ? "text-rose-700" : row.valueDiff < 0 ? "text-amber-700" : "text-emerald-700"}>
                    {formatMoney(row.valueDiff)}
                  </td>
                  <td>{formatDateTime(row.lastSyncAt)}</td>
                  <td>
                    <StatusBadge
                      tone={row.state === "critical" ? "critical" : row.state === "warning" ? "warning" : "success"}
                    >
                      {row.state}
                    </StatusBadge>
                  </td>
                  <td>
                    <Link href={`/productos/${row.sku}`} className="text-sm font-semibold text-brand-indigo hover:underline">
                      Analizar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Panel title="Recomendaciones operativas" subtitle="Acciones sugeridas por impacto de diferencia">
          <ul className="space-y-3 text-sm text-brand-text-secondary">
            <li className="rounded-xl border border-brand-border bg-brand-bg p-4">
              <p className="font-semibold text-brand-text">1. Validar picking de RIN-NUT-022 en bodega externa</p>
              <p className="mt-1">Diferencia de 62 unidades con impacto de {formatMoney(675.8)}.</p>
            </li>
            <li className="rounded-xl border border-brand-border bg-brand-bg p-4">
              <p className="font-semibold text-brand-text">2. Revisar latencia de registro de salidas para RIN-NUT-050</p>
              <p className="mt-1">Existe desfase temporal entre despacho fisico y actualizacion SIESA.</p>
            </li>
            <li className="rounded-xl border border-brand-border bg-brand-bg p-4">
              <p className="font-semibold text-brand-text">3. Programar conteo ciclico en linea Skincare</p>
              <p className="mt-1">Reducir recurrencia de variaciones menores en items de alta rotacion.</p>
            </li>
          </ul>
        </Panel>

        <Panel title="Riesgo operativo" subtitle="Semaforo de atencion para comite diario">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700">
              <TriangleAlert className="h-4 w-4" />
              Riesgo medio-alto por 2 SKUs criticos
            </p>
            <p className="mt-2 text-sm text-rose-700/90">
              La diferencia acumulada en valor puede afectar cierre de costo de ventas si no se concilia antes del corte
              financiero.
            </p>
          </div>
          <div className="mt-4 rounded-2xl border border-brand-border bg-brand-bg p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-text-secondary">Tiempo objetivo de resolucion</p>
            <p className="mt-2 text-2xl font-semibold text-brand-text">24 horas</p>
            <p className="mt-1 text-sm text-brand-text-secondary">SLA interno para alertas con impacto mayor a USD 300.</p>
          </div>
        </Panel>
      </section>
    </div>
  );
}


