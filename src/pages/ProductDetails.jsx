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
  const { data, isLoading, error } = useFetch(
    `/products?populate=*&filters[slug][$eq]=${id}`
  );

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

  const product = data[0];
  const categoryTitle = data[0].name;

  return (
    <section className="max-w-screen-2xl w-[90%] mx-auto py-10">
      <div className="flex items-center py-5">
        <Link to={"/"}>
          <IoHomeOutline />
        </Link>
        <IoChevronForward className="mx-2" />
        <Link to={`/products/${data[0].slug}`}>
          <p className="text-sm tracking-wide capitalize">{data[0].name}</p>
        </Link>
        <IoChevronForward className="mx-2" />
        <p className="text-sm tracking-wide capitalize">{data[0].title}</p>
      </div>
      <div className="flex justify-between max-lg:flex-col">
        <img className="w-1/2 max-lg:w-full" src={data[0].image} alt="" />
        <div className="w-1/2 p-10 max-lg:w-full max-lg:px-0">
          <h2 className="text-3xl font-medium text-gray-700">{data[0].name}</h2>
          <p className="py-3">₱ {data[0].regularPrice.toLocaleString()}</p>
          <hr />
          <p className="py-5 tracking-wide">{data[0].description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-800 my-7 p-3 px-16 text-white capitalize max-lg:w-full">
            add <span className="normal-case">to</span> cart
          </button>
        </div>
      </div>
      <RelatedProducts categoryTitle={categoryTitle} />
    </section>
  );
}
