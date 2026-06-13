import { Link } from "react-router-dom";
import type { Category } from "../types";

export default function CategoryItem({ category }: { category: Category }) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl shadow-soft">
      <img
        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        src={`${category.image}`}
        alt={category.name}
        draggable="false"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
      <h3 className="absolute bottom-4 left-4 right-4 text-white font-serif text-lg sm:text-xl capitalize">
        {category.name}
      </h3>
    </Link>
  );
}
