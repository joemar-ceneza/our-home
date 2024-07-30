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
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, isLoading, error } = useFetch(
    `/products?populate=*&filters[isFeatured]=true&pagination[page]=${page}&pagination[pageSize]=${defaultPageSize}`
  );

  useEffect(() => {
    if (data) {
      const newProducts = data.filter(
        (newProduct) =>
          !products.some((product) => product.id === newProduct.id)
      );

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, ...newProducts];
        if (page === 1) setDefaultProducts(updatedProducts);
        return updatedProducts;
      });
    }
  }, [data, page]);

  useEffect(() => {
    if (!isLoading) setIsFetchingMore(false);
  }, [isLoading]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsFetchingMore(true);
  };

  const loadLess = () => {
    setProducts(defaultProducts);
    setPage(1);
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
            <FeaturedProductItem key={product.id} product={product} />
          ))}
        </div>
        {isFetchingMore && (
          <p className="text-center font-bold py-10">Loading more...</p>
        )}
      </>
    );
  };

  return (
    <section className="max-w-screen-2xl w-[95%] mx-auto pb-36">
      <h2 className="w-full text-2xl text-center text-gray-800 font-semibold tracking-wider capitalize py-16 sm:text-3xl">
        Featured Products
      </h2>
      {renderContent()}
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
