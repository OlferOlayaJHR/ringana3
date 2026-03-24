export type ProductLine = "Skincare" | "Nutricion" | "Fresh" | "Wellness";

export type ProductStatus = "active" | "watch" | "critical";

export interface Product {
  sku: string;
  importNumber: string;
  name: string;
  line: ProductLine;
  format: string;
  unitCost: number;
  siesaStock: number;
  warehouseStock: number;
  reservedUnits: number;
  lastMovementAt: string;
  status: ProductStatus;
}

export type MovementType = "entry" | "exit" | "adjustment";

export interface Movement {
  id: string;
  occurredAt: string;
  sku: string;
  importNumber: string;
  type: MovementType;
  source: "SIESA" | "Bodega" | "Ajuste";
  quantity: number;
  unitCost: number;
  reference: string;
  note?: string;
}

export interface UploadBatch {
  id: string;
  source: "SIESA" | "Bodega";
  fileName: string;
  importNumber: string;
  importedAt: string;
  rows: number;
  status: "processed" | "processing" | "error";
  validatedRows: number;
}

export type ResolutionStatus = "pending" | "in-progress" | "resolved";

export interface ReconciliationRow {
  sku: string;
  importNumber: string;
  name: string;
  line: ProductLine;
  siesaUnits: number;
  warehouseUnits: number;
  unitCost: number;
  unitDiff: number;
  valueDiff: number;
  state: "conciled" | "warning" | "critical";
  resolutionStatus: ResolutionStatus;
  resolvedAt?: string;
  lastSyncAt: string;
}

export interface AlertItem {
  id: string;
  sku: string;
  importNumber: string;
  title: string;
  severity: "high" | "medium" | "low";
  detectedAt: string;
  impactValue: number;
  owner: string;
  status: "open" | "in-review" | "closed";
}

export interface CutSnapshot {
  cutDate: string;
  totalUnits: number;
  totalValue: number;
  conciledPercent: number;
  diffUnits: number;
  diffValue: number;
  criticalSkus: number;
}

export interface ActivityEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
  actor: string;
  type: "import" | "movement" | "reconciliation" | "alert";
}

