import { CategoryPicker } from "@/components/widgets/category-picker/CategoryPicker";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

const FormCategories = ({
  categories,
  categoriesSelected,
  handleCategoryChange,
}: {
  categories: { id: string; name: string }[];
  categoriesSelected: string[] | null;
  handleCategoryChange: (next: string[]) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <CategoryPicker
        categories={categories}
        onChange={(next) => handleCategoryChange(next.map((c) => c.id))}
        value={categoriesSelected ?? []}
      />

      {categoriesSelected && (
        <div
          className={cn(
            "flex flex-wrap gap-2",
            categoriesSelected.length === 0 && "hidden absolute"
          )}
        >
          {categories
            .filter((category) => categoriesSelected.includes(category.id))
            .map((cat) => (
              <div
                key={cat.id}
                className="flex flex-row items-center justify-center gap-2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {cat.name}
                <button
                  onClick={() => {
                    const next = categoriesSelected.filter(
                      (id) => id !== cat.id
                    );
                    handleCategoryChange(next);
                  }}
                >
                  <Trash className="w-3 h-3" />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FormCategories;
