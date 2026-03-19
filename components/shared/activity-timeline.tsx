import { activity } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const typeStyles = {
  import: "bg-indigo-100 text-indigo-700",
  movement: "bg-cyan-100 text-cyan-700",
  reconciliation: "bg-emerald-100 text-emerald-700",
  alert: "bg-rose-100 text-rose-700",
};

export function ActivityTimeline() {
  return (
    <ol className="space-y-4">
      {activity.map((event) => (
        <li key={event.id} className="relative pl-6">
          <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-brand-indigo" />
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-brand-text">{event.title}</p>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wider",
                    typeStyles[event.type],
                  )}
                >
                  {event.type}
                </span>
                <span className="text-xs text-brand-text-secondary">{event.time}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-brand-text-secondary">{event.detail}</p>
            <p className="mt-2 text-xs font-medium text-brand-navy">{event.actor}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}


