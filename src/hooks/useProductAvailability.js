import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useProductAvailability = (productId) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAvailability = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${productId}`);
        if (isMounted) {
          setIsAvailable(data?.stock > 0);
        }
      } catch (err) {
        console.error("Failed to check availability:", err.message);
        toast.error("Failed to check availability")
        if (isMounted) setIsAvailable(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAvailability();
    const intervalId = setInterval(checkAvailability, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [productId]);

  return { isAvailable, isLoading };
};
