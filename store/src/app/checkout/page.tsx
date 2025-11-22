"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { formatCurrency } from "@/lib/utils";

const paymentMethods = ["الدفع عند الاستلام", "مدى", "فيزا / ماستركارد", "Apple Pay"];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-center text-slate-600">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          ✅
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">
          تم استقبال طلبك بنجاح
        </h1>
        <p className="text-sm leading-6">
          سيقوم فريق خدمة العملاء بالتواصل معك خلال الساعات القادمة لتأكيد الطلب
          ومواعيد التوصيل. شكراً لاختيارك سوق سما.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">إنهاء الطلب</h1>
          <p className="text-sm text-slate-500">
            أدخل بياناتك لإتمام عملية الشراء وتأكيد عنوان التوصيل.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="الاسم الكامل" required>
            <input
              name="fullName"
              required
              placeholder="مثال: أحمد خالد"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </Field>
          <Field label="رقم الجوال" required>
            <input
              name="phone"
              required
              type="tel"
              placeholder="05xxxxxxxx"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </Field>
        </div>

        <Field label="البريد الإلكتروني">
          <input
            name="email"
            type="email"
            placeholder="example@mail.com"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </Field>

        <Field label="العنوان الكامل" required>
          <textarea
            name="address"
            required
            rows={3}
            placeholder="المدينة، الحي، اسم الشارع، رقم المبنى / الشقة"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </Field>

        <Field label="طريقة الدفع" required>
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-sky-500 hover:bg-white"
              >
                <span>{method}</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  required
                  className="h-4 w-4 accent-sky-600"
                />
              </label>
            ))}
          </div>
        </Field>

        <button
          type="submit"
          className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          disabled={items.length === 0}
        >
          تأكيد الطلب
        </button>
        {items.length === 0 && (
          <p className="text-sm text-rose-500">
            سلتك فارغة حالياً. أضف منتجات للمتابعة.
          </p>
        )}
      </form>

      <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          ملخص سلة التسوق
        </h2>

        {items.length === 0 ? (
          <p className="text-sm text-slate-500">
            لا توجد عناصر في السلة. تصفح المنتجات وأضف ما يعجبك.
          </p>
        ) : (
          <ul className="space-y-4 text-sm text-slate-600">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">
                    الكمية: {quantity}
                  </p>
                </div>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(product.price * quantity, product.currency)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-right text-sm text-slate-600">
          <p>الإجمالي</p>
          <p className="text-lg font-bold text-slate-900">
            {formatCurrency(total, items[0]?.product.currency ?? "SAR")}
          </p>
        </div>
      </aside>
    </div>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function Field({ label, required, children }: FieldProps) {
  return (
    <label className="block space-y-2 text-right text-sm font-medium text-slate-700">
      <span>
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}
