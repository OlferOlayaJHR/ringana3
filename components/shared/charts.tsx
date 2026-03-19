import { monthlyComparison, weeklyTrend } from "@/data/mock-data";
import { formatMoney, formatPercent } from "@/lib/format";

export function WeeklyConciliationChart() {
  const maxDiff = Math.max(...weeklyTrend.map((item) => item.diffValue));

  return (
    <div className="space-y-4">
      {weeklyTrend.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-brand-text">{item.label}</span>
            <span className="text-brand-text-secondary">{formatPercent(item.conciled)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-brand-bg-alt">
            <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${item.conciled}%` }} />
          </div>
          <div className="text-xs text-brand-text-secondary">
            Diferencia valor: {formatMoney(item.diffValue)} ({Math.round((item.diffValue / maxDiff) * 100)}% del maximo)
          </div>
        </div>
      ))}
    </div>
  );
}

export function ValueComparisonChart() {
  const maxValue = Math.max(...monthlyComparison.map((item) => Math.max(item.siesa, item.warehouse)));

  return (
    <div className="grid grid-cols-3 gap-4">
      {monthlyComparison.map((item) => (
        <div key={item.month} className="rounded-xl border border-brand-border bg-brand-bg p-4">
          <p className="text-sm font-semibold text-brand-text">{item.month}</p>
          <div className="mt-3 flex items-end gap-2">
            <div className="flex w-full items-end gap-2">
              <div className="flex-1 rounded-t-md bg-brand-navy" style={{ height: `${(item.siesa / maxValue) * 120}px` }} />
              <div className="flex-1 rounded-t-md bg-brand-indigo/80" style={{ height: `${(item.warehouse / maxValue) * 120}px` }} />
            </div>
          </div>
          <div className="mt-3 space-y-1 text-xs text-brand-text-secondary">
            <p>SIESA: {formatMoney(item.siesa)}</p>
            <p>Bodega: {formatMoney(item.warehouse)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


