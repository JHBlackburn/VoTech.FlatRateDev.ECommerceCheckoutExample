import type { Product } from "../types";
import { formatCurrency } from "../utils";

type CartDrawerProps = {
  items: Product[];
  onRemove: (productId: string) => void;
  onSubmit: () => void;
};

export function CartDrawer({ items, onRemove, onSubmit }: CartDrawerProps) {
  const total = items.reduce((sum, product) => sum + (product.contractPrice ?? 0), 0);

  return (
    <aside className="cart-drawer" aria-label="Request cart">
      <div>
        <p className="eyebrow">Request Cart</p>
        <h2>{items.length} selected item{items.length === 1 ? "" : "s"}</h2>
      </div>
      {items.length === 0 ? (
        <p className="muted-copy">
          Select approved items or request review for exception items.
        </p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{formatCurrency(item.contractPrice)}</span>
              </div>
              <button type="button" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-footer">
        <div>
          <span>Estimated contract total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <button
          className="primary-button"
          type="button"
          disabled={items.length === 0}
          onClick={onSubmit}
        >
          Submit Request
        </button>
      </div>
    </aside>
  );
}
