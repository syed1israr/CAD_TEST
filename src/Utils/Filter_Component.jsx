import { useEffect, useRef, useState } from "react";
import { useFilter } from "../contexts/FilterContext";
import { Filter, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { debounce } from "../hook/useDebounce"

const FilterComponent = () => {
  const { filters, updateFilters, resetFilters } = useFilter();
  const containerRef = useRef(null);

  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice === Infinity ? "" : filters.maxPrice
  );

  const delayhandler = useRef(
    debounce((key, val) => updateFilters({ [key]: val }), 500)
  ).current;

  const handlePriceInput = (e) => {
    const { name, value } = e.target;
    const parsed = value === "" ? "" : parseFloat(value);

    if (name === "minPrice") setMinPrice(value);
    if (name === "maxPrice") setMaxPrice(value);

    delayhandler(name, parsed || 0);
  };

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-white text-black p-6 rounded-2xl shadow-xl border border-gray-200 mb-6"
    >
      <div className="flex items-center gap-2 font-semibold text-lg">
        <Filter className="w-5 h-5" />
        <span>Refine Products</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="bg-white text-black p-2 border border-black rounded-xl"
        >
          <option value="">All Products</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decor</option>
          <option value="furniture">Furniture</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={handlePriceInput}
            placeholder="Min"
            className="w-20 p-2 border border-black rounded-xl text-sm"
          />
          <span>-</span>
          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={handlePriceInput}
            placeholder="Max"
            className="w-20 p-2 border border-black rounded-xl text-sm"
          />
        </div>

        <select
          value={filters.rating}
          onChange={(e) => updateFilters({ rating: parseFloat(e.target.value) })}
          className="bg-white text-black p-2 border border-black rounded-xl"
        >
          <option value={0}>Any Rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black text-black font-medium hover:bg-black hover:text-white transition"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
