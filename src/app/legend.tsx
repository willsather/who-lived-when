import type { Category } from "@/app/categories";

interface LegendProps {
  categories: { [key: string]: Category };
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}

export default function Legend({
  categories,
  onCategorySelect,
  selectedCategory,
}: LegendProps) {
  return (
    <div className="mb-4 flex justify-center space-x-8">
      {Object.values(categories).map((category) => (
        <button
          key={category.name}
          className={`flex cursor-pointer items-center ${selectedCategory === category.name ? "opacity-100" : "opacity-50"}`}
          type="button"
          onClick={() => onCategorySelect(category.name)}
        >
          <div className={`size-4 ${category.color} mr-2 rounded`} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
