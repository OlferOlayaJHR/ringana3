import Link from "next/link";
import { ActivityTimeline } from "@/components/shared/activity-timeline";
import { ValueComparisonChart, WeeklyConciliationChart } from "@/components/shared/charts";
import { EmptyState } from "@/components/shared/empty-state";
import { KpiCard } from "@/components/shared/kpi-card";
import { LoadingState } from "@/components/shared/loading-state";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { reconciliationRows } from "@/data/mock-data";
import { formatDelta, formatMoney, formatPercent, formatUnits } from "@/lib/format";
import { summarizeReconciliation } from "@/lib/inventory";

export default function DashboardPage() {
  const summary = summarizeReconciliation(reconciliationRows);
  const topDiff = [...reconciliationRows]
    .sort((a, b) => Math.abs(b.valueDiff) - Math.abs(a.valueDiff))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Lotes conciliados"
          value={formatPercent(summary.conciledRate)}
          helper={`${summary.conciledSkus} de ${summary.totalSkus} alineados entre fuentes`}
          tone="success"
          trend={1.3}
        />
        <KpiCard
          title="Diferencia en unidades"
          value={formatUnits(summary.diffUnits)}
          helper="Brecha consolidada entre SIESA y bodega"
          tone="critical"
          trend={-12.2}
        />
        <KpiCard
          title="Impacto economico"
          value={formatMoney(summary.diffValue)}
          helper="Valor pendiente de conciliacion"
          tone="critical"
          trend={-34.4}
        />
        <KpiCard
          title="Lotes criticos"
          value={formatUnits(summary.criticalSkus)}
          helper={`${summary.warningSkus} en seguimiento preventivo`}
          trend={-18.7}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel
          title="Tendencia de conciliacion semanal"
          subtitle="Progreso de cierre operativo y reduccion de diferencias en valor"
          action={<StatusBadge tone="success">Ritmo favorable</StatusBadge>}
        >
          <WeeklyConciliationChart />
        </Panel>

        <Panel
          title="Comparativo mensual de valor inventario"
          subtitle="Referencial para analisis financiero entre SIESA y bodega"
        >
          <ValueComparisonChart />
        </Panel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel
          title="Top diferencias por valor"
          subtitle="Prioridad recomendada para comite operativo"
          action={
            <Link
              href="/conciliacion"
              className="rounded-lg border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-text-secondary transition hover:bg-brand-bg"
            >
              Ir a conciliacion
            </Link>
          }
        >
          <div className="overflow-hidden rounded-2xl border border-brand-border">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Importacion</th>
                  <th>Producto</th>
                  <th>Diferencia uds</th>
                  <th>Diferencia valor</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {topDiff.map((row) => (
                  <tr key={`${row.sku}-${row.importNumber}`}>
                    <td className="font-semibold text-brand-navy">{row.sku}</td>
                    <td>{row.importNumber}</td>
                    <td>{row.name}</td>
                    <td>{formatDelta(row.unitDiff)}</td>
                    <td>{formatMoney(row.valueDiff)}</td>
                    <td>
                      <StatusBadge
                        tone={
                          row.state === "critical" ? "critical" : row.state === "warning" ? "warning" : "success"
                        }
                      >
                        {row.state}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Timeline operativo" subtitle="Eventos clave de carga y conciliacion de la jornada">
          <ActivityTimeline />
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Estado de carga simulado" subtitle="Visual de skeleton para flujos de espera">
          <LoadingState />
        </Panel>
        <Panel title="Estado vacio" subtitle="Caso sin incidencias pendientes en modulo">
          <EmptyState
            title="No hay tareas pendientes de aprobacion"
            description="Cuando la conciliacion este limpia, los items cerrados se veran en historico y esta vista quedara sin acciones abiertas."
          />
        </Panel>
      </section>
    </div>
  );
}


