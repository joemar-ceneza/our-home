import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import RelatedProducts from "../components/RelatedProducts";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { IoHomeOutline, IoChevronForward } from "react-icons/io5";

export default function ProductsDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const { data } = useFetch(`/products?populate=*&filters[slug][$eq]=${id}`);
  if (!data) {
    return <div className="container mx-auto">loading...</div>;
  }
  const product = data[0];
  const categoryTitle = data[0].attributes.categories.data[0].attributes.title;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return (
    <section className="max-w-screen-2xl w-[90%] mx-auto py-10">
      <div className="flex items-center py-5">
        <Link to={"/"}>
          <IoHomeOutline />
        </Link>
        <IoChevronForward className="mx-2" />
        <Link
          to={`/products/${data[0].attributes.categories.data[0].attributes.slug}`}>
          <p className="text-sm tracking-wide capitalize">
            {data[0].attributes.categories.data[0].attributes.title}
          </p>
        </Link>
        <IoChevronForward className="mx-2" />
        <p className="text-sm tracking-wide capitalize">
          {data[0].attributes.title}
        </p>
      </div>
      <div className="flex justify-between max-lg:flex-col">
        <img
          className="w-1/2 max-lg:w-full"
          src={`${baseUrl}${data[0].attributes.image.data.attributes.url}`}
          alt=""
        />
        <div className="w-1/2 p-10 max-lg:w-full max-lg:px-0">
          <h2 className="text-3xl font-medium text-gray-700">
            {data[0].attributes.title}
          </h2>
          <p className="py-3">
            ₱ {data[0].attributes.regPrice.toLocaleString()}
          </p>
          <hr />
          <p className="py-5 tracking-wide">{data[0].attributes.description}</p>
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
