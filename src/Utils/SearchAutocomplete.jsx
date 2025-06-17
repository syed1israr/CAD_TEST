import { useState, useEffect, useRef } from "react";
import { useFilter } from "../contexts/FilterContext";
import { Search } from "lucide-react";
import axios from "axios";

const SearchAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { filters, updateFilters } = useFilter();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = filters.search?.trim();

      if (query.length <= 2) {
        setSuggestions([]);
        setShowSuggestions(false)
        return;
      }

      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/search`,
          { params: { q: query, limit: 5 } }
        );
        console.log("Fetched Suggestions:", data.products); 
        setSuggestions(data?.products || []);
        setShowSuggestions(true)
      } catch (err) {
        console.error("Could not fetch suggestions:", err.message);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [filters.search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    updateFilters({ search: e.target.value });
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    updateFilters({ search: suggestion.title });
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="text-gray-950 w-full px-3 py-[10px] pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filters.search}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white gap-y-2 mt-1 rounded-md shadow-lg max-h-60 overflow-x-hidden">
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              className="text-gray-950 px-3 py-[10px] hover:bg-gray-100 cursor-pointer"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAutocomplete;
