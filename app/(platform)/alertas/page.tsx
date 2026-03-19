import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { alerts } from "@/data/mock-data";
import { formatDateTime, formatMoney } from "@/lib/format";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <Panel
        title="Alertas e inconsistencias"
        subtitle="Monitor de variaciones detectadas por el motor de conciliacion"
        action={<StatusBadge tone="warning">{alerts.length} alertas en seguimiento</StatusBadge>}
      >
        <div className="space-y-3">
          {alerts.map((alert) => (
            <article key={alert.id} className="rounded-2xl border border-brand-border bg-white p-5 shadow-brand-panel">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-brand-text-secondary">{alert.id}</p>
                  <h3 className="mt-1 text-lg font-semibold text-brand-text">{alert.title}</h3>
                  <p className="mt-2 text-sm text-brand-text-secondary">
                    SKU: <span className="font-medium text-brand-text">{alert.sku}</span> | Detectada: {formatDateTime(alert.detectedAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge tone={alert.severity === "high" ? "critical" : alert.severity === "medium" ? "warning" : "neutral"}>
                    {alert.severity}
                  </StatusBadge>
                  <StatusBadge tone={alert.status === "closed" ? "success" : alert.status === "open" ? "critical" : "info"}>
                    {alert.status}
                  </StatusBadge>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-brand-bg p-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-brand-text-secondary">Impacto valor</p>
                  <p className="mt-1 text-lg font-semibold text-brand-text">{formatMoney(alert.impactValue)}</p>
                </div>
                <div className="rounded-xl bg-brand-bg p-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-brand-text-secondary">Responsable</p>
                  <p className="mt-1 text-lg font-semibold text-brand-text">{alert.owner}</p>
                </div>
                <div className="rounded-xl bg-brand-bg p-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-brand-text-secondary">Siguiente accion</p>
                  <p className="mt-1 text-sm font-semibold text-brand-text">
                    {alert.status === "closed" ? "Sin accion" : "Validar diferencia y documentar ajuste"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}


