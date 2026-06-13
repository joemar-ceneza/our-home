import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { Product as ProductType } from "../types";

interface ProductProps {
  product: ProductType;
  handleButtonClick: (e: React.MouseEvent) => void;
  handleView: (e: React.MouseEvent, product?: ProductType) => void;
  bestLabel?: boolean;
  newLabel?: boolean;
  relatedLabel?: boolean;
}

export default function Product({
  product,
  handleButtonClick,
  handleView,
  bestLabel,
  newLabel,
  relatedLabel,
}: ProductProps) {
  const { addToCart } = useContext(CartContext);

  const onAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    handleButtonClick(e);
    addToCart(product);
  };

  const onView = (e: React.MouseEvent): void => {
    e.preventDefault();
    handleView(e, product);
  };

  const onSale = product.isOnSale && product.salePrice > 0;
  const showSaleBadge = (bestLabel || relatedLabel) && onSale;
  const showNewBadge = newLabel && product.isNewProduct;
  const categoryName =
    typeof product.category === "object" ? product.category.name : "";

  return (
    <Link to={`/product/${product.slug}`} draggable="false" className="group block h-full">
      <article className="relative h-full flex flex-col bg-cream rounded-2xl shadow-soft overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
        {showSaleBadge && (
          <span className="absolute top-3 left-3 z-10 bg-clay text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            Sale
          </span>
        )}
        {showNewBadge && (
          <span className="absolute top-3 left-3 z-10 bg-ink text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            New
          </span>
        )}

        <div className="relative bg-white overflow-hidden">
          <div className="aspect-square flex items-center justify-center p-6">
            <img
              className="max-h-full max-w-full object-contain"
              src={`${product.image}`}
              alt={product.name}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={onAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-ink text-white text-xs font-medium uppercase tracking-wide py-3 hover:bg-clay transition-colors">
              <FaShoppingCart />
              add to cart
            </button>
            <button
              onClick={onView}
              aria-label="Quick view"
              className="w-12 flex items-center justify-center bg-clay text-white hover:bg-clay-dark transition-colors">
              <FaEye />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-1">
          {categoryName && (
            <p className="text-[11px] uppercase tracking-wider text-muted">
              {categoryName}
            </p>
          )}
          <h3 className="font-montserrat text-sm font-medium text-ink line-clamp-1 capitalize">
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            {onSale ? (
              <>
                <span className="font-semibold text-clay">
                  ₱ {product.salePrice.toLocaleString()}
                </span>
                <span className="text-xs text-muted line-through">
                  ₱ {product.regularPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-semibold text-ink">
                ₱ {product.regularPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
