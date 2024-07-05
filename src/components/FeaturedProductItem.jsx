import { Link } from "react-router-dom";

export default function FeaturedProductItem({ product }) {
  return (
    <Link to={`/product/${product.attributes.slug}`}>
      <div className="text-sm tracking-wide hover:shadow-2xl transition ease-in-out delay-75">
        <img src={`${product.attributes.image.data.attributes.url}`} alt="" />
        <h3 className="font-bold">{product.attributes.title}</h3>
        <p>₱ {product.attributes.regPrice.toLocaleString()}</p>
      </div>
    </Link>
  );
}
