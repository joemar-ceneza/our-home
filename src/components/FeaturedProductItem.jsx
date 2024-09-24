import { Link } from "react-router-dom";

export default function FeaturedProductItem({ product }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <div className="h-[380px] text-sm tracking-wide overflow-hidden hover:shadow-2xl transition ease-in-out delay-75 rounded-3xl">
        <img src={`${product.image}`} alt="" />
        <div className="py-3 px-2">
          <h3 className="font-bold">{product.name}</h3>
          <p className="my-2">₱ {product.regularPrice.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
