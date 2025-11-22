import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProductBySlug, products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

type ProductPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "المنتج غير موجود | سوق سما",
    };
  }

  return {
    title: `${product.name} | سوق سما`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((url) => ({ url })),
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-[1.1fr_1fr] md:p-10">
        <div className="grid gap-4">
          {product.images.map((image, index) => (
            <div
              key={image}
              className={`relative h-64 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 md:h-80 ${index === 0 ? "md:row-span-2" : ""}`}
            >
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="space-y-6 text-right">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-sm leading-7 text-slate-500">
              {product.description}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">السعر</p>
            <p className="text-3xl font-semibold text-slate-900">
              {formatCurrency(product.price, product.currency)}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              شامل للضريبة - الدفع عند الاستلام متاح
            </p>
          </div>

          {product.colors && (
            <div>
              <p className="text-sm font-semibold text-slate-700">الألوان</p>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div>
              <p className="text-sm font-semibold text-slate-700">المقاسات</p>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-slate-700">
              أهم المميزات
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start justify-end gap-2"
                >
                  <span>✨</span>
                  <span className="flex-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-100 p-5">
            <h2 className="text-lg font-semibold text-slate-900">الوصف</h2>
            <p className="text-sm leading-7 text-slate-600">
              {product.longDescription}
            </p>
          </div>

          <AddToCartButton product={product} size="lg" />
        </div>
      </div>
    </div>
  );
}
