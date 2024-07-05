import { Link } from "react-router-dom";
import { IoMdClose, IoIosArrowRoundForward } from "react-icons/io";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Modal({ product, closeModal }) {
  const { handleInput, addQty, reduceQty, addToCart } = useContext(CartContext);
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";
    return () => {
      // Cleanup to disable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute bg-black opacity-50 inset-0"
        onClick={closeModal}></div>
      <div className="relative max-w-4xl w-3/4 flex flex-col justify-between bg-white p-6 rounded-lg z-50 lg:flex-row">
        <img
          src={`${product?.attributes.image.data.attributes.url}`}
          alt={product?.attributes.title}
          className="w-full h-auto lg:w-80"
        />
        <div className="w-full capitalize tracking-wide lg:py-10 lg:mx-8">
          <h2 className="text-2xl font-bold">{product?.attributes.title}</h2>
          <div className="flex">
            {product.attributes.isOnSale &&
            product.attributes.salePrice !== 0 ? (
              <>
                <div className="absolute bg-red-500 text-white text-xs font-bold uppercase top-8 left-8 px-2 py-1 z-10">
                  sale
                </div>
                <p className="py-3 text-lg font-bold text-red-500">
                  ₱ {product?.attributes.salePrice.toLocaleString()}
                </p>
                <p className="py-3 px-5 text-sm font-bold text-gray-300 line-through">
                  ₱ {product?.attributes.regPrice.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="py-3 text-lg font-bold text-red-500">
                ₱ {product?.attributes.regPrice.toLocaleString()}
              </p>
            )}
          </div>
          <p className="pt-5 hidden">quantity</p>
          <div className="py-3 hidden">
            <button
              className="rounded-l-lg bg-gray-200 px-4 py-1"
              onClick={() => reduceQty(product.id)}>
              -
            </button>
            <input
              type="number"
              value={`${product.amount}`}
              onChange={(e) => handleInput(e, product.id)}
              className="w-24 bg-gray-200 py-1 text-center focus:outline-none"
            />
            <button
              className="rounded-r-lg bg-gray-200 px-4 py-1"
              onClick={() => addQty(product.id)}>
              +
            </button>
          </div>
          <button
            className="my-2 py-2 px-[46px] bg-slate-900 text-white"
            onClick={() => addToCart(product)}>
            Add to cart
          </button>
          <Link to={`/product/${product.attributes.slug}`} onClick={closeModal}>
            <p className="flex items-center text-sm underline mt-7">
              view full details
              <span className="text-2xl pl-1">
                <IoIosArrowRoundForward />
              </span>
            </p>
          </Link>
        </div>
        <button
          onClick={closeModal}
          className="absolute right-6 bg-white rounded p-2 hover:bg-gray-300">
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
