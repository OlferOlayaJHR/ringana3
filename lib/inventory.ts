import type { Product, ReconciliationRow } from "@/types/inventory";

function stateFromUnitDiff(unitDiff: number): ReconciliationRow["state"] {
  const absoluteDiff = Math.abs(unitDiff);
  if (absoluteDiff >= 40) return "critical";
  if (absoluteDiff >= 8) return "warning";
  return "conciled";
}

export function recalculateReconciliationRow(row: ReconciliationRow): ReconciliationRow {
  const unitDiff = row.siesaUnits - row.warehouseUnits;
  const valueDiff = unitDiff * row.unitCost;

  return {
    ...row,
    unitDiff,
    valueDiff,
    state: stateFromUnitDiff(unitDiff),
  };
}

export function startCorrection(row: ReconciliationRow): ReconciliationRow {
  if (row.resolutionStatus === "resolved") return row;

  return {
    ...row,
    resolutionStatus: "in-progress",
  };
}

export function resolveDifference(row: ReconciliationRow, resolvedAt: string): ReconciliationRow {
  const correctedRow = recalculateReconciliationRow({
    ...row,
    warehouseUnits: row.siesaUnits,
    resolutionStatus: "resolved",
    resolvedAt,
  });

  return {
    ...correctedRow,
    state: "conciled",
    unitDiff: 0,
    valueDiff: 0,
  };
}

export function buildReconciliationFromProducts(products: Product[]): ReconciliationRow[] {
  return products.map((product) => {
    const unitDiff = product.siesaStock - product.warehouseStock;
    const valueDiff = unitDiff * product.unitCost;

    return {
      sku: product.sku,
      importNumber: product.importNumber,
      name: product.name,
      line: product.line,
      siesaUnits: product.siesaStock,
      warehouseUnits: product.warehouseStock,
      unitCost: product.unitCost,
      unitDiff,
      valueDiff,
      state: stateFromUnitDiff(unitDiff),
      resolutionStatus: unitDiff === 0 ? "resolved" : "pending",
      resolvedAt: unitDiff === 0 ? product.lastMovementAt : undefined,
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
    conciledRate: totalSkus ? (conciledSkus / totalSkus) * 100 : 0,
  };
}


