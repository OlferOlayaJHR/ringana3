import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, action, children, className }: PanelProps) {
  return (
    <section className={cn("rounded-2xl border border-brand-border bg-white p-6 shadow-brand-panel", className)}>
      {title ? (
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-brand-text-secondary">{subtitle}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}


