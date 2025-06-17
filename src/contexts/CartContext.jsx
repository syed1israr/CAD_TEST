import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CTX = createContext();
export const useCart = () => useContext(CTX);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    let active = true;

    const getCart = async () => {
      try {
        const { data } = await axios.get("https://dummyjson.com/carts/4");
        if (!active) return;
        if( data ){
          data.products.map((product)=>{
            product.quantity = 1;
          })
        }
        setItems(data.products);
        setId(data.id);
      } catch (err) {
        if (active) console.error("Cart fetch failed:", err);
      }
    };

    getCart();

    return () => {
      active = false;
    };
  }, []);

  const addToCart = async (p) => {
    console.log("Adding to cart:", p);
    try {
      await axios.post("https://dummyjson.com/carts/add", {
        userId: 1,
        products: [{ id: p.id, quantity: 1 }],
      });

      setItems((prev) => {
        const index = prev.findIndex((i) => i.id === p.id);
        if (index !== -1) {
          const clone = [...prev];
          clone[index].quantity += 1;
          return clone;
        }
        return [...prev, { ...p, quantity: 1 }];
      });
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const removeFromCart = async (pid) => {
    try {
      const filtered = items.filter((i) => i.id !== pid);
      const { data } = await axios.put(`https://dummyjson.com/carts/${id}`, {
        products: filtered,
      });
      setItems(data.products);
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const updateQuantity = async (pid, qty) => {
    try {
      const updated = items.map((i) =>
        i.id === pid ? { ...i, quantity: Math.max(0, qty) } : i
      );
      const { data } = await axios.put(`https://dummyjson.com/carts/${id}`, {
        products: updated,
      });
      setItems(data.products);
    } catch (err) {
      console.error("Quantity update error:", err);
    }
  };

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CTX.Provider value={{ cart: items, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CTX.Provider>
  );
};
