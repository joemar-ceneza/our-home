import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartContextValue, CartItem, Product } from "../types";

// Cast the default: every consumer is rendered inside CartProvider, so the
// value is never actually null at runtime.
export const CartContext = createContext<CartContextValue>(
  {} as CartContextValue
);

const priceOf = (item: CartItem): number =>
  item.isOnSale && item.salePrice !== 0 ? item.salePrice : item.regularPrice;

export default function CartProvider({ children }: { children: ReactNode }) {
  const cartFromLocalStorage: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const [cart, setCart] = useState<CartItem[]>(cartFromLocalStorage);

  // persist the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // total number of items in the cart (derived, not stored)
  const itemsAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.amount, 0),
    [cart]
  );

  // cart total price (derived, not stored)
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + priceOf(item) * item.amount, 0),
    [cart]
  );

  const addToCart = (item: Product): void => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, amount: 1 }]);
    }
  };

  const removeFromCart = (id: string): void => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // set an exact quantity from the number input; remove the line if invalid/<1
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    const value = parseInt(e.target.value, 10);
    const newCart = cart
      .map((item) => {
        if (item._id === id) {
          if (isNaN(value) || value < 1) {
            return null; // filtered out below
          }
          return { ...item, amount: value };
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);
    setCart(newCart);
  };

  const addQty = (id: string): void => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const reduceQty = (id: string): void => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === id) {
          const newAmount = item.amount - 1;
          if (newAmount < 1) {
            return null; // filtered out below
          }
          return { ...item, amount: newAmount };
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);
    setCart(updatedCart);
  };

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        itemsAmount,
        removeFromCart,
        handleInput,
        addQty,
        reduceQty,
        total,
        clearCart,
        setCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
