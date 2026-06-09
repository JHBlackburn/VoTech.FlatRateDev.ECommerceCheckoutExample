import { useMemo, useState } from "react";

import productsData from "../data/products.json";
import { CustomerOpsToggle } from "../components/CustomerOpsToggle";
import { ProductTable } from "../components/ProductTable";
import type { Product, ViewMode } from "../types";

const products = productsData as Product[];

type StatusFilter = "all" | "ready" | "review";

export function CatalogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("customer");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const searchable = [
        product.name,
        product.brand,
        product.category,
        product.itemNumber,
        product.vendorSku,
        product.customerSku,
        product.manufacturerModel
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 || searchable.includes(normalizedSearch);
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesStatus =
        status === "all" ||
        (status === "ready" && product.rfpReady) ||
        (status === "review" && !product.rfpReady);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [category, search, status]);

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">RFP Catalog Builder</p>
          <h1>Approved Product, Pricing, and Spec Package</h1>
          <p>
            The customer experience can only be as clean as the operational data
            behind it.
          </p>
        </div>
        <CustomerOpsToggle value={viewMode} onChange={setViewMode} />
      </section>

      <section className="card filter-card">
        <label>
          <span>Search</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, SKU, category"
          />
        </label>
        <label>
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
          >
            <option value="all">All</option>
            <option value="ready">RFP Ready</option>
            <option value="review">Needs Review</option>
          </select>
        </label>
      </section>

      <ProductTable products={filteredProducts} viewMode={viewMode} />
    </div>
  );
}
