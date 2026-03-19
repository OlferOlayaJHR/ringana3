import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { products } from "@/data/mock-data";
import { formatMoney, formatDateTime, formatUnits } from "@/lib/format";

export default function ProductMasterPage() {
  return (
    <div className="space-y-6">
      <Panel
        title="Catalogo Ringana"
        subtitle="Maestro consolidado de productos sincronizado desde SIESA"
        action={<StatusBadge tone="info">1682 registros validados</StatusBadge>}
      >
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="inline-flex min-w-[280px] items-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-text-secondary">
            <Search className="h-4 w-4" />
            Buscar por SKU, nombre o linea
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-3 py-2 text-sm font-semibold text-brand-text-secondary transition hover:bg-brand-bg">
            <Filter className="h-4 w-4" />
            Filtros avanzados
          </button>
          <button className="rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-indigo">
            Exportar maestro
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Linea</th>
                <th>Presentacion</th>
                <th>Costo unitario</th>
                <th>Stock SIESA</th>
                <th>Stock Bodega</th>
                <th>Reservado</th>
                <th>Estado</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.sku}>
                  <td className="font-semibold text-brand-navy">{product.sku}</td>
                  <td>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-brand-text-secondary">Ult mov: {formatDateTime(product.lastMovementAt)}</p>
                  </td>
                  <td>{product.line}</td>
                  <td>{product.format}</td>
                  <td>{formatMoney(product.unitCost)}</td>
                  <td>{formatUnits(product.siesaStock)}</td>
                  <td>{formatUnits(product.warehouseStock)}</td>
                  <td>{formatUnits(product.reservedUnits)}</td>
                  <td>
                    <StatusBadge
                      tone={
                        product.status === "critical"
                          ? "critical"
                          : product.status === "watch"
                            ? "warning"
                            : "success"
                      }
                    >
                      {product.status}
                    </StatusBadge>
                  </td>
                  <td>
                    <Link
                      href={`/productos/${product.sku}`}
                      className="text-sm font-semibold text-brand-indigo underline-offset-4 hover:underline"
                    >
                      Ver
                    </Link>
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


