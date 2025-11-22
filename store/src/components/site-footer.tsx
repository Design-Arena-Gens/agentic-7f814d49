export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-base font-semibold text-slate-900">سوق سما</p>
          <p className="text-sm text-slate-500">
            حلول تسوق ذكية ومريحة لعشاق التكنولوجيا والموضة في العالم العربي.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} سوق سما. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
