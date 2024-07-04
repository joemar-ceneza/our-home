import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { IoChevronBack } from "react-icons/io5";
// stripe
import { loadStripe } from "@stripe/stripe-js";
import { request } from "../request";

export default function Cart() {
  const { cart, total, clearCart, itemsAmount } = useContext(CartContext);

  const stripePromise = loadStripe(
    "pk_test_51NULHNLL9SaFonV4HXbhhyIobbTZWElP8aSBOAoh1Mf0BnNWvF4lbLsPPtUhkrSKZvmOTp9ONkUpot3aMxnfuRge00Q9V0YSB3"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await request.post("/orders", {
        cart,
      });
      if (res.status !== 200) {
        throw new Error("Failed to create Stripe session");
      }
      const sessionId = res.data.stripeSession.id;
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing failed. Please try again.");
    }
  };

  return (
    <section className="max-w-screen-2xl w-[95%] mx-auto text-center py-10">
      {cart.length === 0 ? (
        <div className="text-4xl normal-case tracking-wider py-20">
          Your cart is currently empty.
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 items-center pt-5 pb-16">
            <Link to={`/category`} className="flex items-center">
              <IoChevronBack />
              <p className="capitalize px-3">continue shopping</p>
            </Link>
            <h2 className="text-2xl font-bold capitalize text-slate-700">
              cart
            </h2>
            <p className="text-right">{itemsAmount} item(s)</p>
          </div>
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
          <hr />
          <div className="flex flex-col items-center py-10">
            <div className="w-full flex justify-around font-semibold text-2xl capitalize py-3 sm:justify-center">
              <p className="w-1/2">total</p>
              <p className="w-1/2 text-center">
                ₱ {parseFloat(total).toLocaleString()}
              </p>
            </div>
            <div className="">
              <button
                className="bg-gray-800 my-3 mx-16 p-3 px-16 text-white capitalize font-normal"
                onClick={clearCart}>
                clear cart
              </button>
              <button
                className="bg-gray-800 my-3 mx-16 p-3 px-16 text-white capitalize font-normal"
                onClick={handlePayment}>
                check out
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
