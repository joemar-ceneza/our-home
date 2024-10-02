import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, handleInput, addQty, reduceQty } =
    useContext(CartContext);

  return (
    <>
      <hr />
      <div className="flex flex-col justify-around items-center py-5 tracking-wide overflow-hidden relative md:flex-row">
        <Link to={`/product/${item.slug}`} className="w-[200px] h-[200px]">
          <img src={`${item.image}`} alt="" />
        </Link>
        <h2 className="text-xs text-left font-semibold md:text-base md:px-3">
          {item.name}...
        </h2>
        <div className="flex justify-between py-5">
          {item.isOnSale === true && item.salePrice !== 0 ? (
            <p className="text-left">₱ {item.salePrice}</p>
          ) : (
            <p className="text-left">₱ {item.regularPrice}</p>
          )}
          <div className="w-[40%] flex justify-center items-center">
            <button
              className="bg-gray-200 px-3 hover:bg-gray-300"
              onClick={() => reduceQty(item._id)}>
              -
            </button>
            <input
              type="number"
              className="w-[25%] text-center"
              value={`${item.amount}`}
              onChange={(e) => handleInput(e, item.id)}
            />
            <button
              className="bg-gray-200 px-3 hover:bg-gray-300"
              onClick={() => addQty(item._id)}>
              +
            </button>
          </div>
          {item.isOnSale === true && item.salePrice !== 0 ? (
            <p className="text-center">₱ {item.salePrice * item.amount}</p>
          ) : (
            <p className="text-center">₱ {item.regularPrice * item.amount}</p>
          )}
        </div>
        <button
          onClick={() => removeFromCart(item._id)}
          className="absolute top-1 right-0 text-sm hover:bg-gray-300 rounded-md">
          <IoMdClose />
        </button>
      </div>
    </>
  );
}
