import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
    // function from cart context API 
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const cartRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      gsap.fromTo(
        cartRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);
  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8" ref={cartRef}>
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>

        {cart.map((it) => (
          <div
            key={it.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-white/90 shadow-md rounded-xl border border-gray-200"
          >
            <img
              src={it.thumbnail || "/placeholder.svg"}
              alt={it.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{it.title}</h2>
                  <p className="text-gray-600 mt-1">${it.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(it.id, it.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100 text-sm font-medium">{it.quantity}</span>
                  <button
                    onClick={() => updateQuantity(it.id, it.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(it.id)}
                className="mt-3 text-sm text-black hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:sticky  mt-[51px] h-fit bg-white border border-gray-200 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="flex justify-between text-base text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base text-gray-500 mb-4">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <Link to="/" className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-900 transition duration-200">
  Proceed to Checkout
</Link>
      </div>
    </div>
  );
};

export default Cart;
