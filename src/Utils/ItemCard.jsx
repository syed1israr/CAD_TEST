import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { StarIcon, ShoppingCart, AlertCircle } from "lucide-react";

import toast from "react-hot-toast";
import { useProductAvailability } from "../hook/useProductAvailability";


const ItemCard = React.memo(({ product, addToCart }) => {
  const { isAvailable, isLoading } = useProductAvailability(product.id);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md 
      hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block aspect-[4/3] overflow-hidden">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-105
           transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col p-4 text-black">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-base font-semibold leading-tight line-clamp-2 hover:underline transition-colors">
            {product.title}
          </h2>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold">₹{product.price.toFixed(2)}</p>
          <div className="flex items-center text-sm text-black/60">
            <StarIcon className="size-5 mr-1" />
            {product.rating.toFixed(1)}
          </div>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="h-10 bg-black/10 animate-pulse rounded-lg" />
          ) : isAvailable ? (
            <button
              onClick={() => {addToCart(product), toast.success(`${product.title} added to cart!`);}}
              className="w-full py-2 px-4 rounded-lg border border-black text-black font-medium flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          ) : (
            <div className="w-full py-2 px-4 rounded-lg bg-black/5 text-black/50 font-medium flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Out of Stock
            </div>
          )}
        </div>
      </div>

  
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
});

export default ItemCard;
