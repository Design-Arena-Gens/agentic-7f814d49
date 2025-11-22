"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { formatCurrency } from "@/lib/utils";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, setQuantity, removeItem, total } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 transition-opacity ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-labelledby="cart-heading"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="cart-heading" className="text-lg font-semibold text-slate-900">
            سلة التسوق
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
          >
            إغلاق
          </button>
        </div>

        <div className="flex h-[calc(100%-160px)] flex-col overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-center text-slate-500">سلتك فارغة حالياً.</p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 rounded-lg border border-slate-100 p-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500">{formatCurrency(product.price, product.currency)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <label className="text-sm text-slate-500" htmlFor={`quantity-${product.id}`}>
                        الكمية
                      </label>
                      <input
                        id={`quantity-${product.id}`}
                        type="number"
                        min={1}
                        max={99}
                        value={quantity}
                        onChange={(event) =>
                          setQuantity(product.id, Number(event.target.value))
                        }
                        className="h-10 w-20 rounded border border-slate-200 px-2 text-center focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-sm text-rose-500 hover:text-rose-600"
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center justify-between text-slate-700">
            <span>الإجمالي</span>
            <span className="text-lg font-semibold">
              {formatCurrency(total, items[0]?.product.currency ?? "SAR")}
            </span>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className={`mt-4 block rounded-lg bg-sky-600 py-3 text-center text-white transition hover:bg-sky-700 ${items.length === 0 ? "pointer-events-none opacity-40" : ""}`}
          >
            متابعة إنهاء الطلب
          </Link>
        </div>
      </aside>
    </>
  );
}
