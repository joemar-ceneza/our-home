import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed.length === 0) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        className="h-full w-full bg-transparent outline-none text-sm text-ink placeholder:text-muted px-2"
        type="text"
        aria-label="Search for a product"
        placeholder="Search for a product..."
      />
    </form>
  );
}
