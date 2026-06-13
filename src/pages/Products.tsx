import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import Product from "../components/Product";
import Modal from "../components/Modal";
import {
  handleButtonClick,
  handleView,
  closeModal,
} from "../utils/commonUtils";
import SpinnerLoader from "../components/SpinnerLoader";
import Error from "../components/Error";
import NotFound from "../components/NotFound";
import type { CategoryProductsResponse, Product as ProductType } from "../types";

// Price a product is effectively sold at (sale price when on sale).
const priceOf = (product: ProductType): number =>
  product.isOnSale && product.salePrice > 0
    ? product.salePrice
    : product.regularPrice;

type SortOption = "default" | "newest" | "price-asc" | "price-desc";

export default function Products() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<CategoryProductsResponse>(
    `/categories/categories/${id}`
  );
  const [title, setTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.category.name);
    }
  }, [data]);

  // Filter + sort happen on the client over the already-fetched products.
  const visibleProducts = useMemo(() => {
    const products = data?.products ?? [];
    const filtered = onSaleOnly
      ? products.filter((p) => p.isOnSale && p.salePrice > 0)
      : products;

    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => priceOf(a) - priceOf(b));
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => priceOf(b) - priceOf(a));
    } else if (sortBy === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
    }
    return sorted;
  }, [data, onSaleOnly, sortBy]);

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

  if (!data || data.products.length === 0) {
    return (
      <div className="py-80">
        <NotFound />
      </div>
    );
  }

  return (
    <section className="max-w-screen-xl w-[90%] mx-auto py-10">
      <h2 className="py-5 text-3xl text-center capitalize">{title}</h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 min-h-[44px] cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-5 w-5 accent-clay"
            checked={onSaleOnly}
            onChange={(e) => setOnSaleOnly(e.target.checked)}
          />
          <span className="capitalize tracking-wide">on sale only</span>
        </label>

        <label className="flex items-center gap-2">
          <span className="capitalize tracking-wide">sort by</span>
          <select
            className="min-h-[44px] border border-ink/15 rounded-lg px-3 bg-cream"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort products">
            <option value="default">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="text-center py-20 tracking-wide">
          No products match this filter.
        </p>
      ) : (
        <div className="max-w-[230px] mx-auto py-10 md:max-w-[500px] lg:max-w-[770px] xl:max-w-[1040px] grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[40px] lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <Product
              product={product}
              key={product._id}
              handleButtonClick={handleButtonClick}
              handleView={(e) =>
                handleView(e, product, setIsModalOpen, setSelectedProduct)
              }
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <Modal
          closeModal={() => closeModal(setIsModalOpen)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
