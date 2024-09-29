import { useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hook/useFetch";
import Product from "../components/Product";
import Modal from "../components/Modal";
import {
  handleButtonClick,
  handleView,
  closeModal,
} from "../utils/commonUtils";

export default function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query");
  const { data } = useFetch(`/products/search?name=${searchTerm}`);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="max-w-screen-xl w-[90%] mx-auto py-10">
      <div className="py-5 text-xl uppercase text-center lg:text-left">
        {data?.length > 0
          ? `${data.length} results for "${searchTerm}"`
          : `no results found for "${searchTerm}"`}
      </div>
      <div className="max-w-[230px] mx-auto md:max-w-[500px] lg:max-w-[770px] xl:max-w-[1040px] grid justify-around grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[40px]">
        {data?.map((product) => {
          return (
            <Product
              key={product._id}
              product={product}
              handleButtonClick={handleButtonClick}
              handleView={(e, product) =>
                handleView(e, product, setIsModalOpen, setSelectedProduct)
              }
            />
          );
        })}
      </div>
      {isModalOpen && (
        <Modal
          closeModal={() => closeModal(setIsModalOpen)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
