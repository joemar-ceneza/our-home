import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      navigate(`/search?query=${searchTerm}`);
      document.querySelector("input").value = "";
    } else {
      console.log("please search for something");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative my-3 max-sm:w-4/5">
      <input
        onChange={handleSearchInput}
        className="peer-invalid:text-red-500 h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        placeholder="Search for a product..."
      />
    </form>
  );
}
