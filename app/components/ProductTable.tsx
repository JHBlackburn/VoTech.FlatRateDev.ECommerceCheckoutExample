import type { Product, ViewMode } from "../types";
import { formatCurrency, formatLeadTime } from "../utils";
import { IssueBadge } from "./IssueBadge";
import { ProductImage } from "./ProductImage";
import { ReadinessBadge } from "./ReadinessBadge";

type ProductTableProps = {
  products: Product[];
  viewMode: ViewMode;
};

function emptyValue(value: string | number | null): string | number {
  return value ?? "Missing";
}

export function ProductTable({ products, viewMode }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        No matching products. Adjust the filters to widen the catalog view.
      </div>
    );
  }

  if (viewMode === "customer") {
    return (
      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Contract Price</th>
              <th>Lead Time</th>
              <th>Availability</th>
              <th>Status</th>
              <th>View Source</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <ProductImage product={product} variant="table" />
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <span className="muted-line">{product.brand}</span>
                </td>
                <td>{product.category}</td>
                <td>
                  <span
                    className={
                      product.contractPriceStatus === "approved"
                        ? "price-text"
                        : "price-text price-alert"
                    }
                  >
                    {formatCurrency(product.contractPrice)}
                  </span>
                </td>
                <td>{formatLeadTime(product.leadTimeDays)}</td>
                <td>{product.availability}</td>
                <td>
                  <ReadinessBadge
                    label={product.rfpReady ? "RFP Ready" : "Review Required"}
                    tone={product.rfpReady ? "ready" : "review"}
                  />
                </td>
                <td>
                  <a href={product.sourcePageUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>NetSuite ID</th>
            <th>Item #</th>
            <th>MFR Model</th>
            <th>Vendor SKU</th>
            <th>Customer SKU</th>
            <th>On Hand</th>
            <th>Committed</th>
            <th>Available</th>
            <th>Readiness</th>
            <th>Issues</th>
            <th>Suggested Ticket</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <strong>{product.name}</strong>
                <span className="muted-line">{product.category}</span>
              </td>
              <td>
                {product.nsItemId ? (
                  <ReadinessBadge label={product.nsItemId} tone="matched" />
                ) : (
                  <IssueBadge label="Missing" />
                )}
              </td>
              <td>{product.itemNumber}</td>
              <td>{emptyValue(product.manufacturerModel)}</td>
              <td>{emptyValue(product.vendorSku)}</td>
              <td>{emptyValue(product.customerSku)}</td>
              <td>{emptyValue(product.onHand)}</td>
              <td>{emptyValue(product.committed)}</td>
              <td>{emptyValue(product.available)}</td>
              <td>
                <ReadinessBadge score={product.readinessScore} />
              </td>
              <td>
                <div className="badge-list">
                  {product.issues.length > 0 ? (
                    product.issues.map((issue) => (
                      <IssueBadge key={issue} type={issue} />
                    ))
                  ) : (
                    <ReadinessBadge label="Ready" tone="ready" />
                  )}
                </div>
              </td>
              <td>{product.suggestedTicket ?? "No ticket needed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
