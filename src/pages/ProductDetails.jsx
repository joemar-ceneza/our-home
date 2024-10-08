import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { IoHomeOutline, IoChevronForward } from "react-icons/io5";
import RelatedProducts from "../components/RelatedProducts";
import SpinnerLoader from "../components/SpinnerLoader";
import Error from "../components/Error";
import NotFound from "../components/NotFound";

export default function ProductsDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`/products/products?slug=${id}`);

  if (isLoading) {
    return (
      <div className="py-80">
        <SpinnerLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-80">
        <Error />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-80">
        <NotFound />
      </div>
    );
  }

  return (
    <section className="max-w-screen-2xl w-[90%] mx-auto py-10">
      <div className="flex items-center py-5">
        <Link to={"/"}>
          <IoHomeOutline />
        </Link>
        <IoChevronForward className="mx-2" />
        <Link to={`/products/${data[0].category.slug}`}>
          <p className="text-sm tracking-wide capitalize">
            {data[0].category.name}
          </p>
        </Link>
        <IoChevronForward className="mx-2" />
        <p className="text-sm tracking-wide capitalize">{data[0].name}</p>
      </div>
      <div className="flex justify-between max-lg:flex-col">
        <img className="w-1/2 max-lg:w-full" src={data[0].image} alt="" />
        <div className="w-1/2 p-10 max-lg:w-full max-lg:px-0">
          <h2 className="text-3xl font-medium text-gray-700">{data[0].name}</h2>
          <div className="flex">
            {data[0].isOnSale && data[0].salePrice > 0 ? (
              <>
                <p className="py-3">₱ {data[0].salePrice.toLocaleString()}</p>
                <p className="text-gray-300 text-sm line-through py-3 px-5">
                  ₱ {data[0].regularPrice.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="py-3">₱ {data[0].regularPrice.toLocaleString()}</p>
            )}
          </div>

          <hr />
          <p className="py-5 tracking-wide">{data[0].description}</p>
          <button
            onClick={() => addToCart(data[0])}
            className="bg-gray-800 my-7 p-3 px-16 text-white capitalize max-lg:w-full">
            add <span className="normal-case">to</span> cart
          </button>
        </div>
      </div>
      <RelatedProducts categoryTitle={data[0].slug} />
    </section>
  );
}
