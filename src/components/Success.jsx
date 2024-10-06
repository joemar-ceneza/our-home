import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Success() {
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="flex flex-col items-center justify-center py-60">
      <h1 className="text-4xl font-bold mb-4 text-green-500">
        Payment Successful!
      </h1>
      <p className="text-lg mb-4">Thank you for your purchase.</p>
      <Link to={"/"} className=" text-blue-500 hover:underline">
        Go back to Homepage
      </Link>
    </div>
  );
}
