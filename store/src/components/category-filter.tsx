"use client";

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
};

export function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div
      id="categories"
      className="flex flex-wrap items-center justify-end gap-2 rounded-2xl bg-white p-4 shadow-sm"
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === null ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
      >
        الكل
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeCategory === category
              ? "bg-sky-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
