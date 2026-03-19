import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-brand-bg px-6 text-center">
      <div className="rounded-full bg-white p-3 shadow-brand-panel">
        <Inbox className="h-6 w-6 text-brand-navy" />
      </div>
      <h4 className="mt-4 text-base font-semibold text-brand-text">{title}</h4>
      <p className="mt-2 max-w-md text-sm text-brand-text-secondary">{description}</p>
    </div>
  );
}


