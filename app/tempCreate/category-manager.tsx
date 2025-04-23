import { useState } from "react";

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

export default function CategoryManager({
  categories,
  onAddCategory,
  onRemoveCategory,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new category"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>

      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
            >
              <span className="mr-2">{category}</span>
              <button
                onClick={() => onRemoveCategory(category)}
                className="text-gray-500 hover:text-red-500 focus:outline-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories added yet.</p>
      )}
    </div>
  );
}
