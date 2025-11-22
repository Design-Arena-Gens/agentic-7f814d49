"use client";

import { useCart } from "@/components/cart/cart-context";
import type { Product } from "@/lib/products";

type AddToCartButtonProps = {
  product: Product;
  size?: "md" | "lg";
};

export function AddToCartButton({ product, size = "md" }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className={`inline-flex items-center justify-center rounded-full bg-sky-600 font-semibold text-white transition hover:bg-sky-700 ${
        size === "lg" ? "px-8 py-3 text-base" : "px-5 py-2 text-sm"
      }`}
    >
      أضف للسلة
    </button>
  );
}
