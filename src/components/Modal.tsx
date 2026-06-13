import { Link } from "react-router-dom";
import { IoMdClose, IoIosArrowRoundForward } from "react-icons/io";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import type { Product } from "../types";

interface ModalProps {
  product: Product;
  closeModal: () => void;
}

export default function Modal({ product, closeModal }: ModalProps) {
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSale = product.isOnSale && product.salePrice !== 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={closeModal}></div>

      <div className="relative max-w-4xl w-full flex flex-col bg-cream rounded-2xl shadow-soft z-50 overflow-hidden lg:flex-row">
        <div className="bg-white flex items-center justify-center p-8 lg:w-1/2">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="max-h-[360px] w-auto object-contain"
          />
        </div>

        <div className="w-full p-8 capitalize tracking-wide lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          {onSale && (
            <span className="self-start bg-clay text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
              sale
            </span>
          )}
          <h2 className="font-serif text-2xl text-ink">{product.name}</h2>

          <div className="flex items-baseline gap-3 py-4">
            {onSale ? (
              <>
                <p className="text-2xl font-semibold text-clay">
                  ₱ {product.salePrice.toLocaleString()}
                </p>
                <p className="text-sm text-muted line-through">
                  ₱ {product.regularPrice.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-ink">
                ₱ {product.regularPrice.toLocaleString()}
              </p>
            )}
          </div>

          <button
            className="bg-clay hover:bg-clay-dark transition-colors text-white rounded-lg py-3 px-12 self-start"
            onClick={() => addToCart(product)}>
            Add to cart
          </button>

          <Link to={`/product/${product.slug}`} onClick={closeModal}>
            <p className="flex items-center text-sm text-muted hover:text-clay transition-colors mt-6 normal-case">
              View full details
              <span className="text-2xl pl-1">
                <IoIosArrowRoundForward />
              </span>
            </p>
          </Link>
        </div>

        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full bg-white/80 text-ink hover:bg-white transition-colors">
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
