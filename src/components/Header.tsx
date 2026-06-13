import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import SearchForm from "./SearchForm";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { itemsAmount } = useContext(CartContext);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-6">
        <Link to="/" className="shrink-0">
          <img src={Logo} alt="Our Home" className="h-8 w-auto" />
        </Link>

        <div className="flex-1 max-w-xl">
          <div className="flex items-center h-10 rounded-full bg-sand border border-ink/10 px-3 transition-colors focus-within:border-clay">
            <CiSearch className="text-muted text-lg shrink-0" />
            <SearchForm />
          </div>
        </div>

        <Link
          to="/category"
          className="hidden sm:inline text-sm font-medium text-ink hover:text-clay transition-colors">
          Shop
        </Link>

        <Link
          to="/cart"
          aria-label="Cart"
          className="relative shrink-0 p-2 text-ink hover:text-clay transition-colors">
          <CiShoppingCart className="text-2xl" />
          {itemsAmount > 0 && (
            <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-clay text-white text-[10px] font-semibold rounded-full">
              {itemsAmount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
