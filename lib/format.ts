const moneyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatMoney(value: number) {
  return moneyFormatter.format(value);
}

export function formatUnits(value: number) {
  return numberFormatter.format(value);
}

export function formatDelta(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatUnits(value)}`;
}

export function formatPercent(value: number) {
  return `${decimalFormatter.format(value)}%`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}


