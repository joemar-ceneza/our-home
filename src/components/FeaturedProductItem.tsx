import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function FeaturedProductItem({ product }: { product: Product }) {
  const onSale = product.isOnSale && product.salePrice > 0;

  return (
    <Link to={`/product/${product.slug}`} className="group block h-full">
      <article className="h-full flex flex-col bg-cream rounded-2xl shadow-soft overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
        <div className="aspect-square bg-white flex items-center justify-center p-6">
          <img
            src={`${product.image}`}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="p-4 flex flex-col gap-1">
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
