import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import type { Product } from "../types";

export const handleButtonClick = (e: SyntheticEvent): void => {
  e.stopPropagation();
  e.preventDefault();
};

export const handleView = (
  e: SyntheticEvent,
  product: Product,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>
): void => {
  e.stopPropagation();
  e.preventDefault();
  document.body.style.overflow = "hidden";
  setIsModalOpen(true);
  setSelectedProduct(product);
};

export const closeModal = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
): void => {
  document.body.style.overflow = "auto";
  setIsModalOpen(false);
};
