import { useEffect, useRef } from "react";
import { useFilter } from "../contexts/FilterContext";
import { Filter, RefreshCw, BadgeDollarSign, Star } from "lucide-react";
import { gsap } from "gsap";

const Filter_Component = () => {
  const { filters, updateFilters, resetFilters } = useFilter();
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-white text-black p-6 rounded-2xl shadow-xl border border-gray-200 mb-6"
    >
      <div className="flex items-center gap-2 font-semibold text-lg tracking-wide">
        <Filter className="w-5 h-5 text-black" />
        <span>Refine Products</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">


        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="bg-white text-black p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
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
            value={filters.minPrice}
            onChange={(e) =>
              updateFilters({ [e.target.name]: parseFloat(e.target.value) })
            }
            placeholder="Min"
            className="w-20 p-2 border border-black rounded-xl text-sm"
          />
          <span>-</span>
          <input
            type="number"
            name="maxPrice"
            value={
              filters.maxPrice === Number.POSITIVE_INFINITY
                ? ""
                : filters.maxPrice
            }
            onChange={(e) =>
              updateFilters({ [e.target.name]: parseFloat(e.target.value) })
            }
            placeholder="Max"
            className="w-20 p-2 border border-black rounded-xl text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filters.rating}
            onChange={(e) =>
              updateFilters({ rating: parseFloat(e.target.value) })
            }
            className="bg-white text-black p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          >
            <option value={0}>Any Rating</option>
            <option value={1}>1 ⭐</option>
            <option value={2}>2 ⭐</option>
            <option value={3}>3 ⭐</option>
            <option value={4}>4 ⭐</option>
            <option value={5}>5 ⭐</option>
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-black text-black font-semibold hover:bg-black hover:text-white transition-all shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter_Component;
