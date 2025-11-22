"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import type { Product } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority={product.id === "1"}
        />
        <div className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white">
          {product.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-sm text-amber-500">
          <span>{"★".repeat(Math.floor(product.rating))}</span>
          <span className="text-slate-500">{product.rating.toFixed(1)}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          <Link href={`/product/${product.slug}`} className="hover:text-sky-600">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-lg font-bold text-slate-900">
            {formatCurrency(product.price, product.currency)}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </article>
  );
}
