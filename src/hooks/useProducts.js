import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PRODUCTS_PER_PAGE = 12;

export const useProducts = (filters) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const offset = page * PRODUCTS_PER_PAGE;

    let url = `${baseURL}?limit=${PRODUCTS_PER_PAGE}&skip=${offset}`;

    if (filters.search?.trim()) {
      url = `${baseURL}/search?q=${encodeURIComponent(filters.search)}&limit=${PRODUCTS_PER_PAGE}&skip=${offset}`;
    } else if (filters.category && filters.category !== "") {
      url = `${baseURL}/category/${filters.category}?limit=${PRODUCTS_PER_PAGE}&skip=${offset}`;
    }

    try {
      const { data } = await axios.get(url);
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching products:", err.message);
      setError("Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    setPage(0); 
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) =>
    p.price >= filters.minPrice &&
    (filters.maxPrice === Infinity || p.price <= filters.maxPrice) &&
    p.rating >= filters.rating
  );

  return {
    filteredProducts,loading,error,page,total,setPage,PRODUCTS_PER_PAGE
  };
};
