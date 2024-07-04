import { Link } from "react-router-dom";

export default function CategoryItem({ category }) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return (
    <div className="relative w-full">
      <Link to={`/products/${category.attributes.slug}`}>
        <img
          className="w-full brightness-50"
          key={category.id}
          src={`${baseUrl}${category.attributes.image.data.attributes.url}`}
          alt={category.attributes.title}
          draggable="false"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase underline underline-offset-[10px] font-bold text-white text-xs w-full text-center sm:text-sm">
          {category.attributes.title}
        </div>
      </Link>
    </div>
  );
}
