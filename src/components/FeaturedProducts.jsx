import { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";
import FeaturedProductItem from "./FeaturedProductItem";

export default function FeaturedProducts() {
  const defaultPageSize = 10;

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, isLoading, error } = useFetch(
    `/products?populate=*&filters[isFeatured]=true&pagination[page]=${page}&pagination[pageSize]=${defaultPageSize}`
  );

  useEffect(() => {
    if (data) {
      const newProducts = data.filter((newProduct) => {
        return !products.some((product) => product.id === newProduct.id);
      });

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, ...newProducts];

        // Store the initial set of products
        if (page === 1) {
          setDefaultProducts(updatedProducts);
        }

        return updatedProducts;
      });
    }
  }, [data]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsFetchingMore(true);
  };

  const loadLess = () => {
    setProducts(defaultProducts);
    setPage(1);
  };

  useEffect(() => {
    if (!isLoading) {
      setIsFetchingMore(false);
    }
  }, [isLoading]);

  return (
    <section className="max-w-screen-2xl w-[95%] mx-auto pb-36">
      <h2 className="w-full text-2xl text-center text-gray-800 font-semibold tracking-wider capitalize py-16 sm:text-3xl">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5 relative">
        {isLoading && page === 1 ? (
          <div className="absolute w-full flex justify-center items-center transform">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-14 w-14"></div>
          </div>
        ) : (
          products?.map((product) => (
            <FeaturedProductItem key={product.id} product={product} />
          ))
        )}
      </div>
      {isFetchingMore && (
        <p className="text-center font-bold py-10">Loading more...</p>
      )}
      {error && (
        <p className="flex justify-center items-center text-red-500  font-bold h-14">
          Error loading products...
        </p>
      )}
      <div className="mt-10 flex justify-center gap-4">
        {data && data.length === defaultPageSize && (
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg">
            Load More
          </button>
        )}
        {page > 1 && (
          <button
            onClick={loadLess}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg">
            Load Less
          </button>
        )}
      </div>
    </section>
  );
}
