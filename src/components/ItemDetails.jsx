import { gsap } from "gsap";
import { AlertCircle, Shield, ShoppingCart, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useProductAvailability } from "../hook/useProductAvailability.js";
import ItemCard from "../Utils/ItemCard.jsx";
import ItemRating from "../Utils/ItemRating.jsx";

const ItemDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAvailable, isLoading } = useProductAvailability(Number(id));
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const getProductAndRelated = async () => {
      setLoading(true);

      try {
        const { data: prod } = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(prod);

        const { data: related } = await axios.get(
          `https://dummyjson.com/products/category/${prod.category}?limit=8`
        );

        const filtered = related.products.filter(p => p.id !== prod.id);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };

    getProductAndRelated();
  }, [id]);

  useEffect(() => {
    if (product && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [product]);

  const handleRate = (newRating) => {
    setProduct(prev =>
      prev ? { ...prev, rating: (prev.rating + newRating) / 2 } : prev
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin h-24 w-24 border-4 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-black mb-4">Product not found</h2>
        <p className="text-black/60">We couldn’t find the item you were looking for.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div
        ref={cardRef}
        className="bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 h-96 md:h-auto">
          <img
            className="w-full h-full object-cover"
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
          />
        </div>

        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <p className="uppercase text-sm text-black/50 font-semibold tracking-wide">
              {product.category}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold">{product.title}</h1>
            <p className="mt-4 text-black/70">{product.description}</p>

            <div className="mt-6">
              <span className="text-5xl font-bold">₹{product.price.toFixed(2)}</span>
              <span className="ml-2 text-2xl text-black/40 line-through">
                ₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
              <span className="ml-2 text-lg text-green-600 font-semibold">
                {product.discountPercentage}% off
              </span>
            </div>

            <div className="mt-6 flex items-center">
              <ItemRating initialRating={product.rating} onRate={handleRate} />
              <span className="ml-2 text-black/60">({product.rating.toFixed(1)})</span>
            </div>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="h-14 w-full rounded-lg bg-black/10 animate-pulse" />
            ) : isAvailable ? (
              <button
                onClick={() => {addToCart(product), toast.success(`${product.title} added to cart!`);}}
                className="w-full border border-black text-black py-4 px-6 rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Add to Cart
                </div>
              </button>
            ) : (
              <div className="w-full bg-black/5 text-black/60 py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Out of Stock
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Free Shipping
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              2 Year Warranty
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(prod => (
            <ItemCard key={prod.id} product={prod} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
