import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [itemsAmount, setItemsAmount] = useState();
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculate the total number of items in the cart
  useEffect(() => {
    const amount = cart.reduce((a, c) => {
      return a + c.amount;
    }, 0);
    setItemsAmount(amount);
  }, [cart]);

  // cart total
  useEffect(() => {
    const total = cart.reduce((a, c) => {
      const priceToUse =
        c.isOnSale && c.salePrice !== 0 ? c.salePrice : c.regularPrice;
      return a + priceToUse * c.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // add to cart
  const addToCart = (item) => {
    const itemID = item._id;
    const existingItem = cart.find((cartItem) => cartItem._id === itemID);

    if (existingItem) {
      // If item already exists in cart, update its amount
      const updatedCart = cart.map((cartItem) =>
        cartItem._id === itemID
          ? { ...cartItem, amount: cartItem.amount + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // If item does not exist in cart, add it with amount 1
      const newItem = { ...item, amount: 1 };
      setCart([...cart, newItem]);
    }
  };

  // remove cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item._id !== id;
    });
    setCart(newCart);
  };

  // handle input
  const handleInput = (e, id) => {
    const value = parseInt(e.target.value, 10);
    const newCart = cart
      .map((item) => {
        if (item.id === id) {
          if (isNaN(value) || value < 1) {
            removeFromCart(id);
            return null; // This item will be filtered out
          } else {
            return { ...item, amount: value };
          }
        }
        return item;
      })
      .filter(Boolean); // Remove null values from the cart
    setCart(newCart);
  };

  // increase quantity
  const addQty = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === id) {
          const newAmount = item.amount + 1;
          if (newAmount < 1) {
            return null;
          }
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      })
      .filter(Boolean);
    setCart(updatedCart);
  };

  // decrease quantity
  const reduceQty = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === id) {
          const newAmount = item.amount - 1;
          if (newAmount < 1) {
            return null; // This item will be filtered out
          }
          return { ...item, amount: newAmount };
        }
        return item;
      })
      .filter(Boolean); // Remove null values from the cart
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

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
      }}>
      {children}
    </CartContext.Provider>
  );
}
