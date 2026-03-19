import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { cutSnapshots, reconciliationRows } from "@/data/mock-data";
import { formatDate, formatMoney, formatPercent, formatUnits } from "@/lib/format";

export default function ReportsCutsPage() {
  const selected = cutSnapshots[0];
  const majorDiff = [...reconciliationRows]
    .filter((row) => row.unitDiff !== 0)
    .sort((a, b) => Math.abs(b.valueDiff) - Math.abs(a.valueDiff))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <Panel
        title="Reporte por fecha de corte"
        subtitle="Snapshot ejecutivo para control de inventario, costos y estado de conciliacion"
        action={<StatusBadge tone="info">Cierre mensual</StatusBadge>}
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-brand-border bg-brand-gradient p-6 text-white shadow-brand-soft">
            <p className="text-xs uppercase tracking-[0.18em] text-white/75">Snapshot seleccionado</p>
            <h2 className="mt-3 text-3xl font-semibold">Estado del inventario al 31 de marzo</h2>
            <p className="mt-3 text-sm text-white/85">
              Unidades, valor y diferencias consolidadas para soporte de decisiones operativas y financieras.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-white/75">Unidades</p>
                <p className="mt-1 text-2xl font-semibold">{formatUnits(selected.totalUnits)}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-white/75">Valor inventario</p>
                <p className="mt-1 text-2xl font-semibold">{formatMoney(selected.totalValue)}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-white/75">Diferencia unidades</p>
                <p className="mt-1 text-2xl font-semibold">{formatUnits(selected.diffUnits)}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-white/75">Estado conciliado</p>
                <p className="mt-1 text-2xl font-semibold">{formatPercent(selected.conciledPercent)}</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-brand-border bg-brand-bg p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-text-secondary">Selector visual de corte</p>
            <div className="mt-4 space-y-2">
              {cutSnapshots.map((snapshot, index) => (
                <button
                  key={snapshot.cutDate}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    index === 0
                      ? "border-brand-navy bg-white text-brand-navy shadow-brand-panel"
                      : "border-brand-border bg-white text-brand-text-secondary hover:bg-brand-bg"
                  }`}
                >
                  <p className="text-sm font-semibold">{formatDate(snapshot.cutDate)}</p>
                  <p className="text-xs">Diff valor: {formatMoney(snapshot.diffValue)}</p>
                </button>
              ))}
            </div>
          </article>
        </div>
      </Panel>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Panel title="Historico de cortes" subtitle="Evolucion de control y conciliacion por periodo">
          <div className="overflow-hidden rounded-2xl border border-brand-border">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fecha corte</th>
                  <th>Unidades</th>
                  <th>Valor</th>
                  <th>Diff uds</th>
                  <th>Diff valor</th>
                  <th>Conciliado</th>
                  <th>Criticos</th>
                </tr>
              </thead>
              <tbody>
                {cutSnapshots.map((snapshot) => (
                  <tr key={snapshot.cutDate}>
                    <td className="font-semibold text-brand-navy">{formatDate(snapshot.cutDate)}</td>
                    <td>{formatUnits(snapshot.totalUnits)}</td>
                    <td>{formatMoney(snapshot.totalValue)}</td>
                    <td>{formatUnits(snapshot.diffUnits)}</td>
                    <td>{formatMoney(snapshot.diffValue)}</td>
                    <td>{formatPercent(snapshot.conciledPercent)}</td>
                    <td>
                      <StatusBadge tone={snapshot.criticalSkus > 2 ? "warning" : "success"}>
                        {snapshot.criticalSkus}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="SKUs con mayor impacto al corte" subtitle="Prioridad de investigacion para cierre contable">
          <div className="space-y-3">
            {majorDiff.map((row, index) => (
              <article key={row.sku} className="rounded-xl border border-brand-border bg-brand-bg p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-text">
                    {index + 1}. {row.name}
                  </p>
                  <StatusBadge tone={row.state === "critical" ? "critical" : "warning"}>{row.state}</StatusBadge>
                </div>
                <p className="mt-1 text-xs text-brand-text-secondary">{row.sku}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <p className="text-brand-text-secondary">Diff uds: {formatUnits(Math.abs(row.unitDiff))}</p>
                  <p className="font-semibold text-brand-text">Diff valor: {formatMoney(Math.abs(row.valueDiff))}</p>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}


