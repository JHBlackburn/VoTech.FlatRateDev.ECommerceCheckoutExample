import { useState } from "react";

import type { Product } from "../types";

type ProductImageProps = {
  product: Product;
  variant: "card" | "table";
};

export function ProductImage({ product, variant }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={
          variant === "table"
            ? "product-image-fallback table-image"
            : "product-image-fallback"
        }
      >
        <span>{product.brand}</span>
        <strong>{product.category}</strong>
      </div>
    );
  }

  return (
    <img
      className={variant === "table" ? "table-image" : undefined}
      src={product.imageUrl}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
