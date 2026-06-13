import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Success() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-60 px-4">
      <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">
        Payment successful
      </h1>
      <p className="text-muted mb-8">
        Thank you for your purchase — your order is on its way.
      </p>
      <Link
        to={"/"}
        className="bg-clay hover:bg-clay-dark transition-colors text-white px-8 py-3 rounded-full">
        Back to homepage
      </Link>
    </div>
  );
}
