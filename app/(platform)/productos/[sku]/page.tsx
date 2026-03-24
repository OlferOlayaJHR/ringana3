import { notFound } from "next/navigation";
import { movements, products, reconciliationRows } from "@/data/mock-data";
import ProductDetailClient from "./product-detail-client";

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ sku: string }>;
  searchParams: Promise<{ importacion?: string }>;
}) {
  const [{ sku }, { importacion }] = await Promise.all([params, searchParams]);
  const product = products.find((item) => item.sku === sku);

  if (!product) {
    notFound();
  }

  const productMoves = movements.filter((movement) => movement.sku === product.sku);
  const sortedRows = reconciliationRows
    .filter((item) => item.sku === product.sku)
    .sort((a, b) => Math.abs(b.valueDiff) - Math.abs(a.valueDiff));

  const recRows = importacion
    ? [...sortedRows].sort((a, b) => {
        const aMatches = a.importNumber === importacion;
        const bMatches = b.importNumber === importacion;
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      })
    : sortedRows;

  return <ProductDetailClient product={product} productMoves={productMoves} initialRows={recRows} />;
}
