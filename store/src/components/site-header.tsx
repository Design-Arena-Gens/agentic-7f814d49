"use client";

import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCart } from "@/components/cart/cart-context";
import { formatCurrency } from "@/lib/utils";

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, total } = useCart();
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold text-white">
            س
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">سوق سما</span>
            <span className="text-xs text-slate-500">متجر إلكتروني متكامل</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="hover:text-sky-600">
            الرئيسية
          </Link>
          <Link href="/#products" className="hover:text-sky-600">
            المنتجات
          </Link>
          <Link href="/#categories" className="hover:text-sky-600">
            التصنيفات
          </Link>
          <Link href="/checkout" className="hover:text-sky-600">
            إنهاء الطلب
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
          aria-label="فتح سلة التسوق"
        >
          <span className="relative block">
            🛒
            {itemsCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-xs text-white">
                {itemsCount}
              </span>
            )}
          </span>
          <span className="hidden sm:block">
            {itemsCount > 0
              ? formatCurrency(total, items[0].product.currency)
              : "سلة فارغة"}
          </span>
        </button>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
