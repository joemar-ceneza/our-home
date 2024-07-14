import useFetch from "../hook/useFetch";
import { useState } from "react";
import ProductSlider from "./ProductSlider";
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

  if (isLoading) {
    return (
      <div className="w-full h-[150px] mx-auto flex justify-center items-center transform">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-14 w-14"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[150px] flex justify-center items-center text-red-500 text-center font-bold ">
        Error Loading Products...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="max-w-screen-xl w-4/5 mx-auto py-16">
      <div className="inline-flex items-center justify-center w-full capitalize text-sm pb-6">
        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-5 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          {title}
        </span>
      </div>
      <ProductSlider
        data={data}
        handleButtonClick={handleButtonClick}
        handleView={(e, product) =>
          handleView(e, product, setIsModalOpen, setSelectedProduct)
        }
        bestLabel={bestLabel}
        newLabel={newLabel}
        relatedLabel={relatedLabel}
      />
      {isModalOpen && (
        <Modal
          closeModal={() => closeModal(setIsModalOpen)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
