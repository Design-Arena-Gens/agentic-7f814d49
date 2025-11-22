"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";
import { getCategories, products } from "@/lib/products";

const categories = getCategories();

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === null || product.category === activeCategory;
      const normalizedSearch = search.trim();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.includes(normalizedSearch) ||
        product.description.includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <HomeHero />

      <section className="space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-right">
            <h2 className="text-2xl font-bold text-slate-900">
              المنتجات المميزة
            </h2>
            <p className="text-sm text-slate-500">
              اختر من تشكيلتنا المختارة بعناية لأفضل الأجهزة والأزياء
              والإكسسوارات.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            <span className="text-lg">🔍</span>
            <input
              type="search"
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-52 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none md:w-72"
            />
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <div id="products" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            لم نجد منتجات مطابقة لبحثك حالياً. جرّب كلمات مفتاحية مختلفة أو اختر
            تصنيفاً آخر.
          </div>
        )}
      </section>

      <section className="grid gap-6 rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-lg md:grid-cols-3 md:px-10">
        <Feature
          icon="🚚"
          title="توصيل سريع"
          description="وصول الطلبات خلال ٢-٣ أيام عمل مع تتبع مباشر للحالة."
        />
        <Feature
          icon="💳"
          title="دفع آمن"
          description="دعم لجميع البطاقات وبوابات الدفع المحلية وخيار الدفع عند الاستلام."
        />
        <Feature
          icon="💬"
          title="دعم عربي ٢٤/٧"
          description="فريق خدمة عملاء مستعد للإجابة على أسئلتك على مدار الساعة."
        />
      </section>
    </div>
  );
}

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="space-y-2 text-right">
      <div className="text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm leading-6 text-slate-200">{description}</p>
    </div>
  );
}
