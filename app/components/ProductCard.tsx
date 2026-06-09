import type { Product, ViewMode } from "../types";
import { formatCurrency, formatLeadTime } from "../utils";
import { IssueBadge } from "./IssueBadge";
import { ProductImage } from "./ProductImage";
import { ReadinessBadge } from "./ReadinessBadge";

type ProductCardProps = {
  product: Product;
  viewMode: ViewMode;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, viewMode, onAdd }: ProductCardProps) {
  const safeForSelfService =
    product.rfpReady &&
    product.nsItemId !== null &&
    product.contractPriceStatus === "approved" &&
    product.leadTimeDays !== null;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <ProductImage product={product} variant="card" />
      </div>
      <div className="product-card-body">
        <div className="product-card-heading">
          <div>
            <p className="eyebrow">{product.brand}</p>
            <h3>{product.name}</h3>
          </div>
          <ReadinessBadge
            label={product.rfpReady ? "RFP Ready" : "Review Required"}
            tone={product.rfpReady ? "ready" : "review"}
          />
        </div>
        <div className="product-meta-grid">
          <span>Category</span>
          <strong>{product.category}</strong>
          <span>Contract price</span>
          <strong>{formatCurrency(product.contractPrice)}</strong>
          <span>Lead time</span>
          <strong>{formatLeadTime(product.leadTimeDays)}</strong>
          <span>Availability</span>
          <strong>{product.availability}</strong>
        </div>
        {viewMode === "ops" ? (
          <div className="ops-panel">
            <div>
              <span className="panel-label">Source systems</span>
              <div className="badge-list">
                {product.sourceSystems.map((system) => (
                  <span className="source-chip" key={system}>
                    {system}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="panel-label">Issues</span>
              <div className="badge-list">
                {product.issues.length > 0 ? (
                  product.issues.map((issue) => (
                    <IssueBadge key={issue} type={issue} />
                  ))
                ) : (
                  <ReadinessBadge label="Ready" tone="ready" />
                )}
              </div>
            </div>
            <div>
              <span className="panel-label">Suggested ticket</span>
              <p>{product.suggestedTicket ?? "No ticket needed"}</p>
            </div>
            <div>
              <span className="panel-label">Self-service ordering</span>
              <ReadinessBadge
                label={safeForSelfService ? "Safe" : "Manual Review"}
                tone={safeForSelfService ? "ready" : "watch"}
              />
            </div>
          </div>
        ) : null}
        <button className="primary-button" type="button" onClick={() => onAdd(product)}>
          {product.rfpReady ? "Add to Request" : "Request Review"}
        </button>
      </div>
    </article>
  );
}
