import { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";
import FeaturedProductItem from "./FeaturedProductItem";
import SpinnerLoader from "./SpinnerLoader";
import Error from "./Error";
import NotFound from "./NotFound";

export default function FeaturedProducts() {
  const defaultPageSize = 10;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, isLoading, error } = useFetch(
    `/products/featured?page=${page}&pageSize=${defaultPageSize}`
  );

  useEffect(() => {
    if (data && data.products) {
      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => {
          const newProducts = data.products.filter(
            (newProduct) => !prevProducts.some((p) => p._id === newProduct._id)
          );
          return [...prevProducts, ...newProducts];
        });
      }
    }
  }, [data, page]);

  useEffect(() => {
    if (!isLoading) setIsFetchingMore(false);
  }, [isLoading]);

  const loadMore = () => {
    if (data?.pagination && page < data.pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const loadLess = () => {
    setPage(1);
    if (data?.products) {
      setProducts(data?.products);
    }
  };

  const renderContent = () => {
    if (isLoading && page === 1) {
      return <SpinnerLoader />;
    }

    if (error) {
      return <Error message="Error Loading Products..." />;
    }

    if (!products || products.length === 0) {
      return <NotFound message="No products found." />;
    }

    return (
      <>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5 relative">
          {products.map((product) => (
            <FeaturedProductItem key={product._id} product={product} />
          ))}
        </div>
        {isFetchingMore && (
          <p className="text-center font-bold py-10">Loading more...</p>
        )}
      </>
    );
  };

  return (
    <section className="max-w-screen-2xl w-[95%] mx-auto py-10">
      <h2 className="w-full text-2xl text-center text-gray-800 font-semibold tracking-wider capitalize py-16 sm:text-3xl">
        Featured Products
      </h2>
      {renderContent()}
      <div className="mt-10 flex justify-center gap-4">
        {data && data.products && data.products.length === defaultPageSize && (
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
      <div className="text-center py-8">
        <p className="text-xs tracking-wider font-bold">
          {products.length > 0
            ? `Showing ${products.length} of ${data?.pagination.totalProducts}`
            : null}
        </p>
      </div>
    </section>
  );
}
