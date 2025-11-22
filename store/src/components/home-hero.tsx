import Link from "next/link";

export function HomeHero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-slate-100 px-6 py-16 shadow-sm sm:px-10">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4 text-right">
          <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-sky-600 ring-1 ring-sky-100">
            شحن مجاني للطلبات فوق ٣٩٩ ريال
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            اكتشف أحدث الصيحات مع{" "}
            <span className="text-sky-600">سوق سما</span>
          </h1>
          <p className="text-lg leading-9 text-slate-600">
            تشكيلة مختارة من أفضل الأجهزة الذكية، الموضة العصرية، والعناية
            بالبشرة. جرب تجربة تسوق عربية مصممة خصيصاً لاحتياجاتك.
          </p>
          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <Link
              href="/#products"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              تسوق المنتجات الآن
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
            >
              تتبع طلباتك
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 top-6 h-28 w-28 rounded-full bg-sky-200/70 blur-2xl" />
          <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-rose-200/60 blur-3xl" />
          <div className="relative rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="space-y-4 text-right">
              <p className="text-sm font-semibold text-sky-600">
                عروض نهاية الأسبوع
              </p>
              <p className="text-2xl font-bold text-slate-900">
                خصم 25٪ على أفضل الأجهزة الذكية
              </p>
              <p className="text-sm text-slate-500">
                تسوق الآن واستفد من الدفع عند الاستلام وخيارات تقسيط ميسرة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
