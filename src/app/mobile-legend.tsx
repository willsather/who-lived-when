import { type Category, categories } from "@/app/categories";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";

interface MobileLegendProps {
  categories: { [key: string]: Category };
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}

export default function MobileLegend({
  categories,
  onCategorySelect,
  selectedCategory,
}: MobileLegendProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile Legend Drawer Toggle - Only visible on mobile */}
      <button
        type="button"
        className="fixed right-0 bottom-0 left-0 z-10 flex items-center justify-center border-gray-200 border-t bg-white p-2 md:hidden"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <span className="mr-2">Filter by Category</span>
        {isDrawerOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>

      {/* Mobile Legend Drawer - Only visible on mobile when open */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-20 border-gray-200 border-t bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          transform: isDrawerOpen ? "translateY(0)" : "translateY(100%)",
          height: "auto",
          maxHeight: "70vh",
        }}
      >
        <div className="relative p-4">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-2 right-2 rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close filter drawer"
          >
            <X size={24} />
          </button>

          <h3 className="mb-4 font-semibold text-lg">Filter by Category</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(categories).map((category) => (
              <button
                key={category.name}
                className={`flex cursor-pointer items-center rounded-md p-2 ${
                  selectedCategory === category.name
                    ? "bg-gray-100 opacity-100"
                    : "opacity-70"
                }`}
                type="button"
                onClick={() => {
                  onCategorySelect(category.name);
                  setIsDrawerOpen(false);
                }}
              >
                <div className={`size-4 ${category.color} mr-2 rounded`} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
