import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Product({
  product,
  handleButtonClick,
  handleView,
  bestLabel,
  newLabel,
  relatedLabel,
}) {
  const { addToCart } = useContext(CartContext);

  const onAddToCart = (e) => {
    e.preventDefault();
    handleButtonClick(e);
    addToCart(product);
  };

  const onView = (e) => {
    e.preventDefault();
    handleView(e, product);
  };

  return (
    <Link to={`/product/${product.attributes.slug}`} draggable="false">
      <div className="bg-slate-200 w-[230px] h-[320px] mx-auto rounded-[8px] relative group">
        <div className="w-full h-[200px] flex flex-col items-center justify-center">
          <img
            className="w-4/5 h-[160px]"
            src={`${product.attributes.image.data.attributes.url}`}
            alt=""
          />
          <div className="absolute bottom-[140px] w-4/5 flex justify-around text-sm opacity-0 text-white group-hover:opacity-100 group-hover:bg-gray-700 transition ease-in-out delay-75">
            <button
              className="w-full flex justify-around items-center uppercase p-1 hover:bg-gray-500"
              onClick={onAddToCart}>
              <FaShoppingCart />
              add to cart
            </button>
            <button
              className="w-1/4 flex justify-center items-center max-h-screen p-1 bg-black"
              onClick={onView}>
              <FaEye />
            </button>
          </div>
        </div>
        <div className="text-gray-700 text-sm tracking-wide mx-8">
          <div className=" font-bold capitalize tracking-wider mb-1">
            {product.attributes.categories.data[0].attributes.title}
          </div>
          <div className="capitalize tracking-wide">
            {product.attributes.title.substring(0, 18)}...
          </div>
          {bestLabel &&
            product.attributes.isOnSale &&
            product.attributes.salePrice !== 0 && (
              <div className="absolute bg-red-500 text-white text-xs font-bold uppercase top-8 left-8 px-2 py-1 z-10">
                sale
              </div>
            )}
          {newLabel && product.attributes.isNew && (
            <div className="absolute bg-green-500 text-white text-xs font-bold uppercase top-8 left-8 px-2 py-1 z-10">
              new
            </div>
          )}
          {relatedLabel &&
            product.attributes.isOnSale &&
            product.attributes.salePrice !== 0 && (
              <div className="absolute bg-red-500 text-white text-xs font-bold uppercase top-8 left-8 px-2 py-1 z-10">
                sale
              </div>
            )}
          {product.attributes.isOnSale && product.attributes.salePrice !== 0 ? (
            <>
              <div className="absolute bottom-8">
                ₱{product.attributes.salePrice.toLocaleString()}
              </div>
              <div className="absolute bottom-8 left-28 text-gray-400 line-through">
                ₱{product.attributes.regPrice.toLocaleString()}
              </div>
            </>
          ) : (
            <div className="absolute bottom-8">
              ₱{product.attributes.regPrice.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
