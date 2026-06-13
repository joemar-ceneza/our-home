import { useState } from "react";
import useFetch from "../hook/useFetch";
import ProductSlider, { type SliderData } from "./ProductSlider";
import SpinnerLoader from "./SpinnerLoader";
import Error from "./Error";
import NotFound from "./NotFound";
import Modal from "./Modal";
import { handleButtonClick, closeModal } from "../utils/commonUtils";
import type { Product } from "../types";

interface ProductSectionProps {
  title: string;
  fetchUrl: string;
  bestLabel?: boolean;
  newLabel?: boolean;
  relatedLabel?: boolean;
}

const isEmpty = (data: SliderData | null): boolean => {
  if (!data) return true;
  if (Array.isArray(data)) return data.length === 0;
  return !data.relatedProducts || data.relatedProducts.length === 0;
};

export default function ProductSection({
  title,
  fetchUrl,
  bestLabel,
  newLabel,
  relatedLabel,
}: ProductSectionProps) {
  const { data, isLoading, error } = useFetch<SliderData>(fetchUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product): void => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const renderContent = () => {
    if (isLoading) return <SpinnerLoader />;
    if (error) return <Error />;
    if (isEmpty(data)) return <NotFound />;

    return (
      <ProductSlider
        data={data as SliderData}
        handleButtonClick={handleButtonClick}
        handleView={(e, product) => {
          if (product) openModal(product);
        }}
        bestLabel={bestLabel}
        newLabel={newLabel}
        relatedLabel={relatedLabel}
      />
    );
  };

  return (
    <section className="max-w-screen-xl w-4/5 mx-auto py-16">
      <div className="relative inline-flex items-center justify-center w-full py-3">
        <hr className="w-full h-px my-8 bg-ink/10 border-0" />
        <span className="absolute left-1/2 -translate-x-1/2 px-5 bg-sand font-serif text-2xl capitalize text-ink">
          {title}
        </span>
      </div>
      {renderContent()}
      {isModalOpen && selectedProduct && (
        <Modal
          closeModal={() => closeModal(setIsModalOpen)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
