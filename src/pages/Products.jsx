import { useState, useEffect } from "react";
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

export default function Products() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`/categories/categories/${id}`);
  const [title, setTitle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (data) {
      setTitle(data?.category.name);
    }
  }, [data]);

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
      <h2 className="py-5 uppercase text-xl text-center font-bold">{title}</h2>
      <div className="max-w-[230px] mx-auto py-10 md:max-w-[500px] lg:max-w-[770px] xl:max-w-[1040px] grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[40px] lg:grid-cols-3 xl:grid-cols-4">
        {data?.products.map((product) => {
          return (
            <Product
              product={product}
              key={product._id}
              handleButtonClick={handleButtonClick}
              handleView={(e) =>
                handleView(e, product, setIsModalOpen, setSelectedProduct)
              }
              closeModal={closeModal}
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
