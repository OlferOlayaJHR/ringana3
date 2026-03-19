import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-3xl border border-brand-border bg-white p-8 text-center shadow-brand-panel">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-brand-text">Vista no disponible</h1>
        <p className="mt-3 text-sm text-brand-text-secondary">
          El recurso solicitado no existe en este mockup de conciliacion.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-indigo"
        >
          Ir al dashboard
        </Link>
      </div>
    </div>
  );
}


