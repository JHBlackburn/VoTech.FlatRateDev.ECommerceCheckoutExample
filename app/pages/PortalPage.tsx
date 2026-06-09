import { useState } from "react";

import productsData from "../data/products.json";
import rfpData from "../data/rfp.json";
import { CartDrawer } from "../components/CartDrawer";
import { CustomerOpsToggle } from "../components/CustomerOpsToggle";
import { DemoModal } from "../components/DemoModal";
import { ProductCard } from "../components/ProductCard";
import type { Product, Rfp, ViewMode } from "../types";

const products = productsData as Product[];
const rfp = rfpData as Rfp;

export function PortalPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("customer");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  function addItem(product: Product) {
    setCartItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }

  function removeItem(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Portal-Lite Customer View</p>
          <h1>{rfp.customerName}</h1>
          <h2>Approved Equipment Catalog</h2>
          <p>
            Browse approved RFP items, review contract pricing, and submit an
            order request for Total RESA review.
          </p>
        </div>
        <CustomerOpsToggle value={viewMode} onChange={setViewMode} />
      </section>

      <section className="portal-layout">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onAdd={addItem}
            />
          ))}
        </div>
        <CartDrawer
          items={cartItems}
          onRemove={removeItem}
          onSubmit={() => setModalOpen(true)}
        />
      </section>

      <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
