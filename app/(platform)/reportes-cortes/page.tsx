"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { cutSnapshots } from "@/data/mock-data";
import { formatDate, formatMoney, formatPercent, formatUnits } from "@/lib/format";

export default function ReportsCutsPage() {
  const [selectedDate, setSelectedDate] = useState(cutSnapshots[0]?.cutDate ?? "");

  const selectedSnapshot = useMemo(
    () => cutSnapshots.find((snapshot) => snapshot.cutDate === selectedDate),
    [selectedDate],
  );

  return (
    <div className="space-y-6">
      <Panel
        title="Reporte por fecha de corte"
        subtitle="Consulta consolidada de inventario y conciliacion segun fecha seleccionada"
        action={
          <StatusBadge tone={selectedSnapshot ? "success" : "warning"}>
            {selectedSnapshot ? "Corte encontrado" : "Sin datos para la fecha"}
          </StatusBadge>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-brand-border bg-brand-gradient p-6 text-white shadow-brand-soft">
            <p className="text-xs uppercase tracking-[0.18em] text-white/75">Resultado del corte</p>
            <h2 className="mt-3 text-3xl font-semibold">
              {selectedSnapshot ? `Estado del inventario al ${formatDate(selectedSnapshot.cutDate)}` : "No existe snapshot para la fecha"}
            </h2>
            <p className="mt-3 text-sm text-white/85">
              Selecciona una fecha de corte para consultar unidades, valor de inventario y diferencia consolidada.
            </p>
            {selectedSnapshot ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/75">Unidades</p>
                  <p className="mt-1 text-2xl font-semibold">{formatUnits(selectedSnapshot.totalUnits)}</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/75">Valor inventario</p>
                  <p className="mt-1 text-2xl font-semibold">{formatMoney(selectedSnapshot.totalValue)}</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/75">Diferencia unidades</p>
                  <p className="mt-1 text-2xl font-semibold">{formatUnits(selectedSnapshot.diffUnits)}</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/75">Conciliado</p>
                  <p className="mt-1 text-2xl font-semibold">{formatPercent(selectedSnapshot.conciledPercent)}</p>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/90">
                No se encontro informacion para la fecha seleccionada. Verifica que corresponda a un cierre cargado.
              </div>
            )}
          </article>

          <article className="rounded-2xl border border-brand-border bg-brand-bg p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-text-secondary">Busqueda por fecha</p>
            <div className="mt-4 space-y-4">
              <label className="block text-xs uppercase tracking-[0.12em] text-brand-text-secondary" htmlFor="cut-date">
                Fecha de corte
              </label>
              <input
                id="cut-date"
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-medium text-brand-text outline-none focus:border-brand-navy"
              />
              <div className="rounded-xl border border-brand-border bg-white p-4 text-sm text-brand-text-secondary">
                {selectedSnapshot ? (
                  <>
                    <p className="font-semibold text-brand-text">Fecha consultada: {formatDate(selectedSnapshot.cutDate)}</p>
                    <p className="mt-1">SKUs criticos: {selectedSnapshot.criticalSkus}</p>
                    <p className="mt-1">Diferencia valorizada: {formatMoney(selectedSnapshot.diffValue)}</p>
                  </>
                ) : (
                  <p>No hay resultados para la fecha seleccionada.</p>
                )}
              </div>
              <p className="text-xs text-brand-text-secondary">
                Este modulo opera unicamente por consulta de fecha de corte.
              </p>
            </div>
          </article>
        </div>
      </Panel>
    </div>
  );
}
