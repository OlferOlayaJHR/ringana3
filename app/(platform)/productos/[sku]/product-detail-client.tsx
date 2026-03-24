"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDateTime, formatMoney, formatUnits } from "@/lib/format";
import { resolveDifference, startCorrection } from "@/lib/inventory";
import type { Movement, Product, ReconciliationRow } from "@/types/inventory";

function rowId(row: ReconciliationRow) {
  return `${row.sku}::${row.importNumber}`;
}

type ProductDetailClientProps = {
  product: Product;
  productMoves: Movement[];
  initialRows: ReconciliationRow[];
};

export default function ProductDetailClient({ product, productMoves, initialRows }: ProductDetailClientProps) {
  const [recRows, setRecRows] = useState(initialRows);

  const activeRow = recRows[0];
  const totalSiesaUnits = useMemo(
    () => (recRows.length ? recRows.reduce((acc, row) => acc + row.siesaUnits, 0) : product.siesaStock),
    [product.siesaStock, recRows],
  );
  const totalWarehouseUnits = useMemo(
    () => (recRows.length ? recRows.reduce((acc, row) => acc + row.warehouseUnits, 0) : product.warehouseStock),
    [product.warehouseStock, recRows],
  );
  const totalSiesaValue = useMemo(
    () =>
      recRows.length
        ? recRows.reduce((acc, row) => acc + row.siesaUnits * row.unitCost, 0)
        : product.unitCost * product.siesaStock,
    [product.siesaStock, product.unitCost, recRows],
  );

  const startRowCorrection = (target: ReconciliationRow) => {
    setRecRows((currentRows) =>
      currentRows.map((row) => (rowId(row) === rowId(target) ? startCorrection(row) : row)),
    );
  };

  const resolveRow = (target: ReconciliationRow) => {
    setRecRows((currentRows) =>
      currentRows.map((row) =>
        rowId(row) === rowId(target) ? resolveDifference(row, new Date().toISOString()) : row,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-brand-panel">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-text-secondary">Detalle de producto</p>
        <h1 className="mt-2 text-3xl font-semibold text-brand-text">{product.name}</h1>
        <p className="mt-1 text-sm text-brand-text-secondary">
          {product.sku} | Importacion base {product.importNumber} | {product.line} | {product.format}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge tone={product.status === "critical" ? "critical" : product.status === "watch" ? "warning" : "success"}>
            {product.status}
          </StatusBadge>
          {activeRow ? (
            <StatusBadge
              tone={activeRow.state === "critical" ? "critical" : activeRow.state === "warning" ? "warning" : "success"}
            >
              conciliacion {activeRow.state}
            </StatusBadge>
          ) : null}
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Panel title="Stock SIESA">
          <p className="text-3xl font-semibold text-brand-text">{formatUnits(totalSiesaUnits)}</p>
        </Panel>
        <Panel title="Stock Bodega">
          <p className="text-3xl font-semibold text-brand-text">{formatUnits(totalWarehouseUnits)}</p>
        </Panel>
        <Panel title="Costo unitario">
          <p className="text-3xl font-semibold text-brand-text">{formatMoney(activeRow?.unitCost ?? product.unitCost)}</p>
        </Panel>
        <Panel title="Valor total SIESA">
          <p className="text-3xl font-semibold text-brand-text">{formatMoney(totalSiesaValue)}</p>
        </Panel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Movimientos recientes" subtitle="Bitacora filtrada por SKU">
          <div className="overflow-hidden rounded-2xl border border-brand-border">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Importacion</th>
                  <th>Tipo</th>
                  <th>Fuente</th>
                  <th>Cantidad</th>
                  <th>Referencia</th>
                </tr>
              </thead>
              <tbody>
                {productMoves.length ? (
                  productMoves.map((movement) => (
                    <tr key={movement.id}>
                      <td className="font-semibold text-brand-navy">{movement.id}</td>
                      <td>{formatDateTime(movement.occurredAt)}</td>
                      <td>{movement.importNumber}</td>
                      <td>{movement.type}</td>
                      <td>{movement.source}</td>
                      <td>{formatUnits(movement.quantity)}</td>
                      <td>{movement.reference}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-brand-text-secondary">
                      Sin movimientos recientes para este SKU
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Resumen de conciliacion" subtitle="Estado por numero de importacion">
          {recRows.length ? (
            <div className="space-y-3">
              <p className="rounded-xl border border-brand-border bg-brand-bg p-3 text-sm text-brand-text-secondary">
                Analiza y ejecuta la conciliacion directamente desde esta ventana.
              </p>
              {recRows.map((row) => (
                <article key={rowId(row)} className="rounded-xl border border-brand-border bg-brand-bg p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-brand-text">{row.importNumber}</p>
                    <StatusBadge tone={row.state === "critical" ? "critical" : row.state === "warning" ? "warning" : "success"}>
                      {row.state}
                    </StatusBadge>
                  </div>
                  <p className="mt-2 text-sm text-brand-text-secondary">
                    Diff uds: <span className="font-medium text-brand-text">{formatUnits(row.unitDiff)}</span>
                  </p>
                  <p className="mt-1 text-sm text-brand-text-secondary">
                    Diff valor: <span className="font-medium text-brand-text">{formatMoney(row.valueDiff)}</span>
                  </p>
                  <p className="mt-1 text-xs text-brand-text-secondary">
                    Estado flujo: {row.resolutionStatus}
                    {row.resolvedAt ? ` | Resuelto: ${formatDateTime(row.resolvedAt)}` : ""}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startRowCorrection(row)}
                      disabled={row.resolutionStatus === "resolved"}
                      className="rounded-lg border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-text-secondary hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      En correccion
                    </button>
                    <button
                      type="button"
                      onClick={() => resolveRow(row)}
                      disabled={row.resolutionStatus === "resolved"}
                      className="rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-indigo disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Conciliar ahora
                    </button>
                  </div>
                </article>
              ))}
              <p className="text-sm text-brand-text-secondary">
                Ultimo sync: {formatDateTime(recRows[0].lastSyncAt)}. La conciliacion se controla por SKU y numero de
                importacion.
              </p>
            </div>
          ) : (
            <p className="text-sm text-brand-text-secondary">No hay fila de conciliacion para este SKU.</p>
          )}

          <Link
            href="/conciliacion"
            className="mt-5 inline-flex rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-indigo"
          >
            Volver a conciliacion
          </Link>
        </Panel>
      </section>
    </div>
  );
}
