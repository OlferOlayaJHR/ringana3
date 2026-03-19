import type { Product, ReconciliationRow } from "@/types/inventory";

export function buildReconciliationFromProducts(products: Product[]): ReconciliationRow[] {
  return products.map((product) => {
    const unitDiff = product.siesaStock - product.warehouseStock;
    const valueDiff = unitDiff * product.unitCost;

    return {
      sku: product.sku,
      name: product.name,
      line: product.line,
      siesaUnits: product.siesaStock,
      warehouseUnits: product.warehouseStock,
      unitCost: product.unitCost,
      unitDiff,
      valueDiff,
      state: Math.abs(unitDiff) >= 40 ? "critical" : Math.abs(unitDiff) >= 8 ? "warning" : "conciled",
      lastSyncAt: product.lastMovementAt,
    };
  });
}

export function summarizeReconciliation(rows: ReconciliationRow[]) {
  const totalSkus = rows.length;
  const diffUnits = rows.reduce((acc, row) => acc + Math.abs(row.unitDiff), 0);
  const diffValue = rows.reduce((acc, row) => acc + Math.abs(row.valueDiff), 0);
  const criticalSkus = rows.filter((row) => row.state === "critical").length;
  const warningSkus = rows.filter((row) => row.state === "warning").length;
  const conciledSkus = rows.filter((row) => row.state === "conciled").length;

  return {
    totalSkus,
    diffUnits,
    diffValue,
    criticalSkus,
    warningSkus,
    conciledSkus,
    conciledRate: (conciledSkus / totalSkus) * 100,
  };
}


