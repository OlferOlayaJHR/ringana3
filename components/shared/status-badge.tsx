import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeTone =
  | "default"
  | "success"
  | "warning"
  | "critical"
  | "info"
  | "neutral";

const toneStyles: Record<BadgeTone, string> = {
  default: "bg-brand-navy/10 text-brand-navy border-brand-navy/20",
  success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  critical: "bg-rose-100 text-rose-700 border-rose-200",
  info: "bg-indigo-100 text-indigo-700 border-indigo-200",
  neutral: "bg-brand-bg-alt text-brand-text-secondary border-brand-border",
};

interface StatusBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function StatusBadge({ children, tone = "default", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}


