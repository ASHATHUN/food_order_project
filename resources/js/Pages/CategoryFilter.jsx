import React from "react";

export default function CategoryFilter({ categories, selectedCategory, onCategoryClick }) {

    console.log("Categories:", categories);
    console.log("Selected Category:", selectedCategory);
    console.log("onCategoryClick:", onCategoryClick);

    return (
        <div className="flex gap-2">
            <button
                onClick={() => onCategoryClick("All")}
                className={`${
                    selectedCategory === "All" ? "bg-yellow-600" : "bg-yellow-500"
                } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryClick(category.id)}
                    className={`${
                        selectedCategory === category.id ? "bg-yellow-600" : "bg-yellow-500"
                    } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
