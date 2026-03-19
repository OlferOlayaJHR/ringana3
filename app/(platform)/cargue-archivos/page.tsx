import { FileSpreadsheet, ShieldCheck, UploadCloud } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { Panel } from "@/components/shared/panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { uploads } from "@/data/mock-data";
import { formatDateTime, formatUnits } from "@/lib/format";

export default function FileUploadPage() {
  const processed = uploads.filter((item) => item.status === "processed").length;
  const processing = uploads.filter((item) => item.status === "processing").length;
  const error = uploads.filter((item) => item.status === "error").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title="Archivos procesados"
          value={formatUnits(processed)}
          helper="Cargues validados y disponibles para conciliacion"
          tone="success"
        />
        <KpiCard
          title="En procesamiento"
          value={formatUnits(processing)}
          helper="Pendientes de validacion y cruce de costos"
        />
        <KpiCard
          title="Con errores"
          value={formatUnits(error)}
          helper="Requieren ajuste de estructura o datos"
          tone="critical"
        />
      </section>

      <Panel
        title="Pipeline de cargue"
        subtitle="Trazabilidad de archivos desde SIESA y bodega externa"
        action={<StatusBadge tone="info">Corte 31 marzo</StatusBadge>}
      >
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-dashed border-brand-border bg-brand-bg p-4">
            <UploadCloud className="h-6 w-6 text-brand-indigo" />
            <p className="mt-3 font-semibold text-brand-text">1. Recepcion de archivo</p>
            <p className="mt-1 text-sm text-brand-text-secondary">CSV/XLSX con reglas de formato por fuente.</p>
          </article>
          <article className="rounded-xl border border-dashed border-brand-border bg-brand-bg p-4">
            <ShieldCheck className="h-6 w-6 text-brand-indigo" />
            <p className="mt-3 font-semibold text-brand-text">2. Validacion estructural</p>
            <p className="mt-1 text-sm text-brand-text-secondary">Control de columnas, SKUs y costos unitarios.</p>
          </article>
          <article className="rounded-xl border border-dashed border-brand-border bg-brand-bg p-4">
            <FileSpreadsheet className="h-6 w-6 text-brand-indigo" />
            <p className="mt-3 font-semibold text-brand-text">3. Publicacion al motor</p>
            <p className="mt-1 text-sm text-brand-text-secondary">Actualiza inventario y tablero de conciliacion.</p>
          </article>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fuente</th>
                <th>Archivo</th>
                <th>Filas</th>
                <th>Validadas</th>
                <th>Importado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => (
                <tr key={upload.id}>
                  <td className="font-semibold text-brand-navy">{upload.id}</td>
                  <td>{upload.source}</td>
                  <td>{upload.fileName}</td>
                  <td>{formatUnits(upload.rows)}</td>
                  <td>{formatUnits(upload.validatedRows)}</td>
                  <td>{formatDateTime(upload.importedAt)}</td>
                  <td>
                    <StatusBadge
                      tone={
                        upload.status === "processed"
                          ? "success"
                          : upload.status === "processing"
                            ? "info"
                            : "critical"
                      }
                    >
                      {upload.status}
                    </StatusBadge>
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


