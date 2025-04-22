import React, { useState } from "react";

interface CategoryManagerProps {
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export default function CategoryManager({
  categories,
  onCategoriesChange,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onCategoriesChange([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    onCategoriesChange(updatedCategories);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 p-2 border border-border rounded-l-md"
          placeholder="Add a new category"
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md"
        >
          Add
        </button>
      </div>

      {categories.length > 0 ? (
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <span>{category}</span>
              <button
                onClick={() => handleDeleteCategory(index)}
                className="text-destructive hover:text-destructive-foreground"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No categories added yet.</p>
      )}
    </div>
  );
}
