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
import type { ProductDetail } from "../types";

export default function ProductsDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<ProductDetail[]>(
    `/products/products?slug=${id}`
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

  return (
    <section className="max-w-screen-2xl w-[90%] mx-auto py-10">
      <div className="flex items-center py-5">
        <Link to={"/"}>
          <IoHomeOutline />
        </Link>
        <IoChevronForward className="mx-2" />
        <Link to={`/products/${product.category.slug}`}>
          <p className="text-sm tracking-wide capitalize">
            {product.category.name}
          </p>
        </Link>
        <IoChevronForward className="mx-2" />
        <p className="text-sm tracking-wide capitalize">{product.name}</p>
      </div>
      <div className="flex justify-between gap-10 max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full bg-white rounded-2xl shadow-soft flex items-center justify-center p-8">
          <img
            className="max-h-[420px] w-auto object-contain"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="w-1/2 p-10 max-lg:w-full max-lg:px-0">
          <h2 className="text-3xl font-medium text-gray-700">{product.name}</h2>
          <div className="flex items-baseline gap-4 py-3">
            {product.isOnSale && product.salePrice > 0 ? (
              <>
                <p className="text-2xl font-semibold text-clay">
                  ₱ {product.salePrice.toLocaleString()}
                </p>
                <p className="text-muted text-sm line-through">
                  ₱ {product.regularPrice.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-ink">
                ₱ {product.regularPrice.toLocaleString()}
              </p>
            )}
          </div>

          <hr />
          <p className="py-5 tracking-wide">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-clay hover:bg-clay-dark transition-colors rounded-lg my-7 p-3 px-16 text-white capitalize max-lg:w-full">
            add <span className="normal-case">to</span> cart
          </button>
        </div>
      </div>
      <RelatedProducts categoryTitle={product.slug} />
    </section>
  );
}
