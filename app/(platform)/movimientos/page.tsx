import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { movements, products } from "@/data/mock-data";
import { formatDateTime, formatMoney, formatUnits } from "@/lib/format";

export default function InventoryMovementsPage() {
  const totalEntries = movements.filter((item) => item.quantity > 0).reduce((acc, item) => acc + item.quantity, 0);
  const totalExits = Math.abs(
    movements.filter((item) => item.quantity < 0).reduce((acc, item) => acc + item.quantity, 0),
  );

  return (
    <div className="space-y-6">
      <Panel
        title="Flujo de inventario"
        subtitle="Entradas, salidas y ajustes con referencia cruzada de origen"
        action={<StatusBadge tone="default">8 movimientos recientes</StatusBadge>}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-text-secondary">Entradas</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-700">+{formatUnits(totalEntries)} uds</p>
            <p className="mt-1 text-sm text-brand-text-secondary">Compras, importaciones y recepcion fisica</p>
          </article>
          <article className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-text-secondary">Salidas</p>
            <p className="mt-2 text-2xl font-semibold text-rose-700">-{formatUnits(totalExits)} uds</p>
            <p className="mt-1 text-sm text-brand-text-secondary">Despachos, ventas y picking tercerizado</p>
          </article>
          <article className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-text-secondary">SKUs con movimiento</p>
            <p className="mt-2 text-2xl font-semibold text-brand-text">{new Set(movements.map((item) => item.sku)).size}</p>
            <p className="mt-1 text-sm text-brand-text-secondary">Sobre un total de {products.length} SKUs activos</p>
          </article>
        </div>
      </Panel>

      <Panel title="Registro de movimientos" subtitle="Bitacora operativa de la jornada">
        <div className="overflow-hidden rounded-2xl border border-brand-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>SKU</th>
                <th>Tipo</th>
                <th>Fuente</th>
                <th>Cantidad</th>
                <th>Costo unitario</th>
                <th>Impacto</th>
                <th>Referencia</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id}>
                  <td className="font-semibold text-brand-navy">{movement.id}</td>
                  <td>{formatDateTime(movement.occurredAt)}</td>
                  <td>{movement.sku}</td>
                  <td>
                    <StatusBadge
                      tone={
                        movement.type === "entry"
                          ? "success"
                          : movement.type === "exit"
                            ? "critical"
                            : "warning"
                      }
                    >
                      {movement.type}
                    </StatusBadge>
                  </td>
                  <td>{movement.source}</td>
                  <td className={movement.quantity > 0 ? "text-emerald-700" : "text-rose-700"}>
                    {movement.quantity > 0 ? "+" : ""}
                    {formatUnits(movement.quantity)}
                  </td>
                  <td>{formatMoney(movement.unitCost)}</td>
                  <td>{formatMoney(movement.quantity * movement.unitCost)}</td>
                  <td>
                    <p className="font-medium">{movement.reference}</p>
                    {movement.note ? <p className="text-xs text-brand-text-secondary">{movement.note}</p> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}


