import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { request } from "../request";
import CartItem, { CART_GRID } from "../components/CartItem";

interface CreateOrderResponse {
  stripeSession: { id: string };
}

export default function Cart() {
  const { cart, total, clearCart, itemsAmount } = useContext(CartContext);
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? ""
  );

  const handlePayment = async (): Promise<void> => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const res = await request.post<CreateOrderResponse>("/orders", { cart });
      if (!res.data || !res.data.stripeSession || res.status !== 200) {
        throw new Error("Failed to create Stripe session");
      }
      await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing failed. Please try again.");
    }
  };

  return (
    <section className="max-w-screen-2xl w-[95%] mx-auto text-center py-10">
      {cart.length === 0 ? (
        <div className="text-4xl normal-case tracking-wider py-60">
          Your cart is currently empty.
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 items-center pt-5 pb-8">
            <Link
              to={`/category`}
              className="flex items-center text-muted hover:text-clay transition-colors">
              <IoChevronBack />
              <p className="capitalize px-3">continue shopping</p>
            </Link>
            <h2 className="font-serif text-3xl capitalize text-ink">cart</h2>
            <p className="text-right text-muted">{itemsAmount} item(s)</p>
          </div>

          <div
            className={`hidden md:grid ${CART_GRID} items-center gap-4 pb-3 text-xs uppercase tracking-wider text-muted`}>
            <span></span>
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
            <span></span>
          </div>

          {cart.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
          <hr className="border-ink/10" />
          <div className="max-w-80 mx-auto flex flex-col py-10 md:mx-0 md:ml-auto">
            <div className="w-full flex justify-between font-semibold text-2xl capitalize py-3">
              <p className="w-1/4 text-left">total</p>
              <p className="w-2/5 text-right">₱ {total.toLocaleString()}</p>
            </div>
            <div className="max-w-96 flex flex-col py-5 gap-3">
              <button
                className="bg-clay hover:bg-clay-dark transition-colors rounded-lg p-3 px-16 text-white capitalize"
                onClick={handlePayment}>
                check out
              </button>
              <button
                className="border border-ink/20 text-ink hover:bg-ink/5 transition-colors rounded-lg p-3 px-16 capitalize"
                onClick={clearCart}>
                clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
