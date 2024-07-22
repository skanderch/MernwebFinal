import React from "react";
import "./Filters.css";

const Categories = [
  { name: "Avatars", value: "avatars" },
  { name: "Assets", value: "assets" },
  { name: "Animations", value: "animations" },
  { name: "Textures", value: "textures" },
];

function Filters({ showFilters, setshowFilters, filters, setFilters }) {
  return (
    <div className="filters-container">
      <div className="filters-header">
        <h1 className="filters-title">Filters</h1>
        <i
          className="ri-close-line close-icon"
          onClick={() => setshowFilters(!showFilters)}
        ></i>
      </div>
      <div className="filters-content">
        <h1 className="categories-title">Categories</h1>
        <div className="categories-list">
          {Categories.map((category) => {
            return (
              <div className="category-item" key={category.value}>
                <input
                  type="checkbox"
                  name="category"
                  className="category-checkbox"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category" className="category-label">
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>

        {/* Price Filter */}
        <h1 className="categories-title">Price</h1>
        <div className="price-filter">
          <input
            type="number"
            placeholder="Min Price"
            className="price-input"
            value={filters.minPrice || ''}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="price-input"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
