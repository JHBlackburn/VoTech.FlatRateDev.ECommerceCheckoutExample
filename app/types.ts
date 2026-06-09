export type ProductIssueType =
  | "missing_data"
  | "price_conflict"
  | "sku_mapping"
  | "lead_time_risk"
  | "image_missing"
  | "net_suite_unmatched"
  | "requires_review";

export type Product = {
  id: string;
  nsItemId: string | null;
  itemNumber: string;
  manufacturerModel: string | null;
  vendorSku: string | null;
  customerSku: string | null;

  name: string;
  brand: string;
  category: string;

  imageUrl: string;
  sourcePageUrl: string;
  specSheetUrl?: string | null;

  listPrice: number | null;
  contractPrice: number | null;
  contractPriceStatus: "approved" | "conflict" | "missing";

  leadTimeDays: number | null;
  availability:
    | "In Stock"
    | "Limited Stock"
    | "Special Order"
    | "Backordered"
    | "Unknown";

  onHand: number | null;
  committed: number | null;
  available: number | null;

  sourceSystems: string[];
  rfpReady: boolean;
  readinessScore: number;
  issues: ProductIssueType[];

  suggestedTicket: string | null;
};

export type Issue = {
  id: string;
  severity: "High" | "Medium" | "Low";
  title: string;
  impact: string;
  relatedArea: string;
  suggestedTicket: string;
};

export type Rfp = {
  customerName: string;
  rfpName: string;
  status: string;
  deadline: string;
  buyerRequirement: string;
  portalUrlMock: string;
  stats: {
    totalItems: number;
    rfpReady: number;
    needsReview: number;
    netSuiteMatched: number;
    missingContractPrice: number;
    priceConflicts: number;
  };
};

export type RoadmapItem = {
  step: number;
  name: string;
  description: string;
  effort: string;
  risk: string;
  exampleDeliverables: string[];
};

export type ViewMode = "customer" | "ops";
