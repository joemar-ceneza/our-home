import { Link } from "react-router-dom";

export default function CategoryItem({ category }) {
  return (
    <div className="relative w-full">
      <Link to={`/products/${category.slug}`}>
        <img
          className="w-full brightness-50"
          key={category.id}
          src={`${category.image}`}
          alt={category.name}
          draggable="false"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase underline underline-offset-[10px] font-bold text-white text-xs w-full text-center sm:text-sm">
          {category.name}
        </div>
      </Link>
    </div>
  );
}
