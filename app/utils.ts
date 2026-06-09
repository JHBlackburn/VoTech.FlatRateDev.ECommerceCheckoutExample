import type { Product, ProductIssueType } from "./types";

export const issueLabels: Record<ProductIssueType, string> = {
  missing_data: "Missing Data",
  price_conflict: "Price Conflict",
  sku_mapping: "SKU Mapping",
  lead_time_risk: "Lead-Time Risk",
  image_missing: "Image Missing",
  net_suite_unmatched: "NetSuite Unmatched",
  requires_review: "Requires Review"
};

export const issueGroups: Array<{
  title: string;
  type: ProductIssueType;
}> = [
  { title: "Price conflicts", type: "price_conflict" },
  { title: "Missing data", type: "missing_data" },
  { title: "NetSuite unmatched", type: "net_suite_unmatched" },
  { title: "Lead-time risk", type: "lead_time_risk" },
  { title: "Requires review", type: "requires_review" }
];

export function formatCurrency(value: number | null): string {
  if (value === null) {
    return "Missing";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value);
}

export function formatLeadTime(days: number | null): string {
  if (days === null) {
    return "Needs review";
  }

  return `${days} days`;
}

export function readinessTone(score: number): "ready" | "watch" | "review" | "not-ready" {
  if (score >= 90) {
    return "ready";
  }

  if (score >= 70) {
    return "watch";
  }

  if (score >= 50) {
    return "review";
  }

  return "not-ready";
}

export function readinessLabel(score: number): string {
  const tone = readinessTone(score);

  if (tone === "ready") {
    return "Ready";
  }

  if (tone === "watch") {
    return "Watch";
  }

  if (tone === "review") {
    return "Needs Review";
  }

  return "Not Ready";
}

export function computeStats(products: Product[]) {
  return {
    totalItems: products.length,
    rfpReady: products.filter((product) => product.rfpReady).length,
    needsReview: products.filter((product) => !product.rfpReady).length,
    netSuiteMatched: products.filter((product) => product.nsItemId !== null).length,
    missingContractPrice: products.filter(
      (product) => product.contractPriceStatus === "missing"
    ).length,
    priceConflicts: products.filter(
      (product) => product.contractPriceStatus === "conflict"
    ).length
  };
}
