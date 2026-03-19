import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  helper: string;
  tone?: "default" | "critical" | "success";
  trend?: number;
  className?: string;
}

export function KpiCard({
  title,
  value,
  helper,
  tone = "default",
  trend,
  className,
}: KpiCardProps) {
  const toneClass =
    tone === "critical"
      ? "bg-rose-50/80 border-rose-200"
      : tone === "success"
        ? "bg-emerald-50/80 border-emerald-200"
        : "bg-white border-brand-border";

  return (
    <article
      className={cn(
        "rounded-2xl border p-5 shadow-brand-panel transition duration-300 hover:-translate-y-0.5",
        toneClass,
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-secondary">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold text-brand-text">{value}</p>
        {typeof trend === "number" ? (
          <p
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              trend > 0
                ? "bg-emerald-100 text-emerald-700"
                : trend < 0
                  ? "bg-rose-100 text-rose-700"
                  : "bg-brand-bg-alt text-brand-text-secondary",
            )}
          >
            {trend > 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : trend < 0 ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            {Math.abs(trend).toFixed(1)}%
          </p>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-brand-text-secondary">{helper}</p>
    </article>
  );
}


