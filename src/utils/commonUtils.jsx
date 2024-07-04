export const handleButtonClick = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

export const handleView = (e, product, setIsModalOpen, setSelectedProduct) => {
  e.stopPropagation();
  e.preventDefault();
  document.body.style.overflow = "hidden";
  setIsModalOpen(true);
  setSelectedProduct(product);
};

export const closeModal = (setIsModalOpen) => {
  document.body.style.overflow = "auto";
  setIsModalOpen(false);
};
