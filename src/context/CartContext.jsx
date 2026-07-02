import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item,
        );
      }

      return [...prevCart, { ...product, count: 1 }];
    });

    toast.success("محصول به سبد خرید شما اضافه شد");
  };

  const decreaseFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (!existingItem) return prevCart;

      if (existingItem.count === 1) {
        return prevCart.filter((item) => item.id !== id);
      }

      return prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item,
      );
    });
  };

  const clearCart = () => {
    setCart([]);

    toast.success('سبد خرید با موفقیت خالی شد')
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    toast.success('محصول از سبد خرید حذف شد')
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
