import useFetch from "../hook/useFetch";
import { useState } from "react";
import ProductSlider from "./ProductSlider";
import LoaderSpinner from "./SpinnerLoader";
import Error from "./Error";
import Modal from "./Modal";
import {
  handleButtonClick,
  handleView,
  closeModal,
} from "../utils/commonUtils";

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
      return <LoaderSpinner />;
    }

    if (error) {
      return <Error />;
    }

    if (!data || data.length === 0) {
      return <div>No products found</div>;
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
      <div className="inline-flex items-center justify-center w-full capitalize text-sm pb-6">
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
