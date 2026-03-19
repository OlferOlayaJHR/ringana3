import Link from "next/link";
import { notFound } from "next/navigation";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { movements, products, reconciliationRows } from "@/data/mock-data";
import { formatDateTime, formatMoney, formatUnits } from "@/lib/format";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = products.find((item) => item.sku === sku);

  if (!product) {
    notFound();
  }

  const productMoves = movements.filter((movement) => movement.sku === product.sku);
  const rec = reconciliationRows.find((item) => item.sku === product.sku);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-brand-panel">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-text-secondary">Detalle de producto</p>
        <h1 className="mt-2 text-3xl font-semibold text-brand-text">{product.name}</h1>
        <p className="mt-1 text-sm text-brand-text-secondary">
          {product.sku} · {product.line} · {product.format}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge tone={product.status === "critical" ? "critical" : product.status === "watch" ? "warning" : "success"}>
            {product.status}
          </StatusBadge>
          {rec ? (
            <StatusBadge tone={rec.state === "critical" ? "critical" : rec.state === "warning" ? "warning" : "success"}>
              conciliacion {rec.state}
            </StatusBadge>
          ) : null}
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Panel title="Stock SIESA">
          <p className="text-3xl font-semibold text-brand-text">{formatUnits(product.siesaStock)}</p>
        </Panel>
        <Panel title="Stock Bodega">
          <p className="text-3xl font-semibold text-brand-text">{formatUnits(product.warehouseStock)}</p>
        </Panel>
        <Panel title="Costo unitario">
          <p className="text-3xl font-semibold text-brand-text">{formatMoney(product.unitCost)}</p>
        </Panel>
        <Panel title="Valor total SIESA">
          <p className="text-3xl font-semibold text-brand-text">{formatMoney(product.unitCost * product.siesaStock)}</p>
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
                      <td>{movement.type}</td>
                      <td>{movement.source}</td>
                      <td>{formatUnits(movement.quantity)}</td>
                      <td>{movement.reference}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-brand-text-secondary">
                      Sin movimientos recientes para este SKU
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Resumen de conciliacion" subtitle="Estado y recomendaciones para este SKU">
          {rec ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-text-secondary">Diferencia unidades</p>
                <p className="mt-2 text-2xl font-semibold text-brand-text">{formatUnits(rec.unitDiff)}</p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-text-secondary">Diferencia valor</p>
                <p className="mt-2 text-2xl font-semibold text-brand-text">{formatMoney(rec.valueDiff)}</p>
              </div>
              <p className="text-sm text-brand-text-secondary">
                Ultimo sync: {formatDateTime(rec.lastSyncAt)}. Recomendada validacion fisica antes del siguiente cierre.
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


