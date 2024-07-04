import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import SearchForm from "./SearchForm";
import { CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { itemsAmount } = useContext(CartContext);
  return (
    <header className="container max-w-full bg-white">
      <div className="w-11/12 mx-auto grid grid-flow-col py-5">
        <div className="max-w-md">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-500">
              <CiSearch />
            </div>
            <SearchForm />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Link to={"/cart"}>
            <div className="w-[100px] flex justify-center">
              <CiShoppingCart className="text-2xl mx-2" />
              <span className="capitalize">{itemsAmount}</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 z-50">
        <div className="w-[240px] mx-auto py-5">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
}
