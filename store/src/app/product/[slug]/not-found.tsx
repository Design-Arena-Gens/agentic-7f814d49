import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center text-slate-600">
      <h1 className="text-2xl font-semibold text-slate-900">
        نأسف، لم يتم العثور على هذا المنتج
      </h1>
      <p className="mt-3 text-sm">
        ربما تم تغيير الرابط أو المنتج لم يعد متوفراً. يمكنك العودة للصفحة
        الرئيسية لاكتشاف المزيد من المنتجات.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        العودة للمتجر
      </Link>
    </div>
  );
}
