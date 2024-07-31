import { useState } from "react";
import useFetch from "../hook/useFetch";
import ProductSlider from "./ProductSlider";
import SpinnerLoader from "./SpinnerLoader";
import Error from "./Error";
import NotFound from "./NotFound";
import Modal from "./Modal";
import { handleButtonClick, closeModal } from "../utils/commonUtils";

export default function ProductSection({
  title,
  fetchUrl,
  bestLabel,
  newLabel,
  relatedLabel,
}) {
  const { data, isLoading, error } = useFetch(fetchUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return <SpinnerLoader />;
    }

    if (error) {
      return <Error />;
    }

    if (!data || data.length === 0) {
      return <NotFound />;
    }

    return (
      <ProductSlider
        data={data}
        handleButtonClick={handleButtonClick}
        handleView={(e, product) => openModal(product)}
        bestLabel={bestLabel}
        newLabel={newLabel}
        relatedLabel={relatedLabel}
      />
    );
  };

  return (
    <section className="max-w-screen-xl w-4/5 mx-auto py-16">
      <div className="inline-flex items-center justify-center w-full capitalize text-sm py-3">
        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-5 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          {title}
        </span>
      </div>
      {renderContent()}
      {isModalOpen && (
        <Modal
          closeModal={() => closeModal(setIsModalOpen)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
